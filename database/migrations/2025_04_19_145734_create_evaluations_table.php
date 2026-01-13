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
        Schema::create('evaluations', function (Blueprint $table) {
        $table->id();
        $table->foreignId('application_id')->constrained()->onDelete('cascade');
        $table->foreignId('evaluator_id')->constrained('users')->onDelete('cascade');

        $table->tinyInteger('ability_to_learn_rating');
        $table->text('ability_to_learn_remarks')->nullable();

        $table->tinyInteger('work_attitude_rating');
        $table->text('work_attitude_remarks')->nullable();

        $table->tinyInteger('conduct_rating');
        $table->text('conduct_remarks')->nullable();

        $table->tinyInteger('motivation_initiative_rating');
        $table->text('motivation_initiative_remarks')->nullable();

        $table->tinyInteger('quality_accuracy_rating');
        $table->text('quality_accuracy_remarks')->nullable();

        $table->tinyInteger('quantity_of_work_rating');
        $table->text('quantity_of_work_remarks')->nullable();

        $table->tinyInteger('safety_practices_rating');
        $table->text('safety_practices_remarks')->nullable();

        $table->tinyInteger('appearance_hygiene_rating');
        $table->text('appearance_hygiene_remarks')->nullable();

        $table->decimal('total_score', 5, 2)->default(0);
        $table->decimal('ojt_grade', 5, 2)->default(0);
        $table->text('comments')->nullable();

        $table->timestamps();
    });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('evaluations');
    }
};
