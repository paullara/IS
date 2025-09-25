<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use Inertia\Inertia;

class InstructorController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Instructor/Dashboard');
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
}
