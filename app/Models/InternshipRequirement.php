<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InternshipRequirement extends Model
{
    protected $fillable = [
        'user_id',
        'resume',
        'endorsement_letter',
        'good_moral',
        'tor',
        'moa',
        'clearance',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
