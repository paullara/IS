<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\DatabaseMessage;
use App\Models\User;

class NewRequirementsSubmitted extends Notification
{
    protected $student;

    public function __construct(User $student)
    {
        $this->student = $student;
    }

    public function via($notifiable)
    {
        return ['database']; // You can also add 'mail' if you want
    }

    public function toDatabase($notifiable)
    {
        return [
            'message' => "{$this->student->name} has submitted their internship requirements.",
            'url' => route('employer.requirements.index'), // Change this to the actual employer route to view
            'student_id' => $this->student->id,
        ];
    }
}
