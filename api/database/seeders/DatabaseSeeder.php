<?php

namespace Database\Seeders;

use App\Models\Computer;
use App\Models\TimeSlot;
use App\Models\User;
use App\Models\Zone;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Zonas
        $zones = [
            ['name' => 'Standard', 'price' => 2.5],
            ['name' => 'Bootcamp', 'price' => 3.5],
            ['name' => 'Streaming', 'price' => 5.0],
        ];

        foreach ($zones as $zoneData) {
            Zone::create($zoneData);
        }

        // Ordenadores
        $zoneIds = Zone::pluck('id');
        $computerNumber = 1;
        foreach ($zoneIds as $zoneId) {
            for ($i = 1; $i <= 5; $i++) {
                Computer::create([
                    'name' => 'PC-' . $computerNumber++,
                    'zone_id' => $zoneId,
                ]);
            }
        }

        // Franjas horarias (10:00 - 22:00)
        for ($i = 10; $i < 22; $i++) {
            TimeSlot::create([
                'start' => \sprintf('%02d:00:00', $i),
                'end' => \sprintf('%02d:00:00', $i + 1),
            ]);
        }

        // Usuario 
        User::create([
            'name' => 'Mario Ortega',
            'email' => "admin@tfg.es",
            'role' => 'staff',
            'balance' => 999,
            'email_verified_at' => now(),
            'password' => \Hash::make('admin123'),
        ]);
    }
}
