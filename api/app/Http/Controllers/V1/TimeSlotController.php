<?php

namespace App\Http\Controllers\V1;

use App\Models\TimeSlot;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TimeSlotController extends Controller
{
    public function index()
    {
        return response()->json(TimeSlot::with('reservations')->get());
    }

    public function store(Request $request)
    {
        $timeslot = TimeSlot::create($request->all()); // TODO: Hacer FormRequest
        return response()->json($timeslot->load('reservations'));
    }

    public function show(TimeSlot $timeslot)
    {
        return response()->json($timeslot->load('reservations'));
    }

    public function update(Request $request, TimeSlot $timeslot)
    {
        $timeslot->update($request->all()); // TODO: Hacer FormRequest
        return response()->json($timeslot->fresh()->load('reservations'));
    }

    public function destroy(TimeSlot $timeslot)
    {
        $timeslot->delete();
    }
}
