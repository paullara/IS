<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = [
        'name',
        'code',
        'description',
        'coordinator_id',
    ];

    public function coordinator()
    {
        return $this->belongsTo(User::class, 'coordinator_id');
    }

    public function instructors()
    {
        return $this->belongsToMany(User::class, 'course_instructor', 'course_id', 'instructor_id');
    }

    public function students()
    {
        return $this->belongsToMany(User::class, 'course_student', 'course_id', 'student_id');
    }

    public function documents()
{
    return $this->hasMany(Document::class);
}

public function announcements()
{
    return $this->hasMany(Announcement::class);
}
}
