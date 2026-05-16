import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { rxResource } from "@angular/core/rxjs-interop";
import { TimeSlotService } from "@shared/services/timeslot.service";
import { ZoneService } from "@shared/services/zone.service";
import { EmptyState } from "@shared/ui/states/empty-state/empty-state";
import { ErrorState } from "@shared/ui/states/error-state/error-state";
import { LoadingState } from "@shared/ui/states/loading-state/loading-state";
import { Footer } from "../../shared/ui/layout/footer/footer";
import { Navbar } from "../../shared/ui/layout/navbar/navbar";

@Component({
	selector: "app-info-zones",
	imports: [Navbar, Footer, LoadingState, ErrorState, EmptyState],
	templateUrl: "./info-zones.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoZones {
	readonly #zoneService = inject(ZoneService);
	readonly #timeSlotService = inject(TimeSlotService);

	protected readonly zoneResource = rxResource({
		stream: () => this.#zoneService.getAll() ?? [],
	});

	protected readonly timeSlotResource = rxResource({
		stream: () => this.#timeSlotService.getAll() ?? [],
	});

	protected readonly specs = [
		{ label: "Procesador", value: "Intel Core i7-14700KF" },
		{ label: "Gráfica", value: "NVIDIA RTX 4070 Ti SUPER" },
		{ label: "RAM", value: "32GB DDR5 6000MHz", icon: "🧠" },
		{ label: "Almacenamiento", value: "1TB NVMe SSD Gen4" },
		{ label: "Monitor", value: '27" 2K 240Hz IPS' },
		{ label: "Teclado", value: "Razer Huntsman" },
		{ label: "Ratón", value: "DeathAdder V3" },
		{ label: "Auriculares", value: "HyperX Cloud III" },
		{ label: "Silla", value: "Secretlab TITAN Evo" },
	];
}
