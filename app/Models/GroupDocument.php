<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GroupDocument extends Model
{
    protected $fillable = [
        'group_id',
        'uploaded_by',
        'original_name',
        'file_path',
    ];

    public function group()
    {
        return $this->belongsTo(Group::class);
    }

    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }
}
