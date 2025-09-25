<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $courses = Course::with('coordinator')->get();
        return inertia('Admin/Course/CourseIndex', [
            'courses' => $courses,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $coordinators = User::where('role', 'coordinator')->get();
        return inertia('Admin/Course/CourseCreate', [
            'coordinators' => $coordinators,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:courses',
            'description' => 'nullable|string',
            'coordinator_id' => 'required|exists:users,id',
        ]);
        Course::create($data);
        return redirect()->route('courses.index')->with('success', 'Course created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $course = Course::with('coordinator')->findOrFail($id);
        return inertia('Admin/Course/CourseShow', [
            'course' => $course,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $course = Course::findOrFail($id);
        $coordinators = User::where('role', 'coordinator')->get();
        return inertia('Admin/Course/CourseEdit', [
            'course' => $course,
            'coordinators' => $coordinators,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $course = Course::findOrFail($id);
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:courses,code,' . $id,
            'description' => 'nullable|string',
            'coordinator_id' => 'required|exists:users,id',
        ]);
        $course->update($data);
        return redirect()->route('courses.index')->with('success', 'Course updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $course = Course::findOrFail($id);
        $course->delete();
        return redirect()->route('courses.index')->with('success', 'Course deleted successfully.');
    }
}
