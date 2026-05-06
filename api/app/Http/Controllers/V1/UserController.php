<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        return response()->json(
            UserResource::collection(User::with(['reservations', 'payments', 'notifications'])->get()),
            200
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request): JsonResponse
    {
        // https://www.youtube.com/watch?v=SvIxR9oacJs
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public');
        }

        $data = [...$request->validated(), 'image' => $imagePath];

        $user = User::create($data);

        return response()->json(
            new UserResource($user->load(["reservations", "payments", "notifications"])),
            201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user): JsonResponse
    {
        return response()->json(
            new UserResource($user->load(["reservations", "payments", "notifications"])),
            200
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, User $user): JsonResponse
    {
        // https://www.youtube.com/watch?v=SvIxR9oacJs
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public');
        }

        $data = [...$request->validated(), 'image' => $imagePath];

        $user->update(array_filter($data));

        return response()->json(
            new UserResource($user->fresh()->load(["reservations", "payments", "notifications"])),
            200
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user): Response
    {
        $user->delete();

        return response()->noContent();
    }
}
