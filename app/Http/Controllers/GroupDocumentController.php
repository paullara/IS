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
        $path = $file->store('group_documents', 'public');
        $doc = GroupDocument::create([
            'group_id' => $group->id,
            'uploaded_by' => Auth::id(),
            'original_name' => $file->getClientOriginalName(),
            'file_path' => $path,
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
        // Serve from public/group_documents/ instead of storage/app/public/group_documents/
        $publicPath = public_path('group_documents/' . basename($document->file_path));
        if (!file_exists($publicPath)) {
            abort(404);
        }
        return response()->download($publicPath, $document->original_name);
    }
}
