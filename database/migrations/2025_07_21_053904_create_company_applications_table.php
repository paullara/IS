<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('company_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('business_permit_path')->nullable();
            $table->string('dti_sec_path')->nullable();
            $table->string('bir_2303_path')->nullable();
            $table->string('mayors_permit_path')->nullable();
            $table->string('company_profile_path')->nullable();
            $table->string('moa_path')->nullable();
            $table->string('proof_of_office_path')->nullable();
            $table->string('valid_id_path')->nullable();

            $table->string('philgeps_path')->nullable();
            $table->string('organizational_chart_path')->nullable();
            $table->string('previous_interns_path')->nullable();
            $table->string('training_plan_path')->nullable();
            $table->string('designation_letter_path')->nullable();
            $table->string('safety_policy_path')->nullable();
            $table->string('code_of_conduct_path')->nullable();
            $table->string('certificate_of_compliance_path')->nullable();
            $table->string('insurance_path')->nullable();
            $table->string('office_photos_path')->nullable();
            $table->string('nda_path')->nullable();
            $table->enum('status', ['not_submitted', 'pending', 'approved', 'rejected'])->default('not_submitted');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('company_applications');
    }
};
