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
        Schema::create('loss_reports', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->dateTime('report_date')->default(now());
            $table->dateTime('discovery_date');
            $table->text('description');
            $table->decimal('estimated_value', 15, 2);
            $table->string('police_report_no')->nullable();
            $table->dateTime('police_report_date')->nullable();
            $table->string('status'); // "reported", "investigating", "resolved", "written_off"
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
        Schema::dropIfExists('loss_reports');
    }
};
