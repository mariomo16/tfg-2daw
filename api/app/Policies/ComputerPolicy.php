<?php

namespace App\Policies;

use App\Models\Computer;
use App\Models\User;
use App\Enums\UserRole;

class ComputerPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Computer $computer): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return in_array($user->role, [UserRole::ADMIN->value, UserRole::EMPLOYEE->value]);
    }

    public function update(User $user, Computer $computer): bool
    {
        return in_array($user->role, [UserRole::ADMIN->value, UserRole::EMPLOYEE->value]);
    }

    public function delete(User $user, Computer $computer): bool
    {
        return in_array($user->role, [UserRole::ADMIN->value, UserRole::EMPLOYEE->value]);
    }
}
