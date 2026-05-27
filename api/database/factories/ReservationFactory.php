<?php

namespace Database\Factories;

use App\Models\Computer;
use App\Models\TimeSlot;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reservation>
 */
class ReservationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $computer = Computer::inRandomOrder()->first();

        return [
            'user_id' => User::inRandomOrder()->first()->id,
            'computer_id' => $computer->id,
            'time_slot_id' => TimeSlot::inRandomOrder()->first()->id,
            'date' => fake()->date(),
            'status' => fake()->randomElement(['confirmed', 'cancelled']),
            'total_price' => $computer->zone->price_per_slot,
        ];
    }
}