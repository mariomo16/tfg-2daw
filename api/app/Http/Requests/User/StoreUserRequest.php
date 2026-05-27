<?php

namespace App\Http\Requests\User;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreUserRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:40'],
            'email' => ['required', 'string', 'unique:users'],
            'role' => ['required', 'in:client,employee,admin'],
            'balance' => ['required', 'numeric', 'between:0,999.99'],
            'password' => ['required', 'string', Password::defaults()],
            'image' => ['nullable', 'image', 'mimes:webp,png,jpg,gif', 'max:2048']
        ];
    }

    public function messages()
    {
        return [
            'required' => 'Este campo es obligatorio',
            'string' => 'Has introducido datos no válidos',
            'role.in' => 'Has introducido un rol no valido',
            'numeric' => 'Has introducido datos no válidos',
            'between' => 'El valor debe estar entre :min y :max',
            'name.max' => 'Máximo 40 caracteres',
            'email.unique' => 'Ya existe un usuario con ese correo',
            'image.image' => 'Tiene que ser una imagen valida.',
            'image.mimes' => 'Solo se aceptan imágenes png, jpg y gif',
            'image.max' => 'El tamaño máximo permitido de imagen es de 2 MB'
        ];
    }
}
