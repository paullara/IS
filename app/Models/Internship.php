<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Internship extends Model
{
    protected $fillable = [
        'employer_id',
        'title',
        'description',
        'requirements',
        'start_date',
        'end_date',
        'status'
    ];

    public function employer()
    {
        return $this->belongsTo(User::class, 'employer_id');
    }

    public function applications()
    {
        return $this->hasMany(Application::class);
    }

    public function employerProfile()
    {
        return $this->belongsTo(EmployerProfile::class, 'employer_profile_id');
    }

    public function students()
    {
        return $this->belongsToMany(User::class, 'internship_user');
    }
}