<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Masjid;

class MasjidSeeder extends Seeder
{
    public function run(): void
    {
        Masjid::create([
            'id' => 'masjid-1',
            'code' => 'MSJ001',
            'name' => 'Masjid Al-Falah',
            'type' => 'masjid',
            'address' => '123 Main Street',
            'phone' => '0123456789',
            'email' => 'info@masjidalfalah.com',
        ]);
        Masjid::create([
            'id' => 'masjid-2',
            'code' => 'SRU001',
            'name' => 'Surau An-Nur',
            'type' => 'surau',
            'address' => '456 Second Street',
            'phone' => '0198765432',
            'email' => 'info@surauannur.com',
        ]);
    }
} 