<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaymentRequest;
use App\Http\Resources\PaymentResource;
use App\Models\Payment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $this->authorize('viewAny', Payment::class);

        return response()->json(
            PaymentResource::collection(Payment::with(['user', 'reservation'])->get()),
            200
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PaymentRequest $request): JsonResponse
    {
        $payment = Payment::create($request->all());

        return response()->json(
            new PaymentResource($payment->load(['user', 'reservation'])),
            201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Payment $payment): JsonResponse
    {
        $this->authorize('view', $payment);

        return response()->json(
            new PaymentResource($payment->load(['user', 'reservation'])),
            200
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PaymentRequest $request, Payment $payment): JsonResponse
    {
        $payment->update($request->all());

        return response()->json(
            new PaymentResource($payment->fresh()->load(['user', 'reservation'])),
            200
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment): Response
    {
        $payment->delete();

        return response()->noContent();
    }
}
