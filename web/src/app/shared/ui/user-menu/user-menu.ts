import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
} from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "@core/auth/auth.service";
import { mapToUser } from "@shared/mappers/user.mapper";

@Component({
	selector: "app-user-menu",
	imports: [RouterLink],
	templateUrl: "./user-menu.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMenu {
	readonly #router = inject(Router);
	readonly #authService = inject(AuthService);
	protected readonly loggedUser = computed(() => {
		const user = this.#authService.user();
		return user ? mapToUser(user) : null;
	});

	protected onLogout() {
		this.#authService.logout().subscribe({
			next: () => this.#router.navigate(["/"]),
			error: (err) => console.error("No se ha podido cerrar sesion:", err),
		});
	}
}
