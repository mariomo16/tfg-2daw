<?php

namespace App\Http\Controllers\V1;

use App\Models\Payment;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function index()
    {
        return response()->json(Payment::with(['user', 'reservation'])->get());
    }
}
