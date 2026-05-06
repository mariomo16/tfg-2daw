<?php

namespace App\Services;

use App\Models\Computer;
use App\Models\Payment;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class ReservationService
{
    public function createReservation(array $data): Reservation
    {
        return DB::transaction(function () use ($data) {
            $user = User::lockForUpdate()->findOrFail(auth()->id());

            $computer = Computer::with('zone')->findOrFail($data["computer_id"]);
            $price = $computer->zone->price;

            $this->validateAvailability($computer, $data);

            if ($user->balance < $price) {
                throw ValidationException::withMessages([
                    "balance" => 'No tienes creditos suficientes en tu cuenta.'
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
        if ($computer->status === 'mainteinance') {
            throw ValidationException::withMessages(['computer_id' => 'El equipo no está disponible por mantenimiento.']);
        }

        $isBusy = Reservation::where('computer_id', $data['computer_id'])
            ->where('time_slot_id', $data['time_slot_id'])
            ->where('date', $data['date'])
            ->exists();

        if ($isBusy) {
            throw ValidationException::withMessages(['computer_id' => 'Este ordenador ya tiene una reserva en ese horario.']);
        }
    }

    public function cancel(Reservation $reservation): Reservation
    {
        if ($reservation->status === 'cancelled') {
            throw ValidationException::withMessages(['reservation_id' => 'La reserva ya esta cancelada.']);
        }


        DB::transaction(function () use ($reservation) {
            $reservation->update(['status' => 'cancelled']);

            $user = $reservation->payment->user;

            Payment::create([
                'user_id' => $user->id,
                'reservation_id' => $reservation->id,
                'amount' => $reservation->price,
                'type' => 'refund'
            ]);

            $user->increment('balance', $reservation->price);
        });

        return $reservation;
    }
}