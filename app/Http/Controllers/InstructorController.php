<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Course;
use App\Models\InstructorGroup;
use Inertia\Inertia;

class InstructorController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Instructor/Dashboard');
    }

    public function visitation()
    {
        return Inertia::render('Instructor/Visitation');
    }

    public function notification()
    {
        return Inertia::render('Instructor/Notification');
    }

    public function myCoursesAsInstructor()
    {
        $user = auth()->user();
        $courses = $user->coursesAsInstructor()->with(['coordinator', 'students.studentProfile'])->get();
        return Inertia::render('Instructor/Courses', [
            'courses' => $courses,
        ]);
    }

    public function show($id)
    {
            $course = Course::with([
                'instructors:id,name,email',
                'students:id,name,email',
                'students.studentProfile',
                'announcements',
                'documents'
            ])->findOrFail($id);

            return Inertia::render('Instructor/CourseShow', [
                'course' => $course,
                'instructors' => $course->instructors,
                'students' => $course->students,
                'announcements' => $course->announcements,
                'documents' => $course->documents,
        ]);
    }

   public function instructorGroup()
{
    $user = Auth::user();

    $instructorGroups = $user->instructorGroups()->get();
        
    return Inertia::render('Instructor/InstructorGroup', [
        'instructorGroups' => $instructorGroups,
    ]);
}


    public function showInstructorGroup(InstructorGroup $group)
{
    $group->load(['coordinator', 'instructors', 'documents']);

    $documents = $group->documents->map(fn($doc) => [
        'id' => $doc->id,
        'name' => $doc->original_name,
        'url' => asset('storage/' . $doc->file_path),
    ]);

    return Inertia::render('Instructor/InstructorGroupShow', [
        'group' => $group,
        'documents' => $documents,
    ]);
}

}
