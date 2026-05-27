<?php

namespace Database\Seeders;

use App\Models\Computer;
use App\Models\Notification;
use App\Models\Payment;
use App\Models\Reservation;
use App\Models\TimeSlot;
use App\Models\User;
use App\Models\Zone;
use Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Str;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Zones
        $zones = [
            ['name' => 'Zona Gaming', 'price_per_slot' => 2.5],
            ['name' => 'Zona Torneo', 'price_per_slot' => 3.5],
            ['name' => 'Zona VIP', 'price_per_slot' => 5.0],
        ];

        foreach ($zones as $zoneData) {
            Zone::create($zoneData);
        }

        // Computers
        $zoneIds = Zone::pluck('id');
        $computerNumber = 1;
        foreach ($zoneIds as $zoneId) {
            for ($i = 1; $i <= 5; $i++) {
                Computer::create([
                    'name' => 'PC-' . $computerNumber++,
                    'zone_id' => $zoneId,
                    'status' => 'available'
                ]);
            }
        }

        // TimeSlots (10:00 - 22:00)
        for ($i = 10; $i < 22; $i++) {
            TimeSlot::create([
                'start_time' => sprintf('%02d:00:00', $i),
                'end_time' => sprintf('%02d:00:00', $i + 1),
            ]);
        }

        // Admin user
        User::create([
            'name' => 'Mario Ortega',
            'email' => "admin@ctrlz.es",
            'role' => 'admin',
            'balance' => 999,
            'email_verified_at' => now(),
            'password' => Hash::make('admin123'),
        ]);

        // User::factory(10)->create();
        // Reservation::factory(20)->create();
        // Payment::factory(15)->create();
        // Notification::factory(10)->create();
    }
}
