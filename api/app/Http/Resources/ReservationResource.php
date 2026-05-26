<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReservationResource extends JsonResource
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
            'user_id' => $this->user_id,
            'computer_id' => $this->computer_id,
            'time_slot_id' => $this->time_slot_id,
            'date' => $this->date,
            'status' => $this->status,
            'price' => $this->price,
            'updated_at' => $this->updated_at,
            'created_at' => $this->created_at,
            'computer' => $this->whenLoaded('computer'),
            'payment' => $this->whenLoaded('payment'),
            'time_slot' => $this->whenLoaded('timeSlot'),
            'user' => $this->whenLoaded('user'),
        ];
    }
}
