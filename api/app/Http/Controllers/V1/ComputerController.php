<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\ComputerResource;
use App\Http\Requests\Computer\ComputerRequest;
use App\Http\Resources\NotificationResource;
use App\Models\Computer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class ComputerController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(
            ComputerResource::collection(Computer::with(['zone', 'reservations'])->get()),
            200
        );
    }

    public function store(ComputerRequest $request): JsonResponse
    {
        $this->authorize('create', Computer::class);

        $computer = Computer::create($request->validated());

        return response()->json(
            new ComputerResource($computer->load(['zone', 'reservations'])),
            201
        );
    }

    public function show(Computer $computer): JsonResponse
    {
        return response()->json(
            new ComputerResource($computer->load(['zone', 'reservations'])),
            200
        );
    }

    public function update(ComputerRequest $request, Computer $computer): JsonResponse
    {
        $this->authorize('update', $computer);

        $computer->update($request->validated());

        return response()->json(
            new ComputerResource($computer->fresh()->load(['zone', 'reservations'])),
            200
        );
    }

    public function destroy(Computer $computer): Response
    {
        $this->authorize('delete', $computer);

        $computer->delete();

        return response()->noContent();
    }
}
