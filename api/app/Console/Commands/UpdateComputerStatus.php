<?php

namespace App\Console\Commands;

use App\Models\Computer;
use App\Models\Reservation;
use Carbon\Carbon;
use Illuminate\Console\Command;

class UpdateComputerStatus extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-computer-status';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Actualizar el estado del ordenador dependiendo del horario de la reserva';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $now = Carbon::now();
        $today = $now->toDateString();
        $currentTime = $now->toTimeString();

        $activeReservations = Reservation::whereDate('date', $today)
            ->where('status', 'confirmed')
            ->whereHas('timeSlot', function ($query) use ($currentTime) {
                $query->where('start', '<=', $currentTime)
                    ->where('end', '>', $currentTime);
            })
            ->pluck('computer_id')
            ->toArray();

        Computer::whereIn('id', $activeReservations)
            ->where('status', 'available')
            ->update(['status' => 'occupied']);

        Computer::whereNotIn('id', $activeReservations)
            ->where('status', 'occupied')
            ->update(['status' => 'available']);
    }
}