<?php

namespace App\Http\Controllers;

use App\Models\CompanyApplication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ApplyController extends Controller
{
    public function create()
    {
        return Inertia::render('Employer/Verify', [
            'verification' => Auth::user()->companyApplication,
        ]);
    }

    public function store(Request $request)
{
    $rules = [
        'business_permit_path' => 'nullable|file|max:2048',
        'dti_sec_path' => 'nullable|file|max:2048',
        'bir_2303_path' => 'nullable|file|max:2048',
        'mayors_permit_path' => 'nullable|file|max:2048',
        'company_profile_path' => 'nullable|file|max:2048',
        'moa_path' => 'nullable|file|max:2048',
        'proof_of_office_path' => 'nullable|file|max:2048',
        'valid_id_path' => 'nullable|file|max:2048',
        'philgeps_path' => 'nullable|file|max:2048',
        'organizational_chart_path' => 'nullable|file|max:2048',
        'previous_interns_path' => 'nullable|file|max:2048',
        'training_plan_path' => 'nullable|file|max:2048',
        'designation_letter_path' => 'nullable|file|max:2048',
        'safety_policy_path' => 'nullable|file|max:2048',
        'code_of_conduct_path' => 'nullable|file|max:2048',
        'certificate_of_compliance_path' => 'nullable|file|max:2048',
        'insurance_path' => 'nullable|file|max:2048',
        'office_photos_path' => 'nullable|file|max:2048',
        'nda_path' => 'nullable|file|max:2048',
    ];

    $validated = $request->validate($rules);

    $user = Auth::user();

    // ✅ allow first-time OR rejected re-submission
    $application = CompanyApplication::firstOrNew([
        'user_id' => $user->id,
    ]);

    // ❌ block only if already approved or pending
    if ($application->exists && in_array($application->status, ['pending', 'approved'])) {
        return back()->withErrors([
            'message' => 'You already have an active application.',
        ]);
    }

    // reset status on submit / resubmit
    $application->status = 'pending';
    $application->comment = null;

    foreach ($validated as $key => $file) {
        if ($request->hasFile($key)) {
            $filename = time() . '_' . $file->getClientOriginalName();
            $folder = "company_requirements/{$key}";

            $file->move(public_path($folder), $filename);

            // ✅ overwrite only if new file uploaded
            $application->$key = "{$folder}/{$filename}";
        }
        // ❗ else → DO NOTHING → keeps old file
    }

    $application->save();

    return back()->with('success', 'Application submitted successfully.');
}

     public function getPendingStats()
{
    $applicants = CompanyApplication::with('user')
        ->latest()
        ->get()
        ->map(function ($application) {
            return [
                'id' => $application->id,
                'status' => $application->status,
                'requirements' => [
                    'Business Permit' => $application->business_permit_path,
                    'DTI / SEC' => $application->dti_sec_path,
                    'BIR 2303' => $application->bir_2303_path,
                    'Mayor’s Permit' => $application->mayors_permit_path,
                    'Company Profile' => $application->company_profile_path,
                    'MOA' => $application->moa_path,
                    'Proof of Office' => $application->proof_of_office_path,
                    'Valid ID' => $application->valid_id_path,
                    'PhilGEPS' => $application->philgeps_path,
                    'Organizational Chart' => $application->organizational_chart_path,
                    'Training Plan' => $application->training_plan_path,
                    'Designation Letter' => $application->designation_letter_path,
                    'Safety Policy' => $application->safety_policy_path,
                    'Code of Conduct' => $application->code_of_conduct_path,
                    'DOLE Certificate' => $application->certificate_of_compliance_path,
                    'Insurance' => $application->insurance_path,
                    'Office Photos' => $application->office_photos_path,
                    'NDA' => $application->nda_path,
                ],
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
        'status' => 'required|in:approved,rejected',
        'comment' => 'nullable|string',
    ]);

    $application = CompanyApplication::findOrFail($id);

    $application->status = $request->status;

    if ($request->status === 'rejected') {
        $application->comment = $request->comment;
    }

    $application->save();

    return response()->json([
        'message' => 'Application status updated',
    ]);
}



}
