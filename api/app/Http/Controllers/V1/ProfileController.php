<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\UpdateProfileRequest;
use App\Http\Resources\UserResource;
use App\Models\User;

class ProfileController extends Controller
{
    public function update(UpdateProfileRequest $request)
    {
        $user = User::findOrFail($request->validated()['userId']);

        if ($user->id !== auth()->id())
            return;

        // https://www.youtube.com/watch?v=SvIxR9oacJs
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public');
        }

        $data = [
            'name' => $request->validated()['name'],
            'email' => $request->validated()['email'],
            'image' => $imagePath
        ];

        $user->update(array_filter($data));

        return response()->json(
            new UserResource($user->fresh()->load(['reservations', 'payments', 'notifications'])),
            200
        );
    }
}
