<?php

namespace App\Http\Requests\User;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
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
            'email' => ['required', 'string', Rule::unique('users', 'email')->ignore($this->route('user')->id)],
            'role' => ['required', 'in:client,employee,admin'],
            'balance' => ['required', 'numeric', 'between:0,999.99'],
            'password' => ['nullable', 'string', Password::defaults()],
            'image' => ['nullable', 'image', 'mimes:webp,png,jpg,gif', 'max:2048']
        ];
    }

    public function messages()
    {
        return [
            'required' => 'Este campo es obligatorio',
            'string' => 'Has introducido datos no válidos',
            'email.unique' => 'Ya existe un usuario con ese correo electronico',
            'numeric' => 'Has introducido datos no válidos',
            'between' => 'El valor debe estar entre :min y :max',
            'name.max' => 'Maximo 50 caracteres',
            'role.in' => 'Has introducido un rol no valido',
            'image.image' => 'Tiene que ser una imagen valida.',
            'image.mimes' => 'Solo se aceptan imágenes png, jpg y gif',
            'image.max' => 'El tamaño máximo permitido de imagen es de 2 MB'
        ];
    }
}
