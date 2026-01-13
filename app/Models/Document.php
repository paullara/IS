<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $fillable = [
        'group_id',
        'uploaded_by',
        'original_name',
        'file_path',
    ];

    public $timestamps = false; 

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }
}
