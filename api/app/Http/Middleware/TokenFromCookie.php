<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TokenFromCookie
{
    /**
     * If the request has a 'token' cookie but no Authorization header,
     * copy the cookie value into the Authorization header so Sanctum
     * can authenticate it as a normal Bearer token.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->bearerToken() && $request->cookie('token')) {
            $request->headers->set('Authorization', 'Bearer ' . $request->cookie('token'));
        }

        return $next($request);
    }
}
