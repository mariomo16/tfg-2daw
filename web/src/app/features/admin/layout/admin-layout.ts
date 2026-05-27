import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { APP } from "../../../core/constants/app.constants";
import { Icon } from "../../../shared/components/icon/icon";
import { AuthService } from "../../auth/auth.service";

interface Catalog {
	name: string;
	routerLink: string;
	icon: string;
}

@Component({
	selector: "app-admin-layout",
	imports: [RouterOutlet, RouterLink, RouterLinkActive, Icon],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: "./admin-layout.html",
})
export class AdminLayout {
  readonly #authService = inject(AuthService);

  protected readonly user = this.#authService.user;

	protected readonly app = APP;
	protected readonly navClasses: string =
		"flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:bg-surface-700/50 hover:text-text-primary";

	protected readonly arrowBack: string = "arrow-left";

	protected readonly styles = {
		navItem:
			"flex items-center gap-3 px-3 py-2 text-sm font-medium hover:bg-zinc-800/50 hover:text-zinc-200 rounded-lg",
		navItemActive: "text-zinc-100 bg-zinc-800/50",
	};

	protected readonly navItems: Catalog[] = [
		{
			name: "Dashboard",
			routerLink: "/admin/dashboard",
			icon: "squares-2x2",
		},
		{
			name: "Reservas",
			routerLink: "/admin/reservations",
			icon: "calendar-days",
		},
		{
			name: "Usuarios",
			routerLink: "/admin/users",
			icon: "users",
		},
		{
			name: "Pagos",
			routerLink: "/admin/payments",
			icon: "banknotes",
		},
		{
			name: "Ordenadores",
			routerLink: "/admin/computers",
			icon: "computer-desktop",
		},
		{
			name: "Zonas",
			routerLink: "/admin/zones",
			icon: "rectangle-group",
		},
		{
			name: "Franjas horarias",
			routerLink: "/admin/timeslots",
			icon: "clock",
		},
	];
}
