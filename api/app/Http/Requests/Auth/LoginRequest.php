<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

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
