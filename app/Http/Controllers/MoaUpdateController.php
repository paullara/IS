<?php 

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

class MoaUpdateController extends Controller
{
    // Fetch all students (JSON for AJAX)
    public function studentsJson()
    {
        $students = User::where('role', 'student')
            ->select('id', 'firstname', 'lastname', 'email', 'course', 'section', 'moa_status')
            ->get();

        return response()->json($students);
    }

    // Inertia view
    public function moaStatus()
    {
        $students = User::where('role', 'student')
            ->select('id', 'firstname', 'lastname', 'email', 'course', 'section', 'moa_status')
            ->get();

        return Inertia::render('Coordinator/MoaStatus', [
            'students' => $students,
        ]);
    }

    // Update method
    public function updateMoaStatus(Request $request, $id)
    {
        $request->validate([
            'moa_status' => 'required|in:pending,endorsed_for_legal_reviews,endorsed_for_ovpass,endorsed_to_por_secretary,endorsed_to_university_president,signed_by_the_university_president',
        ]);

        $user = User::findOrFail($id);
        $user->update([
            'moa_status' => $request->moa_status,
        ]);

        // Just return 204 (no content) since you’re updating the UI manually
        return response()->noContent();
    }
}
