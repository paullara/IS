<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompanyApplication extends Model
{
    protected $fillable = [
        'user_id',
        'business_permit_path',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
