<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Group;
use App\Models\User;
use Inertia\Inertia;

class GroupController extends Controller
{
    public function create()
    {
        return Inertia::render('Instructor/CreateGroup');
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'name' => 'required|string|max:255',
            'section' => 'required|string|max:255',
        ]);

        $group = Group::create([
            'name' => $request->name,
            'section' => $request->section,
            'instructor_id' => auth()->id(),
        ]);

        return redirect()->route('groups.index')->with('success', 'Group created successfully.');
    }

    public function assignStudents(Request $request, Group $group)
    {
        $request->validate([
            'student_ids' => 'required|array',
            'student_ids.*' => 'exists:users,id',
        ]);

        // Attach/sync students to the group
        $group->students()->sync($request->student_ids);

        return redirect()
            ->route('groups.show', $group)
            ->with('success', 'Students assigned successfully.');
    }


    public function index()
    {
        $groups = Group::with('students.studentProfile')
            ->where('instructor_id', auth()->id())
            ->get();

        return Inertia::render('Instructor/Groups', [
            'groups' => $groups,
        ]);
    }

      public function showGroup(Group $group)
    {
        $group->load(['instructor', 'students']);

        $documents = $group->documents()->get()->map(function ($doc) {
            return [
                'id' => $doc->id,
                'name' => $doc->original_name,
                'url' => asset('storage/' . $doc->file_path),
            ];
        });

        $users = User::select('id', 'firstname', 'role')->get();
        return Inertia::render('Instructor/GroupShow', [
            'group' => $group,
            'users' => $users,
            'documents' => $documents,
        ]);
    }
}