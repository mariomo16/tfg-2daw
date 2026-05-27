<?php

namespace App\Http\Controllers\V1;

use App\Models\Reservation;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function index()
    {
        return response()->json(Reservation::with(["user", "computer", "timeslot", "payment"])->get());
    }
}
