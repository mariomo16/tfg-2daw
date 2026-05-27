import {
	ChangeDetectionStrategy,
	Component,
	inject,
	signal,
} from "@angular/core";
import {
	NonNullableFormBuilder,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { Icon } from "../../../shared/components/icon/icon";
import { AuthService } from "../auth.service";

@Component({
	selector: "app-register",
	imports: [RouterLink, Icon, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: "./register.html",
})
export class Register {
	readonly #fb = inject(NonNullableFormBuilder);
	readonly #authService = inject(AuthService);
	readonly #router = inject(Router);

	readonly isLoading = this.#authService.isLoading;
	readonly error = signal<string | null>(null);

	readonly form = this.#fb.group({
		name: ["", [Validators.required, Validators.minLength(3)]],
		email: ["", [Validators.required, Validators.email]],
		password: ["", [Validators.required, Validators.minLength(8)]],
		password_confirmation: ["", Validators.required],
	});

	onSubmit(): void {
		this.error.set(null);

		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}

		const data = this.form.getRawValue();
		if (data.password !== data.password_confirmation) {
			this.error.set("Las contraseñas no coinciden");
			return;
		}

		this.#authService.register(data).subscribe({
			next: () => this.#router.navigate(["/"]),
			error: (err) =>
				this.error.set(err.error?.message || "Error al crear la cuenta"),
		});
	}
}
