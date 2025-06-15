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
        Schema::create('audit_logs', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('action'); // "CREATE", "UPDATE", "DELETE", "VIEW"
            $table->string('entity'); // "Asset", "Form", "Maintenance", etc.
            $table->string('entity_id');
            $table->text('description');
            $table->text('changes')->nullable(); // JSON string of changes
            $table->string('ip_address')->nullable();
            $table->string('user_id');
            $table->string('masjid_id');
            $table->timestamps();
            
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('masjid_id')->references('id')->on('masjids');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audit_logs');
    }
};
