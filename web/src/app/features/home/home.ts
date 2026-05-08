import { ChangeDetectionStrategy, Component } from "@angular/core";
import { GamingButton } from "../../shared/ui/gaming-button/gaming-button";

@Component({
	selector: "app-home",
	imports: [GamingButton],
	templateUrl: "./home.html",
	styleUrl: "./home.css",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
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
