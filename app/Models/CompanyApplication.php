<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompanyApplication extends Model
{
    protected $fillable = [
        'user_id',
        'status',
        'business_permit_path',
        'dti_sec_path',
        'bir_2303_path',
        'mayors_permit_path',
        'company_profile_path',
        'moa_path',
        'proof_of_office_path',
        'valid_id_path',

        'philgeps_path',
        'organizational_chart_path',
        'previous_interns_path',
        'training_plan_path',
        'designation_letter_path',
        'safety_policy_path',
        'code_of_conduct_path',
        'certificate_of_compliance_path',
        'insurance_path',
        'office_photos_path',
        'nda_path',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}