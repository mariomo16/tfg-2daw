<?php

namespace App\Services;

use App\Models\Computer;
use App\Models\Payment;
use App\Models\Reservation;
use App\Models\User;
use App\Enums\ReservationError;
use App\Enums\ComputerStatus;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use App\Enums\ReservationStatus;

class ReservationService
{
    public function makeReservation(array $data): Reservation
    {
        return DB::transaction(function () use ($data) {
            $user = User::lockForUpdate()->findOrFail(auth()->id());

            $computer = Computer::with('zone')->findOrFail($data["computer_id"]);
            $price = $computer->zone->price_per_slot;

            $this->validateAvailability($computer, $data);

            if ($user->balance < $price) {
                throw ValidationException::withMessages([
                    "balance" => ReservationError::INSUFICENT_BALANCE->message()
                ]);
            }

            $user->decrement('balance', $price);

            $reservation = Reservation::create($data);

            Payment::create([
                'user_id' => $reservation->user_id,
                'reservation_id' => $reservation->id,
                'amount' => $price,
                'type' => 'payment'
            ]);

            return $reservation;
        });
    }

    protected function validateAvailability(Computer $computer, array $data): void
    {
        if ($computer->status === ComputerStatus::MAINTENANCE->value) {
            throw ValidationException::withMessages(['computer_id' => ReservationError::COMPUTER_MAINTENANCE->message()]);
        }

        $isBusy = Reservation::where('computer_id', $data['computer_id'])
            ->where('time_slot_id', $data['time_slot_id'])
            ->where('date', $data['date'])
            ->exists();

        if ($isBusy) {
            throw ValidationException::withMessages(['computer_id' => ReservationError::COMPUTER_OCCUPIED->message()]);
        }
    }

    public function cancel(Reservation $reservation): Reservation
    {
        if ($reservation->status === ReservationStatus::CANCELLED->value) {
            throw ValidationException::withMessages(['reservation_id' => 'La reserva ya esta cancelada.']);
        }


        DB::transaction(function () use ($reservation) {
            $reservation->update(['status' => ReservationStatus::CANCELLED->value]);

            $user = $reservation->payment->user;

            Payment::create([
                'user_id' => $user->id,
                'reservation_id' => $reservation->id,
                'amount' => $reservation->total_price,
                'type' => 'refund'
            ]);

            $user->increment('balance', $reservation->total_price);
        });

        return $reservation;
    }
}