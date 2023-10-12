<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'name' => 'Carlos',
            'email' => 'admin@admin.com',
            'password' => bcrypt("admin12"),
            'oficina_id' => 1,
            'admin' => 1
        ]);
    }
}
