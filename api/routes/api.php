<?php

use App\Http\Controllers\V1\AuthController;
use App\Http\Controllers\V1\AuthNotification;
use App\Http\Controllers\V1\AuthPayment;
use App\Http\Controllers\V1\AuthReservation;
use App\Http\Controllers\V1\ComputerController;
use App\Http\Controllers\V1\NotificationController;
use App\Http\Controllers\V1\PaymentController;
use App\Http\Controllers\V1\ProfileController;
use App\Http\Controllers\V1\ReservationController;
use App\Http\Controllers\V1\TimeSlotController;
use App\Http\Controllers\V1\UserController;
use App\Http\Controllers\V1\ZoneController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {

    Route::get('/', function () {
        return response()->json([
            'status' => 'OK',
        ]);
    });

    // Para pruebas por ahora, luego se eliminarán estas rutas
    Route::apiResource('users', UserController::class);
    Route::apiResource('computers', ComputerController::class);
    Route::apiResource('timeslots', TimeSlotController::class);
    Route::apiResource('reservations', ReservationController::class);
    Route::apiResource('payments', PaymentController::class);
    Route::apiResource('notifications', NotificationController::class);

    Route::apiResource('zones', ZoneController::class)->except(['index', 'show']);

    Route::get('/zones', [ZoneController::class, 'index']);
    Route::get('/zones/{zone}', [ZoneController::class, 'show']);
    Route::get('/timeslots', [TimeSlotController::class, 'index']);

    Route::middleware('guest:sanctum')->group(function () {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);
    });

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/user', [ProfileController::class, 'show']);
        Route::post('/profile', [ProfileController::class, 'update']);
        Route::post('/logout', [AuthController::class, 'logout']);

        Route::get('/my-reservations', [AuthReservation::class, 'index']);
        Route::post('/reservations', [ReservationController::class, 'store']);
        Route::get('/reservations/{reservation}', [ReservationController::class, 'show']);
        Route::post('/reservations/{reservation}/cancel', [ReservationController::class, 'destroy']);

        Route::get('/my-payments', [AuthPayment::class, 'index']);
        Route::get('/payments/{payment}', [PaymentController::class, 'show']);

        Route::get('/my-notifications', [AuthNotification::class, 'index']);

        // Route::apiResource('users', UserController::class);
        // Route::apiResource('zones', ZoneController::class)->except(['index', 'show']);
        // Route::apiResource('computers', ComputerController::class);
        // Route::apiResource('timeslots', TimeSlotController::class)->except(['index']);
        // Route::apiResource('reservations', ReservationController::class);
        // Route::apiResource('payments', PaymentController::class);
        // Route::apiResource('notifications', NotificationController::class);
    });
});
