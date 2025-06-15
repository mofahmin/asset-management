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
        Schema::create('disposal_requests', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->dateTime('request_date')->default(now());
            $table->text('reason');
            $table->string('disposal_method'); // "sale", "donation", "destruction", "recycling"
            $table->string('approval_status'); // "pending", "approved", "rejected"
            $table->dateTime('approved_date')->nullable();
            $table->dateTime('disposal_date')->nullable();
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
        Schema::dropIfExists('disposal_requests');
    }
};
