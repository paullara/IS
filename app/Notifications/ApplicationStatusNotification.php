<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ApplicationStatusNotification extends Notification
{
    use Queueable;

    protected $status;
    protected $internshipTitle;

    /**
     * Create a new notification instance.
     */
    public function __construct($status, $internshipTitle)
    {
        $this->status = $status;
        $this->internshipTitle = $internshipTitle;
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
        $data = [
            'message' => "Your application for {$this->internshipTitle} was {$this->status}.",
            'status' => $this->status,
            'title' => $this->internshipTitle,
        ];

        if ($this->status === 'accepted') {
            $data['url'] = route('student.requirements.index'); // link to requirement page
        }

        return $data;
    }
}
