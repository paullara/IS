<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StudentProfile;
use App\Models\User;
use App\Models\Internship;
use App\Models\Application;
use App\Models\InternshipRequirement;
use App\Notifications\NewRequirementsSubmitted;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;

class StudentProfileController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Dashboard',
        );
    }

    public function studentInfo()
    {
        $user = Auth::user();

        if ($user->role !== 'student') {
            return response()->json([
                'message' => 'Unauthorized. Only students can access this information'
            ], 403);
        }

        //return json response
        return response()->json([
            'id' => $user->id,
            'firstname' => $user->firstname,
            'middlename' => $user->middlename,
            'lastname' => $user->lastname,
            'school_id' => $user->school_id,
            'skills' => $user->skills,
            'bio' => $user->bio,
            'picture' => $user->picture,
        ]);
    }

    public function editProfileInfo()
    {
        return response()->json(Auth::user());
    }

    public function notification()
    {
        $notifications = auth()->user()->notifications;
        $user = auth()->user();

        return Inertia::render('Notification', [
            'notifications' => $notifications,
            'studentProfile' => $user,
        ]);
    }

    public function getInternships()
    {
        $today = Carbon::today();

        $internships = Internship::with('employer')
            ->where('status', 'open')
            ->whereDate('end_date', '>=', $today) // still available
            ->latest()
            ->get();
        
        return response()->json([
            'internships' => $internships
        ]);
    }

    public function edit()
    {
        return Inertia::render('Profile');
    }

    public function store(Request $request)
    {
        $request->validate([
            'picture' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'firstname' => 'required|string|max:255',
            'middlename' => 'nullable|string|max:255',
            'lastname' => 'required|string|max:255',
            'school_id' => 'required|string|max:255|unique:student_profiles,school_id',
            'skills' => 'nullable|string',
            'bio' => 'nullable|string|max:1000',
        ]);

        $user = auth()->user();

        if ($user->studentProfile) {
            return back()->with('error', 'You already submitted your profile.');
        }

        $path = null;

        if ($request->hasFile('picture')) {
            $filename = time() . '_' . $request->file('picture')->getClientOriginalName();
            $request->file('picture')->move(public_path('profiles'), $filename);
            $path = $filename;
        }

        User::create([
            'picture' => $path,
            'firstname' => $request->firstname,
            'middlename' => $request->middlename,
            'lastname' => $request->lastname,
            'school_id' => $request->school_id,
            'skills' => $request->skills,
            'bio' => $request->bio,
            'status' => 'pending',
        ]);

        return redirect()->back()->with('success', 'Student profile submitted successfully!');
    }

    public function update(Request $request)
{
    $request->validate([
        'picture'    => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        'firstname'  => 'sometimes|string|max:255',
        'middlename' => 'sometimes|nullable|string|max:255',
        'lastname'   => 'sometimes|string|max:255',
        'school_id'  => 'sometimes|string|max:255|unique:users,school_id,' . auth()->id(),
        'year_level' => 'sometimes|string|max:255',
        'skills'     => 'sometimes|nullable|string',
        'bio'        => 'sometimes|nullable|string|max:1000',
    ]);

    $user = auth()->user();

    $data = $request->only([
        'firstname',
        'middlename',
        'lastname',
        'school_id',
        'year_level',
        'skills',
        'bio',
    ]);

    // ✅ replace old picture if uploading new one
    if ($request->hasFile('picture')) {
        if ($user->picture && file_exists(public_path('profiles/' . $user->picture))) {
            unlink(public_path('profiles/' . $user->picture));
        }

        $filename = time() . '_' . $request->file('picture')->getClientOriginalName();
        $request->file('picture')->move(public_path('profiles'), $filename);

        $data['picture'] = $filename;
    }

    $user->update($data);

    return redirect()->back()->with('success', 'Profile updated successfully!');
}

    public function showRequirements()
    {
        $user = auth()->user();
        $requirements = $user->internshipRequirements;

        return Inertia::render('RequirementForm', [
            'requirements' => $requirements
        ]);
    }

    public function submitRequirements(Request $request)
    {
        $request->validate([
            'resume' => 'required|file|mimes:docx,pdf,jpg,jpeg,png|max:2048',
            'endorsement_letter' => 'required|file|mimes:docx,pdf,jpg,jpeg,png|max:2048',
            'good_moral' => 'required|file|mimes:docx,pdf,jpg,jpeg,png|max:2048',
            'tor' => 'required|file|mimes:docx,pdf,jpg,jpeg,png|max:2048',
            'moa' => 'required|file|mimes:docx,pdf,jpg,jpeg,png|max:2048',
            'clearance' => 'required|file|mimes:docx,pdf,jpg,jpeg,png|max:2048',
        ]);

        $user = Auth::user();

        $paths = [
            'resume' => $request->file('resume')->store('requirements', 'public'),
            'endorsement_letter' => $request->file('endorsement_letter')->store('requirements', 'public'),
            'good_moral' => $request->file('good_moral')->store('requirements', 'public'),
            'tor' => $request->file('tor')->store('requirements', 'public'),
            'moa' => $request->file('moa')->store('requirements', 'public'),
            'clearance' => $request->file('clearance')->store('requirements', 'public'),
        ];

        $requirements = InternshipRequirement::updateOrCreate(
            ['user_id' => $user->id],
            array_merge($paths, ['status' => 'pending'])
        );

        $employers = User::where('role', 'employer')->get();
        foreach ($employers as $employer) {
            $employer->notify(new NewRequirementsSubmitted($user));
        }

        return redirect()->back()->with('success', 'Internship requirements submitted. Please wait for approval.');
    }

    public function application()
    {
        $student = Auth::user();

        $applications = Application::with('internship')
            ->where('student_id', $student->id)
            ->latest()
            ->get();

        $user = auth()->user();
        return Inertia::render('Applications', [
            'applications' => $applications,
            'studentProfile' => $user,
        ]);
    }

    public function getProfileName()
    {
        $student = StudentProfile::where('user_id', auth()->id())
            ->latest()
            ->first();

        return response()->json([
            'student' => $student,
        ]);
    }

public function show()
{
    $user = auth()->user();

    return inertia('StudentProfile/Show', [
        'auth' => [
            'user' => $user, // always send auth user
        ],
        'student' => $user, // main profile data
    ]);
}


public function editMe(User $user)
{
    return inertia('StudentProfile/Edit', [
        'student' => $user,
    ]);
}

public function updateMe(Request $request, User $user)
{
    // dd($request->all());
    $request->validate([
        'picture'    => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        'firstname'  => 'sometimes|string|max:255',
        'middlename' => 'sometimes|nullable|string|max:255',
        'lastname'   => 'sometimes|string|max:255',
        'school_id'  => 'sometimes|string|max:255|unique:users,school_id,' . $user->id,
        'year_level' => 'sometimes|string|max:255',
        'skills'     => 'sometimes|nullable|string',
        'bio'        => 'sometimes|nullable|string|max:1000',
        'section'    => 'sometimes|nullable|string:max:20',
    ]);

    $data = $request->only([
        'firstname', 'middlename', 'lastname', 'school_id',
        'year_level', 'skills', 'bio', 'section',
    ]);

    if ($request->hasFile('picture')) {
        $file = $request->file('picture');
        $filename = uniqid() . '.' . $file->getClientOriginalExtension();
        $file->move(public_path('profiles'), $filename);

        if ($user->picture && file_exists(public_path('profiles/' . $user->picture))) {
            unlink(public_path('profiles/' . $user->picture));
        }

        $data['picture'] = $filename;
    }

    $user->update($data);

  return response()->json([
    'message' => 'Profile updated successfully!',
    'user'    => $user,
]);

}

}