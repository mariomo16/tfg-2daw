<?php

namespace App\Http\Controllers\V1;

use App\Models\Computer;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ComputerController extends Controller
{
    public function index()
    {
        return response()->json(Computer::with(['zone', 'reservations'])->get());
    }

    public function store(Request $request)
    {
        $computer = Computer::create($request->all()); // TODO: Hacer FormRequest
        return response()->json($computer->load(['zone', 'reservations']));
    }

    public function show(Computer $computer)
    {
        return response()->json($computer->load(['zone', 'reservations']));
    }

    public function update(Request $request, Computer $computer)
    {
        $computer->update($request->all()); // TODO: Hacer FormRequest
        return response()->json($computer->fresh()->load(['zone', 'reservations']));
    }

    public function destroy(Computer $computer)
    {
        $computer->delete();
    }
}
