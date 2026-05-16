import { CurrencyPipe } from "@angular/common";
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	signal,
} from "@angular/core";
import { rxResource } from "@angular/core/rxjs-interop";

import { AuthService } from "@core/auth/auth.service";
import { ComputerService } from "@shared/services/computer.service";
import { ReservationService } from "@shared/services/reservation.service";
import { TimeSlotService } from "@shared/services/timeslot.service";
import { ZoneService } from "@shared/services/zone.service";
import { EmptyState } from "@shared/ui/states/empty-state/empty-state";
import { ErrorState } from "@shared/ui/states/error-state/error-state";
import { LoadingState } from "@shared/ui/states/loading-state/loading-state";
import { Footer } from "../../shared/ui/layout/footer/footer";
import { Navbar } from "../../shared/ui/layout/navbar/navbar";

@Component({
	selector: "app-book-computer",
	imports: [Navbar, Footer, LoadingState, ErrorState, EmptyState, CurrencyPipe],
	templateUrl: "./book-computer.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookComputer {
	readonly #authService = inject(AuthService);
	readonly #zoneService = inject(ZoneService);
	readonly #computerService = inject(ComputerService);
	readonly #timeSlotService = inject(TimeSlotService);
	readonly #reservationService = inject(ReservationService);

	protected readonly currentStep = signal(1);

	protected readonly steps = [
		{ number: 1, label: "Zona" },
		{ number: 2, label: "Ordenador" },
		{ number: 3, label: "Fecha" },
		{ number: 4, label: "Horario" },
		{ number: 5, label: "Confirmar" },
	];

	// Selecciones para poder cambiar lo
	protected readonly selectedZoneId = signal<number | null>(null);
	protected readonly selectedComputerId = signal<number | null>(null);
	protected readonly selectedDate = signal<string>("");
	protected readonly selectedTimeSlotId = signal<number | null>(null);

	// Estados de la reserva
	protected readonly isSubmitting = signal(false);
	protected readonly bookingSuccess = signal(false);

	// Fecha minima (hoyy)
	protected readonly minDate = new Date().toISOString().split("T")[0];

	// Recursos de zonas ordenadores horario ....
	protected readonly zoneResource = rxResource({
		stream: () => this.#zoneService.getAll() ?? [],
	});

	protected readonly computerResource = rxResource({
		stream: () => this.#computerService.getAll() ?? [],
	});

	protected readonly timeSlotResource = rxResource({
		stream: () => this.#timeSlotService.getAll() ?? [],
	});

	protected readonly availableComputers = computed(() => {
		const computers = this.computerResource.value() ?? [];
		const zoneId = this.selectedZoneId();
		return computers.filter(
			(c) => c.zone?.id === zoneId && c.status === "available",
		);
	});

	protected readonly selectedZoneName = computed(() => {
		const zones = this.zoneResource.value() ?? [];
		return zones.find((z) => z.id === this.selectedZoneId())?.name;
	});

	protected readonly selectedZonePrice = computed(() => {
		const zones = this.zoneResource.value() ?? [];
		return zones.find((z) => z.id === this.selectedZoneId())?.price;
	});

	protected readonly selectedComputerName = computed(() => {
		const computers = this.computerResource.value() ?? [];
		return computers.find((c) => c.id === this.selectedComputerId())?.name;
	});

	protected readonly selectedTimeSlotLabel = computed(() => {
		const slots = this.timeSlotResource.value() ?? [];
		const slot = slots.find((s) => s.id === this.selectedTimeSlotId());
		return `${slot?.start.slice(0, 5)} — ${slot?.end.slice(0, 5)}`;
	});

	protected readonly canAdvance = computed(() => {
		switch (this.currentStep()) {
			case 1:
				return this.selectedZoneId() !== null;
			case 2:
				return this.selectedComputerId() !== null;
			case 3:
				return this.selectedDate() !== "";
			case 4:
				return this.selectedTimeSlotId() !== null;
			default:
				return false;
		}
	});

	// Acciones
	selectZone(id: number): void {
		this.selectedZoneId.set(id);
		this.selectedComputerId.set(null);
	}

	selectComputer(id: number): void {
		this.selectedComputerId.set(id);
	}

	selectDate(event: Event): void {
		const input = event.target as HTMLInputElement;
		this.selectedDate.set(input.value);
	}

	selectTimeSlot(id: number): void {
		this.selectedTimeSlotId.set(id);
	}

	nextStep(): void {
		if (this.currentStep() < 5) {
			this.currentStep.update((step) => step + 1);
		}
	}

	prevStep(): void {
		if (this.currentStep() > 1) {
			this.currentStep.update((step) => step - 1);
		}
	}

	confirmBooking(): void {
		const userId = this.#authService.user()?.id;
		const selectedZonePrice = this.selectedZonePrice();
		const selectedComputerId = this.selectedComputerId();
		const selectedDate = this.selectedDate();
		const selectedTimeSlotId = this.selectedTimeSlotId();

		if (
			!userId ||
			!selectedZonePrice ||
			!selectedComputerId ||
			!selectedDate ||
			!selectedTimeSlotId
		)
			return;

		this.isSubmitting.set(true);

		this.#reservationService
			.create({
				date: selectedDate,
				status: "pending",
				price: selectedZonePrice,
				user_id: userId,
				computer_id: selectedComputerId,
				time_slot_id: selectedTimeSlotId,
			})
			.subscribe({
				next: () => {
					this.isSubmitting.set(false);
					this.bookingSuccess.set(true);
				},
				error: (err) => {
					this.isSubmitting.set(false);
					console.error("Ha ocurrido un error al realizar la reserva:", err);
				},
			});
	}
}
