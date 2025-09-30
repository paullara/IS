<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IncidentReport extends Model
{
    protected $fillable = [
        'internship_id',
        'employer_id',
        'severity',
        'description',
    ];

    public function internship()
    {
        return $this->belongsTo(Internship::class);
    }

    public function employer()
    {
        return $this->belongsTo(User::class, 'employer_id');
    }
}