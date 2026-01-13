<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\InstructorGroup;
use App\Models\InstructorDocument;

class InstructorDocumentController extends Controller
{
   public function store(Request $request, InstructorGroup $instructorGroup)
{
    $request->validate([
        'document' => 'required|file|mimes:pdf,doc,docx,png,jpg,jpeg|max:20480',
    ]);

    $file = $request->file('document');

    // Move file to /public/group_documents
    $filename = time().'_'.$file->getClientOriginalName();
    $file->move(public_path('group_documents'), $filename);

    $document = InstructorDocument::create([
        'instructor_group_id' => $instructorGroup->id,
        'uploaded_by' => Auth::id(),
        'original_name' => $file->getClientOriginalName(),
        'file_path' => 'group_documents/'.$filename,
    ]);

    return response()->json([
        'id' => $document->id,
        'name' => $document->original_name,
        'url' => asset($document->file_path),
    ]);
}

    public function index(InstructorGroup $instructorGroup)
{
    $documents = $instructorGroup->documents()
        ->latest()
        ->get()
        ->map(fn($doc) => [
            'id' => $doc->id,
            'name' => $doc->original_name,
            'url' => asset($doc->file_path), // FIX HERE
        ]);

    return response()->json($documents);
}


}
