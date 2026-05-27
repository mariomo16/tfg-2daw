<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $user = User::create($request->validated());

        return response()
            ->json(['user' => $user], 201)
            ->withCookie($this->makeTokenCookie($user->createToken('api-token')->plainTextToken));
    }

    public function login(LoginRequest $request)
    {
        $user = User::where('email', $request->validated('email'))->first();

        if (!$user || !Hash::check($request->validated('password'), $user->password)) {
            throw ValidationException::withMessages([
                'email' => [__('auth.failed')],
            ]);
        }

        return response()
            ->json(['user' => $user])
            ->withCookie($this->makeTokenCookie($user->createToken('api-token')->plainTextToken));
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()
            ->json(['message' => __('auth.logout')])
            ->withCookie(Cookie::forget('token'));
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    private function makeTokenCookie(string $token)
    {
        return Cookie::make(
            name: 'token',
            value: $token,
            minutes: config('sanctum.expiration'),
            path: '/',
            domain: null,
            secure: true,
            httpOnly: true,
            raw: false,
            sameSite: 'None',
        );
    }
}