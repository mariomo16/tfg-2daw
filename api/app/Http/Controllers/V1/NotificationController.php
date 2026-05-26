<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\NotificationRequest;
use App\Http\Resources\NotificationResource;
use App\Models\Notification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        return response()->json(
            NotificationResource::collection(Notification::with('user')->get()),
            200
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(NotificationRequest $request): JsonResponse
    {
        $notification = Notification::create($request->all());

        return response()->json(
            new NotificationResource($notification->load('user')),
            201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Notification $notification): JsonResponse
    {
        return response()->json(
            new NotificationResource($notification->load('user')),
            200
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(NotificationRequest $request, Notification $notification): JsonResponse
    {
        $notification->update($request->all());

        return response()->json(
            new NotificationResource($notification->fresh()->load('user')),
            200
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Notification $notification): Response
    {
        $notification->delete();

        return response()->noContent();
    }
}
