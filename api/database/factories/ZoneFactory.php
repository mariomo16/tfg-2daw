<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Zone>
 */
class ZoneFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->randomElement(['Zona Gaming', 'Zona Torneo', 'Zona VIP']);
        $pricePerSlot = match ($name) {
            'Zona Gaming' => 2.5,
            'Zona Torneo' => 3.5,
            'Zona VIP' => 5,
        };

        return [
            'name' => $name,
            'price_per_slot' => $pricePerSlot,
        ];
    }
}