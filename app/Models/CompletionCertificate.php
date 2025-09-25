<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompletionCertificate extends Model
{
    protected $fillable = [
        'student_id',
        'application_id',
        'issued_by',
        'issued_at',
        'file_path'
    ];

    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    public function application()
    {
        return $this->belongsTo(Application::class);
    }

    public function issuer()
    {
        return $this->belongsTo(User::class, 'issued_by');
    }
}
