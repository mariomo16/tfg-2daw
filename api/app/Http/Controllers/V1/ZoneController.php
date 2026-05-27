<?php

namespace App\Http\Controllers\V1;

use App\Models\Zone;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ZoneController extends Controller
{
    public function index()
    {
        return response()->json(Zone::with('computers')->get());
    }

    public function store(Request $request)
    {
        $zone = Zone::create($request->all()); // TODO: Hacer FormRequest
        return response()->json($zone->load('computers'));
    }

    public function show(Zone $zone)
    {
        return response()->json($zone->load('computers'));
    }

    public function update(Request $request, Zone $zone)
    {
        $zone->update($request->all()); // TODO: Hacer FormRequest
        return response()->json($zone->fresh()->load('computers'));
    }

    public function destroy(Zone $zone)
    {
        $zone->delete();
    }
}
