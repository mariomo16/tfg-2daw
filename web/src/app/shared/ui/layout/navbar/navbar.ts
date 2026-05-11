import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AuthService } from "@core/auth/auth.service";
import { APP } from "../../../../core/constants/app.constants";

@Component({
	selector: "app-navbar",
	imports: [RouterLink],
	templateUrl: "./navbar.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
	readonly #authService = inject(AuthService);

	protected readonly appName = APP.name;

	protected readonly isAuthenticated = this.#authService.isAuthenticated;
	protected readonly isLoading = this.#authService.isLoading;
	protected readonly user = this.#authService.user;
	protected readonly isStaff = this.#authService.isStaff;

	protected readonly navLinks = [
		{
			label: "Inicio",
			path: "/",
		},
		{
			label: "Zonas",
			path: "/zones",
		},
	];
}
