<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Internship;
use App\Models\EmployerProfile;
use Inertia\Inertia;

class InternshipController extends Controller
{
    public function index()
    {
        $internships = Internship::where('employer_id', auth()->id())->latest()->get();

        return Inertia::render('Employer/Internship', [
            'internships' => $internships,
        ]);
    }

    public function create()
    {
        return Inertia::render('Employer/JobPosting');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required',
            'requirements' => 'required',
            'start_date'  => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        Internship::create([
            'employer_id' => auth()->id(),
            'title' => $request->title,
            'description' => $request->description,
            'requirements' => $request->requirements,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'status' => 'open'
        ]);

        return redirect()->route('internships.index')->with('success', 'Interships posted successfully.');
    }

    public function edit(Internship $internship)
    {
        return Inertia::render('Employer/EditJobForm', [
            'internship' => $internship
        ]);
    }

    public function update(Request $request, Internship $internship)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'requirements' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
        ]);

        $internship->update([
            'title' => $request->title,
            'description' => $request->description,
            'requirements' => $request->requirements,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
        ]);

        return redirect()->route('internships.index');
    }

    public function destroy(Internship $internship)
    {
        $internship->delete();

        return redirect()->route('internships.index')->with('success', 'Internship deleted');
    }
}