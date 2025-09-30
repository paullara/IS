<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Notifications\ApplicationStatusNotification;
use App\Models\Internship;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\User;
use App\Models\StudentProfile;
use App\Models\IncidentReport;
use App\Models\Application;
use App\Models\CompanyApplication;
use App\Models\Group;
use Inertia\Inertia;

class CoordinatorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $coordinators = User::where('role', 'coordinator')->get();

        return Inertia::render('Admin/Coordinator/Index', [
            'coordinators' => $coordinators,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Coordinator/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'course' => 'nullable|string|max:255',
        ]);

        if ($request->hasFile('picture')) {
            $file = $request->file('picture');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('images'), $filename);
            $data['picture'] = $filename;
        }

        $data['role'] = 'coordinator';
        $data['password'] = bcrypt($data['password']);
        $data['email_verified_at'] = now();

        User::create($data);

        return redirect()->route('coordinators.index')->with('success', 'Coordinator created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $coordinator = User::where('role', 'coordinator')->findOrFail($id);
        return Inertia::render('Admin/Coordinator/Show', [
            'coordinator' => $coordinator,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $coordinator = User::where('role', 'coordinator')->findOrFail($id);
        return Inertia::render('Admin/Coordinator/Edit', [
            'coordinator' => $coordinator,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $coordinator = User::where('role', 'coordinator')->findOrFail($id);
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
            'password' => 'nullable|string|min:8|confirmed',
            'course' => 'nullable|string|max:255',
        ]);

        if ($request->hasFile('picture')) {
            $file = $request->file('picture');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('images'), $filename);
            $data['picture'] = $filename;
        }

        if (!empty($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        } else {
            unset($data['password']);
        }

        $coordinator->update($data);
        return redirect()->route('coordinators.index')->with('success', 'Coordinator updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $coordinator = User::where('role', 'coordinator')->findOrFail($id);
        $coordinator->delete();
        return redirect()->route('coordinators.index')->with('success', 'Coordinator deleted successfully.');
    }

   public function dashboard()
    {
        // Get all courses managed by this coordinator
        $courses = \App\Models\Course::where('coordinator_id', Auth::id())->get();
        $courseIds = $courses->pluck('id');

        // Get instructors linked to those courses
        $instructors = User::where('role', 'instructor')
            ->whereHas('coursesAsInstructor', function ($q) use ($courseIds) {
                $q->whereIn('course_id', $courseIds);
            })
            ->get();

        // Get internships related to these courses
        $internships = Internship::whereIn('course_id', $courseIds)->get();

        // Get groups tied to instructors of these courses
        $instructorIds = $instructors->pluck('id');
        $groups = Group::with(['instructor', 'students.studentProfile'])
            ->whereIn('instructor_id', $instructorIds)
            ->get();

        return Inertia::render('Coordinator/Dashboard', [
            'instructors' => $instructors,
            'internships' => $internships,
            'groups' => $groups,
        ]);
    }


    public function indexInstructor()
    {
        return Inertia::render('Coordinator/Instructor');
    }

    public function createInstructor()
    {
        return Inertia::render('Coordinator/InstructorCreate');
    }

    public function storeInstructor(Request $request)
    {
        // dd($request->all());
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'course' => 'nullable|string|max:255',
            'picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('picture')) {
            $file = $request->file('picture');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('images'), $filename);
            $data['picture'] = $filename;
        }

        $data['role'] = 'instructor';
        $data['coordinator_id'] = Auth::id();
        $data['password'] = bcrypt($data['password']);
        $data['email_verified_at'] = now();

        User::create($data);

        return redirect()->route('coordinator.instructors')->with('success', 'Instructor created successfully.');
    }

    public function showInstructor(string $id)
    {
        $instructor = User::where('role', 'instructor')->findOrFail($id);
        return Inertia::render('Coordinator/InstructorShow', [
            'instructor' => $instructor,
        ]);
    }

    public function editInstructor(string $id)
    {
        $instructor = User::where('role', 'instructor')->findOrFail($id);
        return Inertia::render('Coordinator/InstructorEdit', [
            'instructor' => $instructor,
        ]);
    }

    public function updateInstructor(Request $request, string $id)
    {
        $instructor = User::where('role', 'instructor')->findOrFail($id);
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
            'course' => 'nullable|string|max:255',
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        if ($request->hasFile('picture')) {
            $file = $request->file('picture');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('images'), $filename);
            $data['picture'] = $filename;
        }

        if (!empty($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        } else {
            unset($data['password']);
        }

        $instructor->update($data);
        return redirect()->route('coordinator.instructors')->with('success', 'Instructor updated successfully.');
    }

    public function destroyInstructor(string $id)
    {
        $instructor = User::where('role', 'instructor')->findOrFail($id);
        $instructor->delete();
        return redirect()->route('coordinator.instructors')->with('success', 'Instructor deleted successfully.');
    }

    public function instructors()
    {
        $instructors = User::where('role', 'instructor')
            ->where('coordinator_id', Auth::id())
            ->get();

        return Inertia::render('Coordinator/Sample', [
            'instructors' => $instructors,
        ]);
    }

    public function myCourses()
    {
        $courses = \App\Models\Course::where('coordinator_id', Auth::id())->get();
        return Inertia::render('Coordinator/Courses', [
            'courses' => $courses,
        ]);
    }

 public function showCourse($id)
{
    $course = \App\Models\Course::with([
        'instructors',
        'students.studentProfile',
        'students.applications.internship.employerProfile' // <-- this is key!
    ])->findOrFail($id);

    return Inertia::render('Coordinator/CourseShow', [
        'course' => $course,
        'instructors' => $course->instructors,
        'students' => $course->students,
    ]);
}

    public function addInstructor(Request $request, $courseId)
    {
        $request->validate([
            'instructor_name' => 'required|string',
        ]);
        $instructor = User::where('role', 'instructor')
            ->where('name', 'like', '%' . $request->instructor_name . '%')
            ->first();
        if (!$instructor) {
            return back()->withErrors(['instructor_name' => 'Instructor not found.']);
        }
        $course = \App\Models\Course::findOrFail($courseId);
        $course->instructors()->syncWithoutDetaching([$instructor->id]);
        return back()->with('success', 'Instructor added to course.');
    }

    public function removeInstructor($courseId, $instructorId)
    {
        $course = \App\Models\Course::findOrFail($courseId);
        $course->instructors()->detach($instructorId);
        return back()->with('success', 'Instructor removed from course.');
    }

    public function addStudent(Request $request, $courseId)
    {
        $request->validate([
            'student_name' => 'required|string',
        ]);
        $student = User::where('role', 'student')
            ->where('name', 'like', '%' . $request->student_name . '%')
            ->first();
        if (!$student) {
            return back()->withErrors(['student_name' => 'Student not found.']);
        }
        $course = \App\Models\Course::findOrFail($courseId);
        $course->students()->syncWithoutDetaching([$student->id]);
        return back()->with('success', 'Student added to course.');
    }

    public function removeStudent($courseId, $studentId)
    {
        $course = \App\Models\Course::findOrFail($courseId);
        $course->students()->detach($studentId);
        return back()->with('success', 'Student removed from course.');
    }

    public function internships()
    {
        $internships = Internship::with(['employer', 'employerProfile'])->latest()->get();
        return Inertia::render('Coordinator/Internships', [
            'internships' => $internships,
        ]);
    }

    public function showInternship($id)
{
    $internship = Internship::with([
        'employer',
        'employerProfile',
        'students.studentProfile',
    ])->findOrFail($id);

    $students = User::with('studentProfile')->whereHas('studentProfile')->get();

    return Inertia::render('Coordinator/ShowInternship', [
        'internship' => $internship,
        'students' => $students, // for dropdown
    ]);
}

public function assignStudentToInternship(Request $request)
{
    $request->validate([
        'internship_id' => 'required|exists:internships,id',
        'student_id' => 'required|exists:users,id',
    ]);

    $internship = Internship::findOrFail($request->internship_id);

    // Attach if not already
    if (!$internship->students()->where('user_id', $request->student_id)->exists()) {
        $internship->students()->attach($request->student_id);
    }

    // Update student status
    $studentProfile = StudentProfile::where('user_id', $request->student_id)->first();

    if ($studentProfile) {
        $studentProfile->status = 'accepted';
        $studentProfile->save();
    }

    // Notify the user
    $user = User::find($request->student_id);
    if ($user) {
        $user->notify(new ApplicationStatusNotification('accepted', $internship->title));
    }

    return back()->with('success', 'Student assigned, status updated, and notification sent.');
}

    public function students()
    {
        $applications = Application::whereHas('studentProfile')
            ->with('studentProfile')
            ->get();

        $students = $applications->groupBy('student_id')->map(function ($applications) {
            $firstApplication = $applications->first();

            $studentProfile = $firstApplication->studentProfile;

            $accepted = $applications->contains(function ($application) {
                return $application->status === 'accepted';
            });

            return [
                'student_id' => $firstApplication->student_id,
                'school_id' => $studentProfile->school_id,
                'first_name' => $studentProfile->first_name,
                'middle_name' => $studentProfile->middle_name,
                'last_name' => $studentProfile->last_name,
                'year_level' => $studentProfile->year_level,
                'final_status' => $accepted ? 'accepted' : 'rejected',
            ];
        })->values();

        return Inertia::render('Admin/Monitor', [
            'students' => $students,
        ]);
    }

    public function groupsWithStudents()
    {
        // Get all groups, their instructor, and students with studentProfile
        $groups = Group::with(['instructor', 'students'])->get();
        return Inertia::render('Coordinator/Groups', [
            'groups' => $groups,
        ]);
    }

    public function verifications()
    {
        return Inertia::render('Coordinator/Verification');
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:approved,rejected'
        ]);

        $application = CompanyApplication::findOrFail($id);
        $application->status = $request->status;
        $application->save();

        return response()->json(['messasge' => 'Status updated successfully.']);
    }

    public function getPartners()
    {
        $partners = CompanyApplication::where('status', 'approved')
            ->with('user')
            ->latest()
            ->get()
            ->map(function ($application) {
                return [
                    'id' => $application->id,
                    'status' => $application->status,
                    'user' => [
                        'id' => $application->user->id,
                        'name' => $application->user->company_name,
                        'email' => $application->user->email,
                        'contact_number' => $application->user->contact_number,
                        'company_address' => $application->user->company_address,
                        'website' => $application->user->website,
                    ],
                ];
            });

        return response()->json([
            'partners' => $partners,
        ]);
    }

    public function companies()
    {
        return Inertia::render('Coordinator/Company');
    }

    public function visitation()
    {
        return Inertia::render('Coordinator/Visitation');
    }

    public function getInstructors()
    {
        $instructors = User::where('role', 'instructor')->get();

        return response()->json([
            'instructors' => $instructors
        ]);
    }

    public function studentMasterList(Request $request)
    {   
        $query = User::where('role', 'student')->with([
            'applications.internship.employer',
            'groups'
        ]);

        $filterStatus = $request->status ?? null;

        // ✅ filter by status if present
        if ($filterStatus) {
            $query->whereHas('applications', function ($q) use ($filterStatus) {
                $q->where('status', $filterStatus);
            });
        }

        $students = $query->get()->map(function ($student) use ($filterStatus) 
        {
            $application = null;

            if ($filterStatus) {
                $application = $student->applications->firstWhere('status', $filterStatus);
            } else {
                $application = $student->applications->firstWhere('status', 'accepted')
                    ?: $student->applications->last();
            }

            $company = $application && $application->status === "accepted"
                ? ($application->internship->employer->company_name ?? 'N/A')
                : "Unassigned";

            $internship = $application->internship->title ?? 'N/A';

            // 🚨 FIX: If filtering by rejected, pending, or no application → NO group
            $groupSection = 'No Group';
            if (!$filterStatus || $filterStatus === 'accepted') {
                $groupSection = $student->groups->map(function ($group) {
                    return $group->name . ' - ' . $group->section;
                })->implode(', ') ?: 'No Group';
            }

            return [
                'id' => $student->id,
                'name' => $student->firstname . ' ' . ($student->middlename ? $student->middlename . ' ' : '') . $student->lastname,
                'student_id' => $student->school_id,
                'company' => $company,
                'internship' => $internship,
                'status' => $application->status ?? 'No Application',
                'group_section' => $groupSection,
            ];
        });

        if ($request->has('download') && $request->download === 'pdf') {
            $pdf = Pdf::loadView('pdf.student_master_list', [
                'students' => $students
            ]);
            return $pdf->download('student_master_list.pdf');
            }

            return Inertia::render('Coordinator/Reports/StudentMasterList', [
                'students' => $students,
                'filters' => ['status' => $filterStatus],
        ]);
    }   

    public function notification()
    {
        return Inertia::render('Coordinator/Notification');
    }

    public function incidentReport()
    {
        return Inertia::render('Coordinator/IncidentReport');
    }

    public function getIncidentReport()
    {
        $report = IncidentReport::with('internship', 'employer')->latest()->get();

        return response()->json([
            'report' => $report,
        ]);
    }
}