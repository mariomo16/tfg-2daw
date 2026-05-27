<?php

namespace App\Http\Requests\Reservation;

use Illuminate\Foundation\Http\FormRequest;

class StoreReservationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'user_id' => ['required', 'integer', 'exists:users,id'],
            'computer_id' => ['required', 'integer', 'exists:computers,id'],
            'time_slot_id' => ['required', 'integer', 'exists:time_slots,id'],
            'date' => ['required', 'string', 'date', 'after_or_equal:today'],
            'total_price' => ['required', 'numeric', 'between:0,999.99', 'decimal:0,2'],
        ];
    }

    public function messages()
    {
        return [
            'user_id.required' => 'El ID de usuario es necesario.',
            'user_id.integer' => 'El ID de usuario debe ser un número entero.',
            'user_id.exists' => 'El usuario seleccionado no existe.',
            'computer_id.required' => 'El ID del equipo es necesario.',
            'computer_id.integer' => 'El ID del equipo debe ser un número entero.',
            'computer_id.exists' => 'El equipo seleccionado no existe.',
            'time_slot_id.required' => 'El ID del horario es necesario.',
            'time_slot_id.integer' => 'El ID del horario debe ser un número entero.',
            'time_slot_id.exists' => 'El horario seleccionado no existe.',
            'date.required' => 'La fecha de reserva es obligatoria.',
            'date.string' => 'La fecha debe ser una cadena de texto.',
            'date.date' => 'El formato de fecha no es válido.',
            'date.after_or_equal' => 'La fecha debe coincidir con el día actual.',
            'total_price.required' => 'El precio total es necesario.',
            'total_price.numeric' => 'El precio debe ser un número.',
            'total_price.decimal' => 'El precio debe incluir dos decimales.',
            'total_price.between' => 'El precio total debe estar entre 0 y 999.99',
        ];
    }
}
