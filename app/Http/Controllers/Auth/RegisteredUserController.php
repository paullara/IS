<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\StudentIdNumber;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        // dd($request->all());
        $request->validate([
            'firstname' => 'required|string|max:255',
            'middlename' => 'nullable|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'course' => 'nullable|string|max:255',
            'role' => 'required|in:student,employer,coordinator', 
            'student_id' => 'nullable|string|max:20',
        ]);

        if ($request->role === 'student') {
            $request->validate([
                'student_id' => 'required|string|max:20',
            ]);

            $studentId = StudentIdNumber::where('student_id_number', $request->student_id)->first();
            if (!$studentId) {
                return redirect()->back()->withErrors([
                    'student_id' => 'The provided student ID is not valid',
                ])->withInput();
            }

            $alreadyRegistered = User::where('student_id', $request->student_id)->exists();
            if ($alreadyRegistered) {
                return redirect()->back()->withErrors([
                    'student_id' => 'The student ID is already registered. One-time registration only.'
                ]);
            }
        }

        $user = User::create([
            'firstname' => $request->firstname,
            'middlename' => $request->middlename,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'course' => $request->role !== 'employer' ? $request->course : null,
            'student_id' => $request->role === 'student' ? $request->student_id : null,
        ]);

        event(new Registered($user));

        Auth::login($user);

        if ($user->role === 'employer') {
            return redirect()->route('employer.dashboard');
        } else if ($user->role === 'coordinator') {
            return redirect()->route('coordinator.dashboard');
        }
        return redirect(route('dashboard', absolute: false));
    }
}