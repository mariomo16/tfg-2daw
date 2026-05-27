<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TimeSlot extends Model
{
    /** @use HasFactory<\Database\Factories\TimeSlotFactory> */
    use HasFactory, SoftDeletes;

    public $timestamps = false;

    protected $fillable = ['start_time', 'end_time'];

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
