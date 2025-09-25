<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Notifications\NewStudentVerificationRequest;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class VerificationController extends Controller
{

    public function create()
    {
        $verification = auth()->user()->verification;

        return Inertia::render('Create', [
            'verification' => $verification,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'school_id_image' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $user = Auth::user();

        if ($user->verification && $user->verification->status === 'pending') {
            return back()->withErrors(['school_id_image' => 'Verification already submitted.']);
        }

        $file = $request->file('school_id_image');
        $filename = uniqid() . '_' . time() . '.' . $file->getClientOriginalExtension();
        $file->move(public_path('school_id'), $filename);

        $user->verification()->updateOrCreate(
            ['user_id' => $user->id],
            [
                'school_id_image' => $filename,
                'status' => 'pending',
                'remarks' => null,
            ]
        );

        $admins = User::where('role', 'admin')->get();

        foreach ($admins as $admin) {
            $admin->notify(new NewStudentVerificationRequest($user));
        }

        return back()->with('message', 'Verification submitted!');
    }
}
