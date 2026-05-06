<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable(['name', 'description', 'price', 'image'])]
class Zone extends Model
{
    use SoftDeletes;

    public function computers(): HasMany
    {
        return $this->hasMany(Computer::class);
    }
}
