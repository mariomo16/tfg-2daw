<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileRequest extends FormRequest
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
            'userId' => ['required', 'integer', Rule::exists('users', 'id')],
            'name' => ['required', 'string', 'max:40'],
            'email' => ['required', 'string', Rule::unique('users', 'email')->ignore(auth()->id())],
            'image' => ['nullable', 'image', 'mimes:webp,png,jpg', 'max:2048']
        ];
    }

    public function messages()
    {
        return [
            'required' => 'Este campo es obligatorio',
            'string' => 'Has introducido datos no válidos',
            'email.unique' => 'Ya existe un usuario con ese correo electronico',
            'name.max' => 'Maximo 50 caracteres',
            'image.image' => 'Tiene que ser una imagen valida.',
            'image.mimes' => 'Solo se aceptan imágenes png, jpg y gif',
            'image.max' => 'El tamaño máximo permitido de imagen es de 2 MB'
        ];
    }
}
