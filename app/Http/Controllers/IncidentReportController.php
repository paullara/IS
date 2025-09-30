<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\IncidentReport;
use App\Models\User;
use App\Notifications\NewIncidentReport;

class IncidentReportController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'internship_id' => 'required|exists:internships,id',
            'severity' => 'required|string',
            'description' => 'required|string',
        ]);

        $report = IncidentReport::create([
            'internship_id' => $validated['internship_id'],
            'employer_id' => auth()->id(),
            'severity' => $validated['severity'],
            'description' => $validated['description'],
        ]);

         // Find coordinator(s) – assuming role is "coordinator"
        $coordinators = User::where('role', 'coordinator')->get();

        foreach ($coordinators as $coordinator) {
            $coordinator->notify(new NewIncidentReport($report));
        }

        return response()->json([
            'success' => true
        ]);
    }
}