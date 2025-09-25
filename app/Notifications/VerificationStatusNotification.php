<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class VerificationStatusNotification extends Notification
{
    use Queueable;

    protected $status;
    protected $remarks;

    /**
     * Create a new notification instance.
     */
    public function __construct($status, $remarks = null)
    {
        $this->status = $status;
        $this->remarks = $remarks;
    }


    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via($notifiable)
    {
        return ['database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->line('The introduction to the notification.')
            ->action('Notification Action', url('/'))
            ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray($notifiable)
    {
        $baseMessage = $this->status === 'approved'
            ? 'Your school ID verification was approved.'
            : 'Your school ID verification was rejected.';

        return [
            'message' => $baseMessage . ($this->remarks ? " Remarks: {$this->remarks}" : ''),
            'status' => $this->status,
        ];
    }
}
