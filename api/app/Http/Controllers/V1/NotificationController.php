<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\NotificationResource;
use App\Models\Notification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class NotificationController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(
            NotificationResource::collection(Notification::with('user')->get()),
            200
        );
    }

    public function store(Request $request): JsonResponse
    {
        $notification = Notification::create($request->all());

        return response()->json(
            new NotificationResource($notification->load('user')),
            201
        );
    }

    public function show(Notification $notification): JsonResponse
    {
        return response()->json(
            new NotificationResource($notification->load('user')),
            200
        );
    }

    public function update(Request $request, Notification $notification): JsonResponse
    {
        $notification->update($request->all());

        return response()->json(
            new NotificationResource($notification->fresh()->load('user')),
            200
        );
    }

    public function destroy(Notification $notification): Response
    {
        $notification->delete();

        return response()->noContent();
    }

    public function myNotifications(): JsonResponse
    {
        $notifications = auth()->user()->notifications();

        return response()->json(
            NotificationResource::collection($notifications->with('user')->get()),
            200
        );
    }
}
