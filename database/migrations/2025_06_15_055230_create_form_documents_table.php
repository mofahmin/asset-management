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
        Schema::create('form_documents', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('type'); // "attachment", "supporting_document", etc.
            $table->string('file_name');
            $table->string('file_url');
            $table->integer('file_size');
            $table->string('mime_type');
            $table->string('form_id');
            $table->timestamps();
            
            $table->foreign('form_id')->references('id')->on('form_submissions');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('form_documents');
    }
};
