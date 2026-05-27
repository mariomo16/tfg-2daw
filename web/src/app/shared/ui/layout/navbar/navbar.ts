import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { APP } from "../../../../core/constants/app.constants";
import { AuthService } from "../../../../features/auth/auth.service";

@Component({
	selector: "app-navbar",
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [RouterLink],
	templateUrl: "./navbar.html",
})
export class Navbar {
	readonly #authService = inject(AuthService);

	protected readonly app = APP;
	protected readonly isAuthenticated = this.#authService.isAuthenticated;
	protected readonly user = this.#authService.user;

	protected onLogout(): void {
		this.#authService.logout().subscribe();
	}
}
