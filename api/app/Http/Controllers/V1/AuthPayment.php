<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\PaymentResource;

class AuthPayment extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(
            PaymentResource::collection(auth()->user()
                ->payments()
                ->with(['reservation', 'reservation.computer'])
                ->orderBy('created_at', 'desc')
                ->get()),
            200
        );
    }
}
