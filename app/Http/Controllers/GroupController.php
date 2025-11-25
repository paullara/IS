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
        $group->students()->syncWithoutDetaching($request->student_ids);

        return redirect()
            ->route('interns.groups.show', $group)
            ->with('success', 'Students assigned successfully.');
    }


    public function index()
    {
        $groups = Group::with('students')
            ->where('instructor_id', auth()->id())
            ->get();

        return Inertia::render('Instructor/Groups', [
            'groups' => $groups,
        ]);
    }

    public function showGroup(Group $group)
    {
        $group->load(['instructor', 'students']); // students already assigned

        $documents = $group->documents()->get()->map(function ($doc) {
            return [
                'id' => $doc->id,
                'name' => $doc->original_name,
                'url' => asset('storage/' . $doc->file_path),
            ];
        });

        // Get all accepted students
        $acceptedStudents = User::where('role', 'student')
            ->whereHas('applications', fn($q) => $q->where('status', 'accepted'))
            ->with(['applications' => fn($q) => $q->where('status', 'accepted')])
            ->get();

            // dd($acceptedStudents->first()->toArray());


        $users = $acceptedStudents->map(fn($student) => [
            'id' => $student->id,
            'firstname' => $student->firstname,
            'middlename' => $student->middlename,
            'lastname' => $student->lastname,
            'section' => $student->section,
            'company_name' => $student->applications->first()?->employer->company_name ?? null,
            'assigned' => $group->students->contains($student->id),
        ]);


        return Inertia::render('Instructor/GroupShow', [
            'group' => $group,
            'users' => $users,
            'documents' => $documents,
        ]);
    }

    public function searchAvailableStudents(Request $request, Group $group)
    {
        $search = $request->query('q', ''); // Get search query
        $query = User::query()
            ->where('role', 'student') // Only students
            ->whereDoesntHave('groups', function ($q) use ($group) {
                $q->where('group_id', $group->id);
            });

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('firstname', 'like', "%{$search}%")
                ->orWhere('lastname', 'like', "%{$search}%")
                ->orWhere('middlename', 'like', "%{$search}%")
                ->orWhere('section', 'like', "%{$search}%")
                ->orWhere('company_name', 'like', "%{$search}%");
            });
        }

        $students = $query->select('id', 'firstname', 'middlename', 'lastname', 'section', 'company_name')->get();

        return response()->json($students);
    }
}