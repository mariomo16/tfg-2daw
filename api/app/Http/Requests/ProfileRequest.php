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
            'name' => ['required', 'string', 'max:40'],
            'email' => ['required', 'string', Rule::unique('users', 'email')->ignore(auth()->id())],
            'avatar_path' => ['nullable', 'image', 'mimes:webp,png,jpg', 'max:2048']
        ];
    }

    public function messages()
    {
        return [
            'required' => 'Este campo es obligatorio',
            'string' => 'Has introducido datos no válidos',
            'email.unique' => 'Ya existe un usuario con ese correo electronico',
            'name.max' => 'Maximo 50 caracteres',
            'avatar_path.image' => 'Tiene que ser una imagen valida.',
            'avatar_path.mimes' => 'Solo se aceptan imágenes webp, png y jpg',
            'avatar_path.max' => 'El tamaño máximo permitido de imagen es de 2 MB'
        ];
    }
}
