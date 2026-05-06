<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\NotificationResource;

class AuthNotification extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $notifications = auth()->user()->notifications();

        return response()->json(
            NotificationResource::collection($notifications->with('user')->get()),
            200
        );
    }
}
