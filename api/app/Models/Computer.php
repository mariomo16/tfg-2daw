<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Computer extends Model
{
    /** @use HasFactory<\Database\Factories\ComputerFactory> */
    use HasFactory, SoftDeletes;

    public $timestamps = false;

    protected $fillable = ['name', 'zone_id', 'status', 'specs'];

    public function zone()
    {
        return $this->belongsTo(Zone::class);
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
