<?php

namespace App\Http\Controllers\V1;

use App\Enums\AuthMessage;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(RegisterRequest $request): JsonResponse
    {
        $user = User::create($request->validated());

        return response()->json([
            'token' => $this->generateToken($user),
            'user' => new UserResource($user),
        ], 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $user = User::where('email', $request->validated('email'))->first();

        if (!$user || !Hash::check($request->validated('password'), $user->password)) {
            throw ValidationException::withMessages([
                'email' => AuthMessage::FAILED->message(),
            ]);
        }

        return response()->json([
            'token' => $this->generateToken($user),
            'user' => new UserResource($user),
        ], 200);
    }

    public function logout(): Response
    {
        auth()->user()->currentAccessToken()->delete();

        return response()->noContent();
    }

    public function me(): JsonResponse
    {
        return response()->json(new UserResource(auth()->user()));
    }

    private function generateToken(User $user): string
    {
        return $user->createToken('api-token')->plainTextToken;
    }
}