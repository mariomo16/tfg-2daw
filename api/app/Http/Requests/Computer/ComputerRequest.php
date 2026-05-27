<?php

namespace App\Http\Requests\Computer;

use Illuminate\Foundation\Http\FormRequest;

class ComputerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'zone_id' => ['required', 'integer', 'exists:zones,id'],
            'name' => ['required', 'string', 'max:10'],
            'status' => ['required', 'string', 'in:available,maintenance,occupied'],
            'specs' => ['nullable', 'string'],
        ];
    }

    public function messages()
    {
        return [
            'zone_id.required' => 'Debes seleccionar una zona para continuar.',
            'zone_id.integer' => 'El identificador de la zona debe ser un número.',
            'zone_id.exists' => 'La zona seleccionada no es válida.',
            'name.required' => 'El nombre es necesario.',
            'name.string' => 'El nombre debe ser un texto válido.',
            'name.max' => 'El nombre no puede tener más de 10 caracteres.',
            'status.required' => 'El estado del equipo es necesario.',
            'status.string' => 'El estado debe ser una cadena de texto.',
            'status.in' => 'El estado seleccionado no es válido',
            'specs.string' => 'Las especificaciones deben ser una cadena de texto.',
        ];
    }
}
