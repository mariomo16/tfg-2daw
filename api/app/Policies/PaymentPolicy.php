<?php

namespace App\Policies;

use App\Models\Payment;
use App\Models\User;
use App\Enums\UserRole;

class PaymentPolicy
{
    public function viewAny(User $user): bool
    {
        return in_array($user->role, [UserRole::ADMIN->value, UserRole::EMPLOYEE->value]);
    }

    public function view(User $user, Payment $payment): bool
    {
        return in_array($user->role, [UserRole::ADMIN->value, UserRole::EMPLOYEE->value]) || $user->id === $payment->user_id;
    }

    public function create(User $user): bool
    {
        return in_array($user->role, [UserRole::ADMIN->value, UserRole::EMPLOYEE->value]);
    }

    public function update(User $user, Payment $payment): bool
    {
        return in_array($user->role, [UserRole::ADMIN->value, UserRole::EMPLOYEE->value]);
    }

    public function delete(User $user, Payment $payment): bool
    {
        return false;
    }
}
