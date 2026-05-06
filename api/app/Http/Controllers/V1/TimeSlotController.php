<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\TimeSlotResource;
use App\Models\TimeSlot;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TimeSlotController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        return response()->json(
            TimeSlotResource::collection(TimeSlot::with('reservations')->get()),
            200
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $timeslot = TimeSlot::create($request->all());

        return response()->json(
            new TimeSlotResource($timeslot->load('reservations')),
            201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(TimeSlot $timeSlot): JsonResponse
    {
        return response()->json(
            new TimeSlotResource($timeSlot->load('reservations')),
            200
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TimeSlot $timeSlot): JsonResponse
    {
        $timeSlot->update($request->all());

        return response()->json(
            new TimeSlotResource($timeSlot->fresh()->load('reservations')),
            200
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TimeSlot $timeSlot): Response
    {
        $timeSlot->delete();

        return response()->noContent();
    }
}
