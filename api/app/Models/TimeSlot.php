<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable(['start', 'end'])]
class TimeSlot extends Model
{
    use SoftDeletes;

    public $timestamps = false;

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }
}
