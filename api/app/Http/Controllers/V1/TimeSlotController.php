<?php

namespace App\Http\Controllers\V1;

use App\Http\Requests\TimeSlotRequest;
use App\Http\Resources\TimeSlotResource;
use App\Models\TimeSlot;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class TimeSlotController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(
            TimeSlotResource::collection(TimeSlot::with('reservations')->get()),
            200
        );
    }

    public function store(TimeSlotRequest $request): JsonResponse
    {
        $this->authorize('create', TimeSlot::class);

        $timeslot = TimeSlot::create($request->all());

        return response()->json(
            new TimeSlotResource($timeslot->load('reservations')),
            201
        );
    }

    public function show(TimeSlot $timeslot): JsonResponse
    {
        return response()->json(
            new TimeSlotResource($timeslot->load('reservations')),
            200
        );
    }

    public function update(TimeSlotRequest $request, TimeSlot $timeslot): JsonResponse
    {
        $this->authorize('update', $timeslot);

        $timeslot->update($request->all());

        return response()->json(
            new TimeSlotResource($timeslot->fresh()->load('reservations')),
            200
        );
    }

    public function destroy(TimeSlot $timeslot): Response
    {
        $this->authorize('delete', $timeslot);

        $timeslot->delete();

        return response()->noContent();
    }
}
