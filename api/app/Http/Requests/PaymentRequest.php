<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class PaymentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_id' => ['required', 'numeric', 'exists:users,id'],
            'reservation_id' => ['required', 'numeric', 'exists:reservations,id'],
            'amount' => ['required', 'numeric'],
            'type' => ['required', 'string', 'in:payment|refund']
        ];
    }

    public function messages(): array
    {
        return [
            'user_id.required' => 'El ID de usuario es necesario.',
            'user_id.numeric' => 'El ID de usuario debe ser un número.',
            'user_id.exists' => 'No existe ningún usuario con ese ID',
            'reservation_id.required' => 'El ID de la reserva es necesario.',
            'reservation_id.numeric' => 'El ID de la reserva debe ser un número.',
            'reservation_id.exists' => 'No existe ninguna reserva con ese ID.',
            'amount.required' => 'La cantidad del pago es necesaria.',
            'amount.numeric' => 'La cantidad del pago debe ser un número.',
            'type.required' => 'El tipo de pago es necesario.',
            'type.string' => 'El tipo de pago debe ser una cadena de texto.',
            'type.in' => 'El tipo de pago introducido no es válido.',
        ];
    }
}
