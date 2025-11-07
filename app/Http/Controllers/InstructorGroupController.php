<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\InstructorGroup;
use Inertia\Inertia;

class InstructorGroupController extends Controller
{
    public function create()
    {
        return Inertia::render('Coordinator/CreateGroup');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $instructorGroup = InstructorGroup::create([
            'name' => $request->name,
            'coordinator_id' => auth()->id(),
        ]);

        return redirect()->route('coordinator.groups.index')->with('success', 'Group created successfully.');
    }


    public function index()
    {
        $groups = InstructorGroup::with('instructors')
            ->where('coordinator_id', auth()->id())
            ->get();

        return Inertia::render('Coordinator/InstructorGroup', [
            'groups' => $groups
        ]);
    }

public function showInstructorGroup(InstructorGroup $group)
{
    $group->load(['coordinator', 'instructors', 'documents']);

    $documents = $group->documents->map(fn($doc) => [
        'id' => $doc->id,
        'name' => $doc->original_name,
        'url' => asset('storage/' . $doc->file_path),
    ]);

    $instructors = User::where('role', 'instructor')
        ->get()
        ->map(fn($instructor) => [
            'id' => $instructor->id,
            'name' => $instructor->firstname . ' ' . $instructor->lastname,
            'email' => $instructor->email,
            'assigned' => $group->instructors->contains($instructor->id),
        ]);

    return Inertia::render('Coordinator/GroupShow', [
        'group' => $group,
        'users' => $instructors,
        'documents' => $documents,
    ]);
}

// public function assignInstructors(Request $request, InstructorGroup $group)
// {
//     $validated = $request->validate([
//         'instructor_ids' => 'required|array',
//         'instructor_ids.*' => 'exists:users,id',
//     ]);

//     $group->instructors()->sync($validated['instructor_ids']);

//     return response()->json(['message' => 'Instructors assigned successfully.']);
// }

public function assignInstructors(Request $request, InstructorGroup $group)
{
    $validated = $request->validate([
        'instructor_ids' => 'required|array',
        'instructor_ids.*' => 'exists:users,id',
    ]);

    $group->instructors()->sync($validated['instructor_ids']);
    return response()->noContent(); // no JSON body, just 204 success
}


public function fetchGroupData(InstructorGroup $group)
{
    $group->load(['instructors', 'documents']);

    return response()->json([
        'group' => $group,
        'instructors' => $group->instructors,
        'documents' => $group->documents->map(fn($doc) => [
            'id' => $doc->id,
            'name' => $doc->original_name,
            'url' => asset('storage/' . $doc->file_path),
        ]),
    ]);
}

public function searchInstructors(Request $request)
{
    $query = $request->get('q', '');

    $instructors = User::where('role', 'instructor')
        ->where(function ($q) use ($query) {
            $q->where('firstname', 'like', "%{$query}%")
              ->orWhere('lastname', 'like', "%{$query}%")
              ->orWhereRaw("CONCAT(firstname, ' ', lastname) like ?", ["%{$query}%"]);
        })
        ->select('id', \DB::raw("CONCAT(firstname, ' ', lastname) as name"))
        ->get();

    return response()->json($instructors);
}


}
