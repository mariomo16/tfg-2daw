<?php

namespace App\Http\Controllers\V1;


use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(
            User::with(["reservations", "payments", "notifications"])->get()
        );
    }

    public function store(Request $request)
    {
        $user = User::create($request->all()); // TODO: Hacer FormRequest
        return response()->json($user->load(["reservations", "payments", "notifications"]));
    }

    public function show(User $user)
    {
        return response()->json($user->load(["reservations", "payments", "notifications"]));
    }

    public function update(Request $request, User $user)
    {
        $data = array_filter($request->all());
        $user->update($data); // TODO: Hacer FormRequest
        return response()->json($user->fresh()->load(["reservations", "payments", "notifications"]));
    }

    public function destroy(User $user)
    {
        $user->delete();
    }
}
