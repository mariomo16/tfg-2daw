<?php

namespace App\Enums;

enum ComputerStatus: string
{
    case AVAILABLE = 'available';
    case MAINTENANCE = 'maintenance';
    case OCCUPIED = 'occupied';
}