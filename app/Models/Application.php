<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    protected $fillable = [
        'student_id',
        'internship_id',
        'employer_id',
        'status',
        'applied_at',
    ];

    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    public function internship()
    {
        return $this->belongsTo(Internship::class);
    }

    public function employer()
    {
        return $this->belongsTo(User::class, 'employer_id');
    }

    public function reports()
    {
        return $this->hasOne(Report::class);
    }

    public function evaluations()
    {
        return $this->hasMany(Evaluation::class);
    }

    public function certificate()
    {
        return $this->hasOne(CompletionCertificate::class);
    }
}