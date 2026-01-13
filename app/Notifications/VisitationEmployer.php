<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class VisitationEmployer extends Notification
{
    use Queueable;

    protected $visitationDate;
    protected $companyName;

    /**
     * Create a new notification instance.
     */
    public function __construct($visitationDate, $companyName)
    {
        $this->visitationDate = $visitationDate;
        $this->companyName = $companyName;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
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
    public function toArray(object $notifiable): array
    {
        return [
            'message' => "A visitation has been scheduled for your company on {$this->visitationDate}.",
            'company' => $this->companyName,
            'visitation_date' => $this->visitationDate,
        ];
    }
}
