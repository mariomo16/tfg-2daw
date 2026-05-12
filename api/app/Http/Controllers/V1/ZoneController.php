<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\ZoneRequest;
use App\Http\Resources\ZoneResource;
use App\Models\Zone;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class ZoneController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        return response()->json(
            ZoneResource::collection(Zone::with('computers')->get()),
            200
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ZoneRequest $request): JsonResponse
    {
        $data = $request->validated();

        $zone = Zone::create($data);

        return response()->json(
            new ZoneResource($zone->load('computers')),
            201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Zone $zone): JsonResponse
    {
        return response()->json(
            new ZoneResource($zone->load('computers')),
            200
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ZoneRequest $request, Zone $zone): JsonResponse
    {
        $data = $request->validated();

        $zone->update(array_filter($data));

        return response()->json(
            new ZoneResource($zone->fresh()->load('computers')),
            200
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Zone $zone): Response
    {
        $zone->delete();

        return response()->noContent();
    }
}
