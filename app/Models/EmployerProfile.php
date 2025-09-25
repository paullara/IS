<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmployerProfile extends Model
{
    protected $fillable = [
        'user_id',
        'company_name',
        'contact_name',
        'contact_number',
        'profile_picture',
        'company_address',
        'company_email',
        'description',
        'website',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function internships()
    {
        return $this->hasMany(Internship::class);
    }
}
