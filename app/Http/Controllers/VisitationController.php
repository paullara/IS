<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Visitation;
use Illuminate\Support\Facades\Auth;

class VisitationController extends Controller
{
    public function companies()
    {
        $companies = User::where('role', 'employer')
            ->latest()
            ->get();
        
        return response()->json([
            'companies' => $companies
        ]);
    }

    public function store(Request $request) 
    {
        // dd($request->all());
        $request->validate([
            'company_id' => 'required|exists:users,id',
            'visitation_date' => 'required|date',
            'remarks' => 'nullable|string'
        ]);

        $visitation = Visitation::create([
            'company_id' => $request->company_id,
            'coordinator_id' => Auth::id(),
            'visitation_date' => $request->visitation_date,
            'remarks' => $request->remarks
        ]);

        return response()->json([
            'message' => 'Visitation scheduled successfully!',
            'visitation' => $visitation,
        ]);
    }

    public function visitation()
    {
        $visitations = Visitation::with('company')
            ->where('coordinator_id', Auth()->id())
            ->orderBy('visitation_date','asc')
            ->get();

        return response()->json([
            'visitations' => $visitations
        ]);
    }
}