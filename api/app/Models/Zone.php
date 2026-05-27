<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Zone extends Model
{
    /** @use HasFactory<\Database\Factories\ZoneFactory> */
    use HasFactory, SoftDeletes;

    public $timestamps = false;

    protected $fillable = ['name', 'price_per_slot'];

    public function computers()
    {
        return $this->hasMany(Computer::class);
    }
}
