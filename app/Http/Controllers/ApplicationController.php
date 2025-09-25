<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Internship;
use App\Models\Application;
use Illuminate\Http\Request;
use App\Notifications\NewApplicantNotification;

class ApplicationController extends Controller
{
    public function store(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'internship_id' => 'required|exists:internships,id',
        ]);

        $user = auth()->user();

        $existing = Application::where('student_id', $user->id)
            ->where('internship_id', $request->internship_id)
            ->first();

        if ($existing) {
            return back()->withErrors(['message' => 'You have already applied for this internship.']);
        }

        $internship = Internship::find($request->internship_id);

        $application = Application::create([
            'student_id' => $user->id,
            'internship_id' => $request->internship_id,
            'employer_id' => $internship->employer_id,
        ]);

        $employer = User::find($internship->employer_id);

        if ($employer) {
            $studentName = $user->firstname . ' ' . $user->lastname;
            $internshipTitle = $internship->title;
            $employer->notify(new NewApplicantNotification($studentName, $internshipTitle));
        }

        return response()->json([
            'success' => true,
            'message' => "Internship application submitted successfully",
            'application' => $application,
        ]);
    }

    public function getExistingApplications()
    {
        $existingApplications = Application::where('student_id', auth()->id())
            ->pluck('internship_id');

        return response()->json([
            'existingApplications' => $existingApplications,
        ]);
    }
}