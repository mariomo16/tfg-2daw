<?php

use App\Http\Controllers\V1\ProfileController;
use App\Http\Controllers\V1\UserController;
use App\Http\Controllers\V1\NotificationController;
use App\Http\Controllers\V1\PaymentController;
use App\Http\Controllers\V1\ReservationController;
use App\Http\Controllers\V1\TimeSlotController;
use App\Http\Controllers\V1\AuthController;
use App\Http\Controllers\V1\ComputerController;
use App\Http\Controllers\V1\ZoneController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {

    // Endpoint de Health Check para Render
    Route::get('/status', function () {
        return response()->json([
            'status' => 'OK',
        ]);
    });

    Route::get('/zones', [ZoneController::class, 'index']);
    Route::get('/zones/{zone}', [ZoneController::class, 'show']);

    Route::get('/computers', [ComputerController::class, 'index']);
    Route::get('/computers/{computer}', [ComputerController::class, 'show']);

    Route::get('/timeslots', [TimeSlotController::class, 'index']);

    Route::middleware('guest:sanctum')->group(function () {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);
    });

    Route::middleware('auth:sanctum')->group(function () {

        Route::get('/user', [AuthController::class, 'me']);
        Route::post('/profile', [ProfileController::class, 'update']);
        Route::post('/logout', [AuthController::class, 'logout']);

        Route::post('/user/topup', [UserController::class, 'topupBalance']);

        Route::get('/my-reservations', [ReservationController::class, 'myReservations']);
        Route::post('/reservations', [ReservationController::class, 'store']);
        Route::get('/reservations/{reservation}', [ReservationController::class, 'show']);
        Route::post('/reservations/{reservation}/cancel', [ReservationController::class, 'cancel']);

        Route::get('/my-payments', [PaymentController::class, 'myPayments']);
        Route::get('/payments/{payment}', [PaymentController::class, 'show']);

        Route::get('/my-notifications', [NotificationController::class, 'myNotifications']);

        Route::prefix('admin')->group(function () {

            Route::apiResource('users', UserController::class);

            Route::apiResource('zones', ZoneController::class)->except(['index', 'show']);
            Route::apiResource('computers', ComputerController::class)->except(['index', 'show']);
            Route::apiResource('timeslots', TimeSlotController::class)->except(['index']);

            Route::apiResource('reservations', ReservationController::class)->except(['store', 'show']);
            Route::apiResource('payments', PaymentController::class)->except(['show']);
            Route::apiResource('notifications', NotificationController::class);
        });
    });
});
