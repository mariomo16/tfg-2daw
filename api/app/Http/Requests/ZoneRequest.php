<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class ZoneRequest extends FormRequest
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
            'name' => ['required', 'string'],
            'description' => ['required', 'string', 'max:100'],
            'image' => ['nullable', 'image', 'mimes:webp,png,jpg,gif', 'max:2048'],
            'price' => ['required', 'numeric', 'between:0,99.99']
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'El nombre de la zona es necesario.',
            'name.string' => 'El nombre de la zona debe ser una cadena de texto.',
            'price.required' => 'El precio/hora de la zona es necesario.',
            'price.numeric' => 'El precio/hora de la zona debe ser un número.',
            'price.between' => 'El precio/hora de la zona debe ser entre 0 y 99.99.',
            'image.image' => 'Tiene que ser una imagen valida.',
            'image.mimes' => 'Solo se aceptan imágenes webp, png y jpg',
            'image.max' => 'El tamaño máximo permitido de imagen es de 2 MB'
        ];
    }
}
