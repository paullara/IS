<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
     // List courses where user is an instructor
    public function myCoursesAsInstructor()
    {
        $user = auth()->user();
        $courses = $user->coursesAsInstructor()->with(['coordinator', 'students.studentProfile'])->get();
        return Inertia::render('Instructor/Courses', [
            'courses' => $courses,
        ]);
    }

    // List courses where user is a student
    public function myCoursesAsStudent()
    {
        $user = auth()->user();
        $courses = $user->coursesAsStudent()->with(['coordinator', 'instructors'])->get();
        return Inertia::render('Student/Courses', [
            'courses' => $courses,
        ]);
    }
}
