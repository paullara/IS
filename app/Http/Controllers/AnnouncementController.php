<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Announcement;
use App\Models\Course;
use Inertia\Inertia;

class AnnouncementController extends Controller
{
    public function index($courseId)
    {
        $course = Course::findOrFail($courseId);
        $announcements = Announcement::where('course_id', $courseId)->with('user')->latest()->get();
        return Inertia::render('Coordinator/Announcements', [
            'course' => $course,
            'announcements' => $announcements,
        ]);
    }

    public function store(Request $request, $courseId)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
        ]);
        Announcement::create([
            'course_id' => $courseId,
            'user_id' => Auth::id(),
            'title' => $request->title,
            'body' => $request->body,
        ]);
        return back()->with('success', 'Announcement posted successfully.');
    }

    public function destroy($courseId, $id)
    {
        $announcement = Announcement::where('course_id', $courseId)->findOrFail($id);
        $announcement->delete();
        return back()->with('success', 'Announcement deleted successfully.');
    }
}
