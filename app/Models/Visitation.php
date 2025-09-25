<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Visitation extends Model
{
    protected $fillable = [
        'company_id',
        'coordinator_id',
        'visitation_date',
        'remarks'
    ];

    public function company()
    {
        return $this->belongsTo(User::class, 'company_id');
    }

    public function coordinator()
    {
        return $this->belongsTo(User::class, 'coordinator_id');
    }
}