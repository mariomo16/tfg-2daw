import { CurrencyPipe, DatePipe } from "@angular/common";
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	effect,
	inject,
	signal,
} from "@angular/core";
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { AuthService } from "@core/auth/auth.service";
import { mapToUser } from "@shared/mappers/user.mapper";
import { ReservationService } from "@shared/services/reservation.service";
import { Footer } from "@shared/ui/layout/footer/footer";
import { Navbar } from "@shared/ui/layout/navbar/navbar";
import { EmptyState } from "@shared/ui/states/empty-state/empty-state";
import { LoadingState } from "@shared/ui/states/loading-state/loading-state";

type navigationTab = "reservations" | "payments" | "edit";

@Component({
	selector: "app-profile",
	imports: [
		Navbar,
		Footer,
		ReactiveFormsModule,
		CurrencyPipe,
		DatePipe,
		LoadingState,
		EmptyState,
	],
	templateUrl: "./profile.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Profile {
	readonly #authService = inject(AuthService);
	readonly #reservationService = inject(ReservationService);

	protected readonly activeTab = signal<navigationTab>("reservations");

	protected readonly currentUser = computed(() => {
		const userRes = this.#authService.user();
		return userRes ? mapToUser(userRes) : null;
	});

	protected readonly isLoading = this.#authService.isLoading;

	protected readonly profileForm = new FormGroup({
		name: new FormControl("", {
			nonNullable: true,
			validators: [Validators.required, Validators.maxLength(40)],
		}),
		email: new FormControl("", {
			nonNullable: true,
			validators: [Validators.required, Validators.email],
		}),
	});

	protected readonly selectedFile = signal<File | null>(null);
	protected readonly avatarPreview = signal<string | null>(null);

	protected readonly isSubmitting = signal(false);
	protected readonly successMessage = signal<string | null>(null);
	protected readonly errorMessage = signal<string | null>(null);

	protected readonly cancellingReservationId = signal<number | null>(null);

	constructor() {
		effect(() => {
			const user = this.currentUser();
			if (user) {
				this.profileForm.patchValue({
					name: user.name,
					email: user.email,
				});
			}
		});
	}

	changeTab(tab: navigationTab): void {
		this.activeTab.set(tab);
		this.successMessage.set(null);
		this.errorMessage.set(null);
	}

	onFileSelected(event: Event): void {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files.length > 0) {
			const file = input.files[0];
			this.selectedFile.set(file);

			const reader = new FileReader();
			reader.onload = () => {
				this.avatarPreview.set(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	}

	onSubmit(): void {
		if (this.profileForm.invalid) {
			this.profileForm.markAllAsTouched();
			return;
		}

		this.isSubmitting.set(true);
		this.successMessage.set(null);
		this.errorMessage.set(null);

		const formData = new FormData();
		formData.append("name", this.profileForm.controls.name.value);
		formData.append("email", this.profileForm.controls.email.value);

		const file = this.selectedFile();
		if (file) {
			formData.append("image", file);
		}

		this.#authService.updateProfile(formData).subscribe({
			next: () => {
				this.isSubmitting.set(false);
				this.successMessage.set("¡Perfil actualizado con éxito!");
				this.selectedFile.set(null);
			},
			error: (err) => {
				this.isSubmitting.set(false);
				const errorMsg =
					err.error?.message || "Ha ocurrido un error al actualizar el perfil.";
				this.errorMessage.set(errorMsg);
			},
		});
	}

	cancelReservation(id: number): void {
		this.cancellingReservationId.set(id);
		this.#reservationService.cancel(id).subscribe({
			next: () => {
				this.cancellingReservationId.set(null);
				this.#authService.checkAuth().subscribe();
			},
			error: (err) => {
				this.cancellingReservationId.set(null);
				console.error("Error al cancelar la reserva:", err);
			},
		});
	}

	protected readonly navigationButtons = [
		{
			name: "reservations" as navigationTab,
			label: "Mis reservas",
		},
		{
			name: "payments" as navigationTab,
			label: "Mis transacciones",
		},
		{
			name: "edit" as navigationTab,
			label: "Editar perfil",
		},
	];
}
