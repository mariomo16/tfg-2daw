<?php

namespace App\Policies;

use App\Models\Reservation;
use App\Models\User;

class ReservationPolicy
{
    public function viewAny(User $user): bool
    {
        return in_array($user->role, ['staff']);
    }

    public function view(User $user, Reservation $reservation): bool
    {
        return in_array($user->role, ['staff']) || $user->id === $reservation->user_id;
    }

    public function create(User $user): bool
    {
        return in_array($user->role, ['staff', 'client']);
    }

    public function update(User $user, Reservation $reservation): bool
    {
        return in_array($user->role, ['staff']);
    }

    public function delete(User $user, Reservation $reservation): bool
    {
        return false;
    }

    public function cancel(User $user, Reservation $reservation): bool
    {
        return in_array($user->role, ['staff']) || $user->id === $reservation->user_id;
    }
}
