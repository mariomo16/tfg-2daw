import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
} from "@angular/core";
import { rxResource } from "@angular/core/rxjs-interop";
import { AuthService } from "@core/auth/auth.service";
import { ZoneService } from "@shared/services/zone.service";
import { GamingButton } from "@shared/ui/gaming-button/gaming-button";
import { Footer } from "@shared/ui/layout/footer/footer";
import { Navbar } from "@shared/ui/layout/navbar/navbar";
import { EmptyState } from "@shared/ui/states/empty-state/empty-state";
import { ErrorState } from "@shared/ui/states/error-state/error-state";
import { LoadingState } from "@shared/ui/states/loading-state/loading-state";

@Component({
	selector: "app-home",
	imports: [GamingButton, Navbar, Footer, LoadingState, ErrorState, EmptyState],
	templateUrl: "./home.html",
	styleUrl: "./home.css",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
	readonly #authService = inject(AuthService);
	readonly #zoneService = inject(ZoneService);

	protected readonly isLoading = computed(() => this.#authService.isLoading());
	protected readonly isLogged = computed(() =>
		this.#authService.isAuthenticated(),
	);

	protected readonly zoneResource = rxResource({
		stream: () => this.#zoneService.getAll() ?? [],
	});
}
