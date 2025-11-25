<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GroupMessage extends Model
{
    protected $fillable = [
        'instructor_group_id',
        'user_id',
        'message',
    ];

    public function instructorGroup()
    {
        return $this->belongsTo(InstructorGroup::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}