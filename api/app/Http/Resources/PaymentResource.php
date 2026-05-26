<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
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
            'reservation_id' => $this->reservation_id,
            'amount' => $this->amount,
            'type' => $this->type,
            'created_at' => $this->created_at,
            'user' => $this->whenLoaded('user'),
            'reservation' => $this->whenLoaded('reservation'),
        ];
    }
}
