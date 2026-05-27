<?php

namespace Database\Seeders;

use App\Models\Computer;
use App\Models\Notification;
use App\Models\Payment;
use App\Models\Reservation;
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
        $zones = ['Zona Gaming', 'Zona Torneo', 'Zona VIP'];
        foreach ($zones as $name) {
            Zone::create([
                'name' => $name,
                'price_per_slot' => match ($name) {
                    'Zona Gaming' => 2.5,
                    'Zona Torneo' => 3.5,
                    'Zona VIP' => 5.0
                },
            ]);
        }
        Computer::factory(15)->create();
        TimeSlot::factory(14)->create();
        User::factory(10)->create();
        Reservation::factory(20)->create();
        Payment::factory(15)->create();
        Notification::factory(10)->create();
    }
}
