<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Group;
use App\Models\GroupDocument;

class GroupDocumentController extends Controller
{
    public function store(Request $request, Group $group)
    {
        $request->validate([
            'document' => 'required|file|mimes:pdf,doc,docx,png,jpg,jpeg',
        ]);
        $file = $request->file('document');
        $filename = uniqid() . '_' . $file->getClientOriginalName();

        $file->move(public_path('documents'), $filename);

        $doc = GroupDocument::create([
            'group_id' => $group->id,
            'uploaded_by' => Auth::id(),
            'original_name' => $file->getClientOriginalName(),
            'file_path' => 'documents/' . $filename,
        ]);

        return response()->json([
            'id' => $doc->id,
            'name' => $doc->original_name,
            'url' => asset('storage/' . $doc->file_path),
        ]);
    }

    public function index(Group $group)
    {
        $docs = $group->documents()->get()->map(function ($doc) {
            return [
                'id' => $doc->id,
                'name' => $doc->original_name,
                'url' => asset('storage/' . $doc->file_path),
            ];
        });
        return response()->json($docs);
    }

    public function download(GroupDocument $document)
    {
        $publicPath = public_path($document->file_path);

        if (!file_exists($publicPath)) {
            abort(404, "File not found.");
        }

        return response()->download($publicPath, $document->original_name);
    }

}