<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileRequest;
use App\Http\Resources\UserResource;
use App\Models\User;

class ProfileController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function show()
    {
        return response()->json(
            new UserResource(auth()->user()->load(["reservations.computer.zone", "reservations.timeSlot", "payments", "notifications"])),
            200
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProfileRequest $request, User $user)
    {
        $user = auth()->user();
        $data = $request->validated();

        if ($request->hasFile('avatar_path')) {
            $path = $request->file('avatar_path')->store('images', 'public');
            $data = [...$data, 'avatar_path' => $path];
        }

        $user->update(array_filter($data));

        return response()->json(
            new UserResource($user->fresh()->load(['reservations.computer.zone', 'reservations.timeSlot', 'payments', 'notifications'])),
            200
        );
    }
}
