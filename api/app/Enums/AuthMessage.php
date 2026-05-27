<?php

namespace App\Enums;

enum AuthMessage: string
{
    case LOGOUT = 'logout';
    case FAILED = 'failed';

    public function message(): string
    {
        return match ($this) {
            self::LOGOUT => 'Sesión cerrada correctamente.',
            self::FAILED => 'Credenciales incorrectas.',
        };
    }
}
