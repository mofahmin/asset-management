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
        Schema::create('asset_movements', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('type'); // "usage", "transfer", "borrowing"
            $table->string('from_location');
            $table->string('to_location');
            $table->dateTime('movement_date');
            $table->dateTime('return_date')->nullable();
            $table->string('status'); // "ongoing", "returned", "completed"
            $table->text('notes')->nullable();
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
        Schema::dropIfExists('asset_movements');
    }
};
