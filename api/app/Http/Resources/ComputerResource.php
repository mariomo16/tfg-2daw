<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ComputerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'specs' => $this->specs,
            'status' => $this->status,
            'zone_id' => $this->zone_id,
            'zone' => $this->whenLoaded('zone'),
            'reservations' => $this->whenLoaded('reservations'),
        ];
    }
}
