<?php

namespace App\Policies;

use App\Models\User;
use App\Enums\UserRole;

class UserPolicy
{
    public function viewAny(User $user): bool
    {
        return in_array($user->role, [UserRole::ADMIN->value, UserRole::EMPLOYEE->value]);
    }

    public function view(User $user, User $model): bool
    {
        return in_array($user->role, [UserRole::ADMIN->value, UserRole::EMPLOYEE->value]) || $user->id === $model->id;
    }

    public function create(User $user): bool
    {
        return in_array($user->role, [UserRole::ADMIN->value, UserRole::EMPLOYEE->value]);
    }

    public function update(User $user, User $model): bool
    {
        return in_array($user->role, [UserRole::ADMIN->value, UserRole::EMPLOYEE->value]) || $user->id === $model->id;
    }

    public function delete(User $user, User $model): bool
    {
        return in_array($user->role, [UserRole::ADMIN->value, UserRole::EMPLOYEE->value]) || $user->id === $model->id;
    }
}
