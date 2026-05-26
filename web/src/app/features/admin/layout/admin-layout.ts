import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import {
	NavigationEnd,
	Router,
	RouterLink,
	RouterLinkActive,
	RouterOutlet,
} from "@angular/router";
import { AuthService } from "@core/auth/auth.service";
import { APP } from "@core/constants/app.constants";
import { UserMenu } from "@shared/ui/user-menu/user-menu";
import { filter, map } from "rxjs";

interface Catalog {
	name: string;
	routerLink: string;
	icon: string;
}

@Component({
	selector: "app-admin-layout",
	imports: [RouterOutlet, RouterLink, RouterLinkActive, UserMenu],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: "./admin-layout.html",
})
export class AdminLayout {
	readonly #authService = inject(AuthService);

	protected readonly user = this.#authService.user;

	protected readonly app = APP;

	protected readonly navItems: Catalog[] = [
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
			name: "Zonas",
			routerLink: "/admin/zones",
			icon: "rectangle-group",
		},
		{
			name: "Ordenadores",
			routerLink: "/admin/computers",
			icon: "computer-desktop",
		},
		{
			name: "Franjas horarias",
			routerLink: "/admin/timeslots",
			icon: "clock",
		},
		// {
		// 	name: "Notificaciones",
		// 	routerLink: "/admin/notifications",
		// 	icon: "bell",
		// },
	];
}
