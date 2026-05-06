<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReservationRequest;
use App\Http\Resources\ReservationResource;
use App\Models\Reservation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        return response()->json(
            ReservationResource::collection(Reservation::with(['user', 'computer', 'timeslot', 'payment'])->get()),
            200
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ReservationRequest $request): JsonResponse
    {
        $reservation = $request->validated();

        return response()->json(
            new ReservationResource($reservation->load(['computer', 'timeslot'])),
            201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Reservation $reservation): JsonResponse
    {
        return response()->json(
            new ReservationResource($reservation->load(['user', 'payment', 'computer', 'timeslot'])),
            200
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ReservationRequest $request, Reservation $reservation): JsonResponse
    {
        $reservation->update($request->all());

        return response()->json(
            new ReservationResource($reservation->fresh()->load(['user', 'payment', 'computer', 'timeslot'])),
            200
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reservation $reservation): Response
    {
        $reservation->delete();

        return response()->noContent();
    }
}
