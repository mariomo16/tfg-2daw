<?php

namespace App\Http\Controllers\V1;

use App\Http\Requests\ZoneRequest;
use App\Http\Resources\ZoneResource;
use App\Models\Zone;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ZoneController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(
            ZoneResource::collection(Zone::with('computers')->get()),
            200
        );
    }

    public function store(ZoneRequest $request): JsonResponse
    {
        $this->authorize('create', Zone::class);

        $zone = Zone::create($request->validated());

        return response()->json(
            new ZoneResource($zone->load('computers')),
            201
        );
    }

    public function show(Zone $zone): JsonResponse
    {
        return response()->json(
            new ZoneResource($zone->load('computers')),
            200
        );
    }

    public function update(ZoneRequest $request, Zone $zone): JsonResponse
    {
        $this->authorize('update', $zone);

        $zone->update($request->validated());

        return response()->json(
            new ZoneResource($zone->fresh()->load('computers')),
            200
        );
    }

    public function destroy(Zone $zone): Response
    {
        $this->authorize('delete', $zone);

        $zone->delete();

        return response()->noContent();
    }
}
