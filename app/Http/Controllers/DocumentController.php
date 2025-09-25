<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Document;
use App\Models\Course;
use Inertia\Inertia;

class DocumentController extends Controller
{
    public function index($courseId)
    {
        $course = Course::findOrFail($courseId);
        $documents = Document::where('course_id', $courseId)->with('uploader')->latest()->get();
        return Inertia::render('Coordinator/Documents', [
            'course' => $course,
            'documents' => $documents,
        ]);
    }

    public function store(Request $request, $courseId)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'file' => 'required|file|mimes:pdf,doc,docx,png,jpg,jpeg',
        ]);
        $file = $request->file('file');
        $path = $file->store('documents', 'public');
        Document::create([
            'course_id' => $courseId,
            'uploaded_by' => Auth::id(),
            'title' => $request->title,
            'file_path' => $path,
        ]);
        return back()->with('success', 'Document uploaded successfully.');
    }

    public function destroy($courseId, $id)
    {
        $document = Document::where('course_id', $courseId)->findOrFail($id);
        $document->delete();
        return back()->with('success', 'Document deleted successfully.');
    }
}
