<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use App\Models\Document;
use App\Models\Group;
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

   public function store(Request $request, Group $group)
{
    $request->validate([
        'document' => 'required|file|mimes:pdf,doc,docx,png,jpg,jpeg|max:20480',
    ]);

    $file = $request->file('document');

    // Move file to /public/group_documents
    $filename = time().'_'.$file->getClientOriginalName();
    $file->move(public_path('documents'), $filename);

    $document = Document::create([
        'group_id' => $group->id,
        'uploaded_by' => Auth::id(),
        'original_name' => $file->getClientOriginalName(),
        'file_path' => 'documents/'.$filename,
    ]);

    return response()->json([
        'id' => $document->id,
        'name' => $document->original_name,
        'file_path' => $document->file_path,
        'url' => asset($document->file_path), // generates http://.../documents/xxx.pdf
    ]);

}

    public function destroy($courseId, $id)
    {
        $document = Document::where('course_id', $courseId)->findOrFail($id);
        $document->delete();
        return back()->with('success', 'Document deleted successfully.');
    }

     public function show($filename)
    {
        $path = storage_path('app/documents/' . $filename);

        if (!File::exists($path)) {
            abort(404);
        }

        $file = File::get($path);
        $type = File::mimeType($path);

        return response($file, 200)
            ->header('Content-Type', $type);
    }
}
