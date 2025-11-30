<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Visitation;
use App\Notifications\VisitationStatusNotification;
use Illuminate\Support\Facades\Auth;

class VisitationController extends Controller
{
    public function companies()
    {
        $companies = User::where('role', 'employer')
            ->latest()
            ->get();
        
        return response()->json([
            'companies' => $companies
        ]);
    }

   public function store(Request $request)
{
    $request->validate([
        'company_ids' => 'required|array|min:1',
        'company_ids.*' => 'exists:users,id',
        'visitation_date' => 'required|date',
        'remarks' => 'nullable|string'
    ]);

    $created = [];

    foreach ($request->company_ids as $companyId) {
        $created[] = Visitation::create([
            'company_id' => $companyId,
            'instructor_id' => Auth::id(),
            'visitation_date' => $request->visitation_date,
            'remarks' => $request->remarks
        ]);
    }

    return response()->json([
        'message' => 'Visitation scheduled successfully!',
        'visitations' => $created,
    ]);
}

    public function visitationRequest()
    {
        $visitations = Visitation::with('instructor', 'company')
            ->where('status', 'pending')
        ->get();

        return response()->json([
            'visitations' => $visitations,
        ]);
    }

    public function updateRequestStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:approved,rejected',
            'remarks' => 'nullable|string|max:500'
        ]);

        $visitation = Visitation::with('instructor', 'company')->findOrFail($id);

        $visitation->status = $request->status;
        $visitation->remarks = $request->remarks; // store remarks
        $visitation->save();

        $instructor = $visitation->instructor;
        $company = $visitation->company;

        // Notify Instructor
        if ($request->status === 'approved') {
            $instructor->notify(
                new \App\Notifications\VisitationStatusNotification(
                    "Your visitation request to {$company->company_name} has been APPROVED by the coordinator."
                )
            );

            // Notify company only if approved
            $company->notify(
                new \App\Notifications\VisitationStatusNotification(
                    "There will be a visitation from {$instructor->firstname} on {$visitation->visitation_date}."
                )
            );

        } else {
            // If rejected, include remarks in notification
            $reason = $request->remarks ? " Reason: {$request->remarks}" : "";

            $instructor->notify(
                new \App\Notifications\VisitationStatusNotification(
                    "Your visitation request to {$company->company_name} was REJECTED by the coordinator." . $reason
                )
            );
        }

        return response()->json([
            'message' => "Visitation request {$request->status} successfully!",
            'visitation' => $visitation,
        ]);
    }


    public function visitation()
    {
        $visitations = Visitation::with('company')
            ->where('instructor_id', Auth()->id()) 
            ->where('status', 'approved')
            ->orderBy('visitation_date','asc')
            ->get();

        return response()->json([
            'visitations' => $visitations
        ]);
    }

    public function visitationCalendar()
    {
        $visitations = Visitation::with('company', 'instructor')
            ->where('status', 'approved')
            ->orderBy('visitation_date','asc')
            ->get();

        return response()->json([
            'visitations' => $visitations
        ]);
    }
}