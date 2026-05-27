<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:40'],
            'email' => ['required', 'string', 'email', 'unique:users'],
            'password' => ['required', 'string', 'confirmed', Password::defaults()],
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'El nombre es necesario.',
            'name.string' => 'El nombre debe ser un texto válido.',
            'name.max' => 'El nombre no puede contener mas de 40 caracteres.',
            'email.required' => 'El correo electrónico es necesario.',
            'email.string' => 'El correo debe ser un texto válido.',
            'email.email' => 'El formato del correo no es válido.',
            'email.unique' => 'El correo ya está en uso.',
            'password.required' => 'La contraseña es necesaria.',
            'password.string' => 'La contraseña debe ser un texto válido.',
            'password.confirmed' => 'Las contraseñas no coinciden.'
        ];
    }
}
