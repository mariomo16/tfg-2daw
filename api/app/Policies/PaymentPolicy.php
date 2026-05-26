<?php

namespace App\Policies;

use App\Models\Payment;
use App\Models\User;

class PaymentPolicy
{
    public function viewAny(User $user): bool
    {
        return in_array($user->role, ['staff']);
    }

    public function view(User $user, Payment $payment): bool
    {
        return in_array($user->role, ['staff']) || $user->id === $payment->user_id;
    }

    public function create(User $user): bool
    {
        return in_array($user->role, ['staff']);
    }

    public function update(User $user, Payment $payment): bool
    {
        return in_array($user->role, ['staff']);
    }

    public function delete(User $user, Payment $payment): bool
    {
        return false;
    }
}
