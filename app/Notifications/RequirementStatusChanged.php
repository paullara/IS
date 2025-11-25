<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class RequirementStatusChanged extends Notification
{
    use Queueable;

    public $requirement;
    public $status;

    /**
     * Create a new notification instance.
     */
    public function __construct($requirement, $status)
    {
        $this->requirement = $requirement;
        $this->status = $status;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database'];
    }



    /**
     * Get the array representation of the notification for the database channel.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toDatabase($notifiable)
    {
        return [
            'requirement_id' => $this->requirement->id,
            'status' => $this->status,
            'message' => 'Your requirement has been ' . $this->status,
            'employer_id' => optional($this->requirement->employer)->id ?? null,
        ];
    }
}