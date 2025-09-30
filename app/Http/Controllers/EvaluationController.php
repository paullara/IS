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
            'score' => 'required|integer|min:1|max:5',
            'comments' => 'nullable|string',
        ]);

        $evaluation = Evaluation::create([
            'application_id' => $validated['application_id'],
            'evaluator_id' => Auth::id(),
            'score' => $validated['score'],
            'comments' => $validated['comments'] ?? null,
        ]);

        return response()->json([
            'success' => true,
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