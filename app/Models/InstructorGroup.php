<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InstructorGroup extends Model
{
    protected $fillable = [
        'name',
        'coordinator_id',
    ];

    public function coordinator()
    {
        return $this->belongsTo(User::class, 'coordinator_id');
    }

    public function instructors()
    {
        return $this->belongsToMany(User::class, 'instructor_group_user', 'instructor_group_id', 'user_id');
    }

    public function documents()
    {
        return $this->hasMany(InstructorDocument::class);
    }
}
