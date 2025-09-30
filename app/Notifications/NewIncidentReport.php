<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\DatabaseMessage;
use Illuminate\Notifications\Messages\MailMessage;
use App\Models\IncidentReport;

class NewIncidentReport extends Notification
{
    use Queueable;

    public $incident;

    public function __construct(IncidentReport $incident)
    {
        $this->incident = $incident;
    }

    public function via($notifiable)
    {
        // Store in database + email (optional)
        return ['database', 'mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('New Incident Report')
            ->line('A new incident report has been submitted.')
            ->line('Internship: ' . $this->incident->internship->title)
            ->line('Severity: ' . $this->incident->severity)
            ->action('View Report', url('/coordinator/incidents'))
            ->line('Please review it as soon as possible.');
    }

    public function toArray($notifiable)
    {
        return [
            'incident_id' => $this->incident->id,
            'internship' => $this->incident->internship->title,
            'severity'   => $this->incident->severity,
            'description'=> $this->incident->description,
        ];
    }
}