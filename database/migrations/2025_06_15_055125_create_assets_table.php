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
        Schema::create('assets', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('asset_id')->unique(); // Custom asset ID (e.g., A001)
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('type'); // "Aset Alih" or "Aset Tak Alih"
            $table->string('category');
            $table->dateTime('acquisition_date');
            $table->string('acquisition_method'); // "Pembelian", "Wakaf", "Sumbangan", etc.
            $table->decimal('value', 15, 2);
            $table->string('location');
            $table->string('serial_number')->nullable();
            $table->string('status'); // "Aktif", "Penyelenggaraan", "Pelupusan", "Hilang"
            $table->string('qr_code')->nullable();
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
        Schema::dropIfExists('assets');
    }
};
