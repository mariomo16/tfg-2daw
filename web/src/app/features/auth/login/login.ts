import {
	ChangeDetectionStrategy,
	Component,
	inject,
	signal,
} from "@angular/core";
import {
	email,
	FormField,
	FormRoot,
	form,
	required,
} from "@angular/forms/signals";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "@core/auth/auth.service";
import type { LoginDto } from "@shared/models/auth.model";
import { GamingButton } from "@shared/ui/gaming-button/gaming-button";

@Component({
	selector: "app-login",
	imports: [FormRoot, FormField, RouterLink, GamingButton],
	templateUrl: "./login.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
	readonly #authService = inject(AuthService);
	readonly #router = inject(Router);

	protected readonly isLoading = this.#authService.isLoading;

	// https://dev.to/abp_io/signal-based-forms-in-angular-21-why-youll-never-miss-reactive-forms-again-n7l
	// https://angular.dev/guide/forms/signals/validation
	protected readonly registerModel = signal<LoginDto>({
		email: "",
		password: "",
	});

	protected readonly form = form(this.registerModel, (schemaPath) => {
		required(schemaPath.email, { message: "El correo es obligatorio" });
		email(schemaPath.email, {
			message: "Introduce una dirección de correo válida",
		});

		required(schemaPath.password, {
			message: "La contraseña no puede estar vacía",
		});
	});

	onSubmit(): void {
		if (!this.form().valid()) {
			this.form().markAsTouched();
			return;
		}

		const data = this.form().value();

		this.#authService.login(data).subscribe({
			next: () => this.#router.navigate(["/"]),
			error: (err) => console.error("Error al iniciar sesión:", err),
		});
	}
}
