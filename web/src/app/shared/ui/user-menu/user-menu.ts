import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "@core/auth/auth.service";

@Component({
	selector: "app-user-menu",
	imports: [RouterLink],
	templateUrl: "./user-menu.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMenu {
	readonly #router = inject(Router);
	readonly #authService = inject(AuthService);
	protected readonly loggedUser = this.#authService.user;

	protected onLogout() {
		this.#authService.logout().subscribe({
			next: () => this.#router.navigate(["/"]),
			error: (err) => console.error("No se ha podido cerrar sesion:", err),
		});
	}
}
