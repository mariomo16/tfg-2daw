<?php

namespace Database\Factories;

use App\Models\Reservation;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payment>
 */
class PaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $reservation = Reservation::inRandomOrder()->first();

        return [
            'user_id' => $reservation->user_id,
            'reservation_id' => $reservation->id,
            'amount' => $reservation->total_price,
            'type' => fake()->randomElement(['payment', 'refund']),
        ];
    }
}