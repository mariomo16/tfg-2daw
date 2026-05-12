import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AuthService } from "@core/auth/auth.service";
import type { IconSize } from "@shared/models/icon-size.model";
import { Logo } from "@shared/ui/icons/logo/logo";
import { NormalButton } from "@shared/ui/normal-button/normal-button";
import { LoadingState } from "@shared/ui/states/loading-state/loading-state";
import { UserMenu } from "@shared/ui/user-menu/user-menu";

@Component({
	selector: "app-navbar",
	imports: [RouterLink, UserMenu, NormalButton, LoadingState, Logo],
	templateUrl: "./navbar.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
	readonly #authService = inject(AuthService);

	protected readonly size: IconSize = {
		width: 36,
		height: 36,
	};

	protected readonly isAuthenticated = this.#authService.isAuthenticated;
	protected readonly isLoading = this.#authService.isLoading;
	protected readonly user = this.#authService.user;
	protected readonly isStaff = this.#authService.isStaff;

	protected readonly navLinks = [
		{
			label: "INICIO",
			path: "/",
		},
		{
			label: "ZONAS",
			path: "/zones",
		},
	];
}
