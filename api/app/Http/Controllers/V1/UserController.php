<?php

namespace App\Http\Controllers\V1;


use App\Http\Controllers\Controller;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class UserController extends Controller
{
    public function index(): JsonResponse
    {
        $this->authorize('viewAny', User::class);

        return response()->json(
            UserResource::collection(User::with(['reservations', 'payments', 'notifications'])->get()),
            200
        );
    }

    public function store(StoreUserRequest $request): JsonResponse
    {
        $this->authorize('create', User::class);

        // https://www.youtube.com/watch?v=SvIxR9oacJs
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public');
        }

        $data = array_merge($request->validated(), ['image' => $imagePath]);

        $user = User::create($data);

        return response()->json(
            new UserResource($user->load(["reservations", "payments", "notifications"])),
            201
        );
    }

    public function show(User $user): JsonResponse
    {
        $this->authorize('view', $user);

        return response()->json(
            new UserResource($user->load(["reservations", "payments", "notifications"])),
            200
        );
    }

    public function update(UpdateUserRequest $request, User $user): JsonResponse
    {
        $this->authorize('update', $user);

        // https://www.youtube.com/watch?v=SvIxR9oacJs
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public');
        }

        $data = array_merge($request->validated(), ['image' => $imagePath]);

        $user->update(array_filter($data));

        return response()->json(
            new UserResource($user->fresh()->load(["reservations", "payments", "notifications"])),
            200
        );
    }

    public function destroy(User $user): Response
    {
        $this->authorize('delete', $user);

        $user->delete();

        return response()->noContent();
    }
}
