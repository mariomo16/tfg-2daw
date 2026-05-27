<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\PaymentResource;
use App\Models\Payment;
use Illuminate\Http\JsonResponse;

class PaymentController extends Controller
{
    public function index(): JsonResponse
    {
        $this->authorize('viewAny', Payment::class);

        return response()->json(
            PaymentResource::collection(Payment::with(['user', 'reservation'])->get()),
            200
        );
    }

    public function myPayments(): JsonResponse
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

    public function show(Payment $payment): JsonResponse
    {
        $this->authorize('view', $payment);

        return response()->json(
            new PaymentResource($payment->load(['user', 'reservation'])),
            200
        );
    }
}
