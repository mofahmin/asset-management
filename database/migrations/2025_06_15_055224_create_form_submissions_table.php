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
        Schema::create('form_submissions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('form_id'); // Custom form ID (e.g., BR-AMS-001-2023-001)
            $table->string('form_type'); // "BR-AMS 001", "BR-AMS 002", etc.
            $table->string('title');
            $table->json('content'); // JSON content of the form
            $table->string('status'); // "draft", "submitted", "approved", "rejected"
            $table->dateTime('submitted_date')->nullable();
            $table->dateTime('approved_date')->nullable();
            $table->dateTime('rejected_date')->nullable();
            $table->text('notes')->nullable();
            $table->string('masjid_id');
            $table->string('created_by_id');
            $table->string('updated_by_id');
            $table->timestamps();
            
            $table->foreign('masjid_id')->references('id')->on('masjids');
            $table->foreign('created_by_id')->references('id')->on('users');
            $table->foreign('updated_by_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('form_submissions');
    }
};
