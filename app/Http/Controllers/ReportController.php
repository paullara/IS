<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\User;

class ReportController extends Controller
{
    public function downloadStudentMasterList()
    {
        $students = User::where('role', 'student')
            ->with(['applications.internship.employer', 'groups'])
            ->get()
            ->map(function ($student) {
                $application = $student->applications->last();

                return [
                    'id' => $student->id,
                    'name' => $student->firstname . ' ' . ($student->middlename ? $student->middlename . ' ' : '') . $student->lastname,
                    'student_id' => $student->school_id,
                    'course' => $student->course ?? 'N/A',
                    'year_level' => $student->year_level ?? 'N/A',
                    'company' => $application && $application->status === 'accepted'
                        ? ($application->internship->employer->company_name ?? 'N/A')
                        : 'Unassigned',
                    'status' => $application->status ?? 'No Application',
                    'group' => $student->groups->map(function ($g) {
                        return $g->name . ' - ' . $g->section;
                    })->implode(', ') ?: 'No Group',
                ];
            });

        // Load a blade view just for PDF (not rendered in React)
        $pdf = Pdf::loadView('pdf.student_masterlist', ['students' => $students]);

        return $pdf->download('student_masterlist.pdf');
    }
}