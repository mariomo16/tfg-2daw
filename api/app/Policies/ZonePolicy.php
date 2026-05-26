<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Zone;

class ZonePolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Zone $zone): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return in_array($user->role, ['staff']);
    }

    public function update(User $user, Zone $zone): bool
    {
        return in_array($user->role, ['staff']);
    }

    public function delete(User $user, Zone $zone): bool
    {
        return in_array($user->role, ['staff']);
    }
}
