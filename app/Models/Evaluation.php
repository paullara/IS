<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Evaluation extends Model
{
    protected $fillable = [
        'application_id',
        'evaluator_id',

        // Competency fields
        'ability_to_learn_rating',
        'ability_to_learn_remarks',

        'work_attitude_rating',
        'work_attitude_remarks',

        'conduct_rating',
        'conduct_remarks',

        'motivation_initiative_rating',
        'motivation_initiative_remarks',

        'quality_accuracy_rating',
        'quality_accuracy_remarks',

        'quantity_of_work_rating',
        'quantity_of_work_remarks',

        'safety_practices_rating',
        'safety_practices_remarks',

        'appearance_hygiene_rating',
        'appearance_hygiene_remarks',

        // Total and final OJT grade
        'total_score',
        'ojt_grade',
        'comments'
    ];


    public function application()
    {
        return $this->belongsTo(Application::class);
    }

    public function evaluator()
    {
        return $this->belongsTo(User::class, 'evaluator_id');
    }
}
