import {
	ChangeDetectionStrategy,
	Component,
	computed,
	DestroyRef,
	effect,
	inject,
} from "@angular/core";
import { rxResource, takeUntilDestroyed } from "@angular/core/rxjs-interop";
import {
	NonNullableFormBuilder,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import type { CreateZoneDto, UpdateZoneDto } from "@shared/models/zone.model";
import { ZoneService } from "@shared/services/zone.service";
import { LoadingState } from "@shared/ui/states/loading-state/loading-state";
import { of } from "rxjs";

@Component({
	selector: "app-zone-form",
	imports: [RouterLink, ReactiveFormsModule, LoadingState],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: "./zone-form.html",
})
export class ZoneForm {
	readonly #destroyRef = inject(DestroyRef);
	readonly #route = inject(ActivatedRoute);
	readonly #router = inject(Router);
	readonly #formBuilder = inject(NonNullableFormBuilder);
	readonly #zoneService = inject(ZoneService);

	readonly #zoneId = Number(this.#route.snapshot.paramMap.get("id")) || null;

	protected readonly isEditing = this.#zoneId !== null;

	protected readonly isLoadingData = computed(
		() => this.isEditing && this.zoneResource.isLoading(),
	);

	protected readonly form = this.#formBuilder.group({
		name: ["", [Validators.required]],
		pricePerSlot: ["", [Validators.required, Validators.min(0)]],
	});

	protected readonly zoneResource = rxResource({
		stream: () =>
			this.#zoneId ? this.#zoneService.getById(this.#zoneId) : of(null),
	});

	constructor() {
		effect(() => {
			const zone = this.zoneResource.value();
			if (!zone) return;

			this.form.patchValue({
				name: zone.name,
				pricePerSlot: String(zone.price),
			});
		});
	}

	protected onSubmit(): void {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}

		const { name, pricePerSlot } = this.form.getRawValue();

		const dto: CreateZoneDto = {
			name: name,
			price: Number(pricePerSlot),
			description: "Hola",
			cover_image: "",
		};

		const action$ = this.#zoneId
			? this.#zoneService.update(this.#zoneId, dto)
			: this.#zoneService.create(dto);

		action$.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe({
			next: () => this.#router.navigate(["/admin/zones"]),
			error: (err) => console.error("Error al guardar la zona:", err),
		});
	}
}
