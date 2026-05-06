<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $user = User::create($request->validated());

        return response()->json([
            'token' => $this->generateToken($user),
            'user' => new UserResource($user),
        ], 201);
    }

    public function login(Request $request): JsonResponse
    {
        $user = User::where('email', $request->validated('email'))->first();

        if (!$user || !Hash::check($request->validated('password'), $user->password)) {
            return response()->json([
                'email' => 'No existe ningún usuario con esas credenciales.',
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

    private function generateToken(User $user): string
    {
        return $user->createToken('api-token')->plainTextToken;
    }
}
