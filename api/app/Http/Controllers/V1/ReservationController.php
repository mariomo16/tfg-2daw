<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Reservation\StoreReservationRequest;
use App\Http\Resources\ReservationResource;
use App\Models\Reservation;
use Illuminate\Http\JsonResponse;
use App\Services\ReservationService;

class ReservationController extends Controller
{
    public function index(): JsonResponse
    {
        $this->authorize('viewAny', Reservation::class);

        return response()->json(
            ReservationResource::collection(Reservation::with(['user', 'computer', 'timeslot', 'payment'])->get()),
            200
        );
    }

    public function myReservations(): JsonResponse
    {
        return response()->json(
            ReservationResource::collection(
                auth()->user()
                    ->reservations()
                    ->with(['computer', 'timeslot', 'payment'])
                    ->orderBy('date', 'desc')
                    ->get()
            ),
            200
        );
    }

    public function store(StoreReservationRequest $request, ReservationService $service): JsonResponse
    {
        $this->authorize('create', Reservation::class);

        $reservation = $service->makeReservation($request->validated());

        return response()->json(
            new ReservationResource($reservation->load(['computer', 'timeslot'])),
            201
        );

    }

    public function show(Reservation $reservation): JsonResponse
    {
        $this->authorize('view', $reservation);

        return response()->json(
            new ReservationResource($reservation->load(['user', 'computer', 'timeslot', 'payment'])),
            200
        );
    }

    public function cancel(Reservation $reservation, ReservationService $service): JsonResponse
    {
        $this->authorize('cancel', $reservation);

        $reservation = $service->cancel($reservation);

        return response()->json(
            new ReservationResource($reservation->fresh()->load(['user', 'computer', 'timeslot', 'payment'])),
            200
        );

    }
}