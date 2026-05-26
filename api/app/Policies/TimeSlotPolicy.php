<?php

namespace App\Policies;

use App\Models\TimeSlot;
use App\Models\User;

class TimeSlotPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, TimeSlot $timeSlot): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return in_array($user->role, ['staff']);
    }

    public function update(User $user, TimeSlot $timeSlot): bool
    {
        return in_array($user->role, ['staff']);
    }

    public function delete(User $user, TimeSlot $timeSlot): bool
    {
        return in_array($user->role, ['staff']);
    }
}
