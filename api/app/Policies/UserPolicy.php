<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    public function viewAny(User $user): bool
    {
        return in_array($user->role, ['staff']);
    }

    public function view(User $user, User $model): bool
    {
        return in_array($user->role, ['staff']) || $user->id === $model->id;
    }

    public function create(User $user): bool
    {
        return in_array($user->role, ['staff']);
    }

    public function update(User $user, User $model): bool
    {
        return in_array($user->role, ['staff']) || $user->id === $model->id;
    }

    public function delete(User $user, User $model): bool
    {
        return in_array($user->role, ['staff']) || $user->id === $model->id;
    }
}
