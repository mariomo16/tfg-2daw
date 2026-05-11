import {
	ChangeDetectionStrategy,
	Component,
	inject,
	signal,
} from "@angular/core";
import {
	email,
	form,
	maxLength,
	minLength,
	required,
} from "@angular/forms/signals";
import { Router } from "@angular/router";
import { AuthService } from "@core/auth/auth.service";
import type { RegisterDto } from "@shared/models/auth.model";

@Component({
	selector: "app-register",
	imports: [],
	templateUrl: "./register.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {
	readonly #authService = inject(AuthService);
	readonly #router = inject(Router);

	protected readonly isLoading = this.#authService.isLoading;

	// https://dev.to/abp_io/signal-based-forms-in-angular-21-why-youll-never-miss-reactive-forms-again-n7l
	// https://angular.dev/guide/forms/signals/validation
	protected readonly registerModel = signal<RegisterDto>({
		name: "",
		email: "",
		password: "",
		password_confirmation: "",
	});

	protected readonly form = form(this.registerModel, (schemaPath) => {
		required(schemaPath.name, { message: "El nombre es obligatorio" });
		minLength(schemaPath.name, 3, { message: "El nombre debe tener al menos 3 caracteres", });
		maxLength(schemaPath.name, 40, { message: "El nombre no puede superar los 40 caracteres", });

		required(schemaPath.email, { message: "El correo es obligatorio" });
		email(schemaPath.email, { message: "Introduce una dirección de correo válida", });

		required(schemaPath.password, { message: "La contraseña no puede estar vacía", });
		minLength(schemaPath.password, 8, { message: "La contraseña debe tener al menos 8 caracteres", });

		required(schemaPath.password_confirmation, { message: "Por favor, repite tu contraseña", });
	});

	onSubmit(): void {
		if (this.form.name().invalid()) {
			this.form().markAsTouched();
			return;
		}

		const data = this.form().value();
		if (data.password !== data.password_confirmation) {
			return;
		}

		this.#authService.register(data).subscribe({
			next: () => this.#router.navigate(["/"]),
			error: () => console.error("Error al crear la cuenta"),
		});
	}
}
