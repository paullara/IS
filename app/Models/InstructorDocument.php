<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InstructorDocument extends Model
{
    protected $fillable = [
        'instructor_group_id',
        'uploaded_by',
        'original_name',
        'file_path',
    ];

    public function instructorGroup()
    {
        return $this->belongsTo(InstructorGroup::class);
    }   

    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

}
