<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\ComputerResource;
use App\Models\Computer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ComputerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        return response()->json(
            ComputerResource::collection(Computer::with(['zone', 'reservations'])->get()),
            200
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $computer = Computer::create($request->validated());

        return response()->json(
            new ComputerResource($computer->load(['zone', 'reservations'])),
            201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Computer $computer): JsonResponse
    {
        return response()->json(
            new ComputerResource($computer->load(['zone', 'reservations'])),
            200
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Computer $computer): JsonResponse
    {
        $computer->update($request->validated());

        return response()->json(
            new ComputerResource($computer->fresh()->load(['zone', 'reservations'])),
            200
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Computer $computer): Response
    {
        $computer->delete();

        return response()->noContent();
    }
}
