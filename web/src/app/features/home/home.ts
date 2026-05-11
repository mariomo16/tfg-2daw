import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
} from "@angular/core";
import { AuthService } from "@core/auth/auth.service";
import { LoadingState } from "@shared/ui/states/loading-state/loading-state";
import { GamingButton } from "../../shared/ui/gaming-button/gaming-button";
import { Footer } from "../../shared/ui/layout/footer/footer";
import { Navbar } from "../../shared/ui/layout/navbar/navbar";

@Component({
	selector: "app-home",
	imports: [GamingButton, Navbar, Footer, LoadingState],
	templateUrl: "./home.html",
	styleUrl: "./home.css",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
	readonly #authService = inject(AuthService);
	protected readonly isLoading = computed(() => this.#authService.isLoading());
	protected readonly isLogged = computed(() =>
		this.#authService.isAuthenticated(),
	);

	protected readonly zones = [
		{
			name: "Standard",
			description:
				"Cuenta con 70 ordenadores de alto rendimiento preparados para satisfacer tus necesidades",
			image: "./images/zones/standard.webp",
		},
		{
			name: "Bootcamp",
			description:
				"Ideal tanto para equipos como para los jugadores mas exigentes y en busca de un espacio mas privado",
			image: "./images/zones/bootcamp.webp",
		},
		{
			name: "Streaming",
			description:
				"Si crear contenido es tu objetivo, este es el sitio que buscas, una sala de streaming equipada con todo lo necesario",
			image: "./images/zones/streaming.webp",
		},
	];
}
