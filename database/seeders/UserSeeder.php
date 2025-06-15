<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'id' => 'user-1',
            'name' => 'Admin User',
            'email' => 'admin@masjidalfalah.com',
            'password' => Hash::make('password'),
            'role' => 'Admin',
            'masjid_id' => 'masjid-1',
        ]);
        User::create([
            'id' => 'user-2',
            'name' => 'Pegawai Aset',
            'email' => 'pegawai@surauannur.com',
            'password' => Hash::make('password'),
            'role' => 'Pegawai Aset',
            'masjid_id' => 'masjid-2',
        ]);
    }
} 