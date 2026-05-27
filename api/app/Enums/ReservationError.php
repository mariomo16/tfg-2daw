<?php

namespace App\Enums;

enum ReservationError: string
{
    case COMPUTER_MAINTENANCE = 'maintenance';
    case COMPUTER_OCCUPIED = 'occupied';
    case INSUFICENT_BALANCE = 'balance';

    public function message(): string
    {
        return match ($this) {
            self::COMPUTER_MAINTENANCE => 'El equipo no está disponible por mantenimiento.',
            self::COMPUTER_OCCUPIED => 'Este ordenador ya tiene una reserva en ese horario.',
            self::INSUFICENT_BALANCE => 'No tienes creditos suficientes en tu cuenta.'
        };
    }
}