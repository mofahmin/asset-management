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
        Schema::create('asset_documents', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('type'); // "invoice", "delivery_order", "wakaf_letter", "image", etc.
            $table->string('file_name');
            $table->string('file_url');
            $table->integer('file_size');
            $table->string('mime_type');
            $table->string('asset_id');
            $table->timestamps();
            
            $table->foreign('asset_id')->references('id')->on('assets');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('asset_documents');
    }
};
