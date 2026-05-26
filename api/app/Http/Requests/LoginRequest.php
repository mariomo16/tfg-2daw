<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
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
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ];
    }

    public function messages()
    {
        return [
            'email.required' => 'El correo electrónico es necesario.',
            'email.string' => 'El correo debe ser una cadena de texto.',
            'email.email' => 'El formato del correo no es válido.',
            'password.required' => 'La contraseña es necesaria.',
            'password.string' => 'La contraseña debe ser una cadena de texto.',
        ];
    }
}
