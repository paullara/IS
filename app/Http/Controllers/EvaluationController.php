<?php

namespace App\Http\Controllers;

use App\Models\Evaluation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EvaluationController extends Controller
{
    // Store a new evaluation
   public function store(Request $request)
    {
        $validated = $request->validate([
            'application_id' => 'required|exists:applications,id',
            'scores' => 'required|array|size:8',
            'scores.*' => 'required|integer|min:1|max:5',
            'remarks' => 'nullable|array|size:8',
            'remarks.*' => 'nullable|string',
        ]);

        // Map criteria fields to DB columns in order
        $criteriaMap = [
            'ability_to_learn',
            'work_attitude',
            'conduct',
            'motivation_initiative',
            'quality_accuracy',
            'quantity_of_work',
            'safety_practices',
            'appearance_hygiene',
        ];

        $data = [
            'application_id' => $validated['application_id'],
            'evaluator_id' => auth()->id(),
            'total_score' => array_sum($validated['scores']),
            'ojt_grade' => round(array_sum($validated['scores']) / count($validated['scores']), 2),
        ];

        // Assign each rating + remark to its respective DB column
        foreach ($criteriaMap as $index => $prefix) {
            $data["{$prefix}_rating"] = $validated['scores'][$index];
            $data["{$prefix}_remarks"] = $validated['remarks'][$index] ?? null;
        }

        // Optional comments if included
        $data['comments'] = $request->input('comments');

        $evaluation = \App\Models\Evaluation::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Evaluation successfully submitted.',
            'evaluation' => $evaluation,
        ]);
    }
    
    // Optional: List evaluations for a given internship or application
    public function indexByInternship($internshipId)
    {
        $evaluations = Evaluation::with(['application.student', 'evaluator'])
            ->whereHas('application', function($q) use ($internshipId) {
                $q->where('internship_id', $internshipId);
            })
            ->get();

        return response()->json(['evaluations' => $evaluations]);
    }

    public function monitorEvaluation()
    {
        return Inertia::render('Coordinator/Evaluation');
    }

    public function evaluatedStudent()
    {
        $evaluated = Evaluation::with(['application.student'])->latest()->get();

        return response()->json([
            'evaluated' => $evaluated,
        ]);
    }
}