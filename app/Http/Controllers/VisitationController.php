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
        // dd($request->all());
        $request->validate([
            'company_id' => 'required|exists:users,id',
            'visitation_date' => 'required|date',
            'remarks' => 'nullable|string'
        ]);

        $visitation = Visitation::create([
            'company_id' => $request->company_id,
            'instructor_id' => Auth::id(),
            'visitation_date' => $request->visitation_date,
            'remarks' => $request->remarks
        ]);

        return response()->json([
            'message' => 'Visitation scheduled successfully!',
            'visitation' => $visitation,
        ]);
    }

    public function visitationRequest()
    {
        $visitations = Visitation::with('instructor', 'company')->get();

        return response()->json([
            'visitations' => $visitations,
        ]);
    }

    public function updateRequestStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:approved,rejected'
        ]);

        $visitation = Visitation::with('instructor', 'company')->findOrFail($id);
        $visitation->status = $request->status;
        $visitation->save();

        $instructor = $visitation->instructor;
        $company = $visitation->company;

        // Notify Instructor
        if ($request->status === 'approved') {
            $instructor->notify(new \App\Notifications\VisitationStatusNotification(
                "Your visitation request to {$company->company_name} has been approved by the coordinator."
            ));

            // Notify Company only if approved
            $company->notify(new \App\Notifications\VisitationStatusNotification(
                "There will be a visitation from {$instructor->firstname} on {$visitation->visitation_date}."
            ));
        } else {
            // If rejected, notify only instructor
            $instructor->notify(new \App\Notifications\VisitationStatusNotification(
                "Your visitation request to {$company->company_name} was rejected by the coordinator."
            ));
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