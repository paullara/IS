<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\InstructorGroup;
use App\Models\GroupMessage;

class GroupMessageController extends Controller
{
    public function index(InstructorGroup $group)
    {
        $messages = GroupMessage::with('user')
            ->where('instructor_group_id', $group->id)
            ->orderBy('created_at')
            ->get();
        return response()->json($messages);
    }

    public function store(Request $request, InstructorGroup $group)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        $message = GroupMessage::create([
            'instructor_group_id' => $group->id,
            'user_id' => auth()->id(),
            'message' => $request->message,
        ]);

        return response()->json($message->load('user'));
    }
}