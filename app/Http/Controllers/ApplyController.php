<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\CompanyApplication;
use Inertia\Inertia;

class ApplyController extends Controller
{
    public function create()
    {
        $verification = auth()->user()->companyApplication;
        // dd($verification);
        return Inertia::render('Employer/Verify', [
            'verification' => $verification,
        ]);
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'business_permit_path' => 'required|file|mimes:pdf,docx|max:2048',
        ]);

        $user = Auth::user();

        // Check if there's an existing pending submission
        if ($user->companyApplication && $user->companyApplication->status === 'pending') {
            return back()->withErrors(['business_permit_path' => 'Verification already submitted.']);
        }

        if ($request->hasFile('business_permit_path')) {
            $file = $request->file('business_permit_path');
            $filename = time() . '_' . $file->getClientOriginalName();
            $destination = public_path('business_permits');

            if (!file_exists($destination)) {
                mkdir($destination, 0775, true);
            }

            $file->move($destination, $filename);

            $companyApp = new CompanyApplication();
            $companyApp->user_id = $user->id;
            $companyApp->business_permit_path = 'business_permits/' . $filename;
            $companyApp->status = 'pending';
            $companyApp->save();

            return back()->with('success', 'Business permit submitted successfully!');
        }

        return back()->withErrors(['business_permit_path' => 'File upload failed']);
    }


    public function getPendingStats()
    {
        $applicants = CompanyApplication::where('status', 'pending')
            ->with('user')->latest()->get()
            ->map(function ($application) {
                return [
                    'id' => $application->id,
                    'status' => $application->status,
                    'business_permit_path' => $application->business_permit_path,
                    'user' => [
                        'id' => $application->user->id,
                        'name' => $application->user->company_name,
                    ],
                ];
            });

        return response()->json([
            'applicants' => $applicants,
        ]);
    }

    public function getApplications(Reqeuest $request)
    {
        $status = $request->query('status');

        $applications = CompanyApplication::when($status, function ($query, $status) {
            return $query->where('status', $status);
        })->with('user')->latest()->get();

        return json()->response([
            'status' => $status,
            'applications' => $applications
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:approved,rejected'
        ]);

        $application = CompanyApplication::findOrFail($id);
        $application->status = $request->status;
        $application->save();

        return response()->json([
            'message' => 'Status updated successfully'
        ]);
    }

}