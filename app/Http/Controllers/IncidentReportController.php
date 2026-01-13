<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\IncidentReport;
use App\Models\User;
use App\Models\Application;
use App\Notifications\NewIncidentReport;
use Inertia\Inertia;

class IncidentReportController extends Controller
{
    public function store(Request $request)
    {
        $user = auth()->user();

        // Common validation for severity and description
        $validated = $request->validate([
            'severity' => 'required|string',
            'description' => 'required|string',
        ]);

        // ================= STUDENT SUBMISSION =================
        if ($user->role === 'student') {
            $internship = Application::where('student_id', $user->id)
                ->where('status', 'accepted')
                ->first();

            if (!$internship) {
                return response()->json([
                    'message' => 'You do not have an accepted internship.'
                ], 403);
            }

            $report = IncidentReport::create([
                'internship_id' => $internship->internship_id,
                'employer_id'   => $internship->employer_id,
                'student_id'    => $user->id,
                'severity'      => $validated['severity'],
                'description'   => $validated['description'],
                'submitted_by'  => 'student',
            ]);
        }

        // ================= EMPLOYER SUBMISSION =================
        else if ($user->role === 'employer') {

            // Validate JSON input for employer
            $request->validate([
                'internship_id' => 'required|exists:internships,id',
                'student_id' => 'required|exists:users,id',
            ]);

            $report = IncidentReport::create([
                'internship_id' => $request->input('internship_id'),
                'employer_id'   => $user->id,
                'student_id'    => $request->input('student_id'),
                'severity'      => $validated['severity'],
                'description'   => $validated['description'],
                'submitted_by'  => 'employer',
            ]);
        }

        // ================= NOTIFY COORDINATORS =================
        $coordinators = User::where('role', 'coordinator')->get();
        foreach ($coordinators as $coordinator) {
            $coordinator->notify(new NewIncidentReport($report));
        }

        return response()->json([
            'success' => true,
            'message' => 'Incident report submitted successfully.'
        ]);
    }

    public function studentIncidentReport()
    {
        return Inertia::render('IncidentReport');
    }

}
