<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EstadoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            ['name' => 'Recibido'],
            ['name' => 'Revisado'],
            ['name' => 'Derivado'],
            ['name' => 'Observado'],
            ['name' => 'Atendido'],
        ];
        DB::table('estados')->insert($data);
    }
}
