<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Group;
use App\Models\Course;
use Inertia\Inertia;

class StudentController extends Controller
{
    // Show all groups the student is assigned to
    public function groups()
    {
        $user = auth()->user();
        $groups = $user->groups()->with(['instructor', 'students.studentProfile'])->get();
        return Inertia::render('Groups', [
            'groups' => $groups,
        ]);
    }

    public function showGroup(Group $group)
    {
        $group->load(['instructor', 'students.studentProfile']);

        // Load documents and transform them
        $documents = $group->documents()->get()->map(function ($doc) {
            return [
                'id' => $doc->id,
                'name' => $doc->original_name,
                'url' => asset('storage/' . $doc->file_path),
            ];
        });

        $users = User::select('id', 'name', 'role')->get();

        return Inertia::render('GroupShow', [
            'group' => $group,
            'users' => $users,
            'documents' => $documents,
        ]);
    }


    public function myCoursesAsStudent()
    {
        $user = auth()->user();
        $courses = $user->coursesAsStudent()->with(['coordinator', 'students.studentProfile'])->get();
        return Inertia::render('Courses', [
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

            return Inertia::render('CourseShow', [
                'course' => $course,
                'instructors' => $course->instructors,
                'students' => $course->students,
                'announcements' => $course->announcements,
                'documents' => $course->documents,
        ]);
    }
}
