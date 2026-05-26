<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReservationResource;

class AuthReservation extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
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
}
