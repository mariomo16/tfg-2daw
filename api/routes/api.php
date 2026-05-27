<?php

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

    // Para el componente health de Angular
    Route::get('/status', function () {
        return response()->json([
            'status' => 'up',
            'time' => round((microtime(true) - LARAVEL_START) * 1000),
        ]);
    });

    // ==========================================
    // AUTENTICACIÓN
    // ==========================================
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    // ==========================================
    // RUTAS PÚBLICAS
    // ==========================================
    Route::get('/zones', [ZoneController::class, 'index']);
    Route::get('/zones/{zone}', [ZoneController::class, 'show']);

    Route::get('/computers', [ComputerController::class, 'index']);
    Route::get('/computers/{computer}', [ComputerController::class, 'show']);
    Route::get('/zones/{zone}/computers', [ComputerController::class, 'byZone']);

    // Consultar disponibilidad
    Route::get('/computers/{computer}/availability', [ComputerController::class, 'availability']);
    Route::get('/timeslots', [TimeSlotController::class, 'index']);

    // ==========================================
    // RUTAS PROTEGIDAS
    // ==========================================
    Route::middleware('auth:sanctum')->group(function () {

        // --- CUENTA DE USUARIO ---
        Route::get('/user', [AuthController::class, 'user']);
        Route::post('/logout', [AuthController::class, 'logout']);
        // Recargas de saldo
        Route::post('/user/topup', [UserController::class, 'topupBalance']);

        // --- ACCIONES DE CLIENTES ---
        // Reservas del usuario logueado
        Route::get('/my-reservations', [ReservationController::class, 'myReservations']);
        Route::post('/reservations', [ReservationController::class, 'store']);
        Route::get('/reservations/{reservation}', [ReservationController::class, 'show']);
        Route::post('/reservations/{reservation}/cancel', [ReservationController::class, 'cancel']);

        // Pagos del usuario logueado
        Route::get('/my-payments', [PaymentController::class, 'myPayments']);
        Route::get('/payments/{payment}', [PaymentController::class, 'show']);

        // Notificaciones del usuario logueado
        Route::get('/my-notifications', [NotificationController::class, 'myNotifications']);
        Route::patch('/notifications/read-all', [NotificationController::class, 'markAllAsRead']);
        Route::patch('/notifications/{notification}/read', [NotificationController::class, 'markAsRead']);

        // ==========================================
        // RUTAS ADMIN/EMPLEADO
        // ==========================================
        // Quizas estaria bien aprender a crear un middleware para comprobar si es admin/empleado
        Route::prefix('admin')->group(function () {

            // Gestión de Usuarios
            Route::apiResource('users', UserController::class);

            // Gestión de Catálogo
            Route::apiResource('zones', ZoneController::class)->except(['index', 'show']);
            Route::apiResource('computers', ComputerController::class)->except(['index', 'show']);
            Route::apiResource('timeslots', TimeSlotController::class)->except(['index']);

            // Gestión de Operaciones Generales
            Route::apiResource('reservations', ReservationController::class)->except(['store', 'show']);
            Route::apiResource('payments', PaymentController::class)->except(['show']);
            Route::apiResource('notifications', NotificationController::class)->except(['show']);
        });
    });
});
