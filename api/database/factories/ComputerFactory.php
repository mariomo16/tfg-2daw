<?php

namespace Database\Factories;

use App\Models\Zone;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Computer>
 */
class ComputerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        static $pcNumber = 1;

        return [
            'zone_id' => Zone::inRandomOrder()->first()->id,
            'name' => "PC-" . $pcNumber++,
            'status' => fake()->randomElement(['available', 'maintenance', 'occupied']),
            'specs' => null,
        ];
    }
}