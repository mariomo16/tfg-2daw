<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class ComputerRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:10'],
            'status' => ['required', 'string', 'in:available,occupied,maintenance'],
            'zone_id' => ['required', 'integer', 'exists:zones,id'],
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
        ];
    }
}
