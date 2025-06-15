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
        Schema::create('maintenances', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('maintenance_type'); // "routine", "repair", "emergency"
            $table->text('description');
            $table->dateTime('scheduled_date');
            $table->dateTime('completed_date')->nullable();
            $table->decimal('cost', 15, 2)->nullable();
            $table->string('vendor')->nullable();
            $table->string('status'); // "scheduled", "in_progress", "completed", "cancelled"
            $table->text('notes')->nullable();
            $table->string('asset_id');
            $table->string('masjid_id');
            $table->string('created_by_id');
            $table->string('updated_by_id');
            $table->timestamps();
            
            $table->foreign('asset_id')->references('id')->on('assets');
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
        Schema::dropIfExists('maintenances');
    }
};
