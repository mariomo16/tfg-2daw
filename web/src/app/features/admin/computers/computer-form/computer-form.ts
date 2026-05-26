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
import type {
	ComputerStatus,
	CreateComputerDto,
} from "@shared/models/computer.model";
import { ComputerService } from "@shared/services/computer.service";
import { ZoneService } from "@shared/services/zone.service";
import { of } from "rxjs";

@Component({
	selector: "app-computer-form",
	imports: [RouterLink, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: "./computer-form.html",
})
export class ComputerForm {
	readonly #destroyRef = inject(DestroyRef);
	readonly #route = inject(ActivatedRoute);
	readonly #router = inject(Router);
	readonly #formBuilder = inject(NonNullableFormBuilder);
	readonly #computerService = inject(ComputerService);
	readonly #zoneService = inject(ZoneService);

	readonly #computerId =
		Number(this.#route.snapshot.paramMap.get("id")) || null;

	protected readonly isEditing = this.#computerId !== null;

	protected readonly computerResource = rxResource({
		stream: () =>
			this.#computerId
				? this.#computerService.getById(this.#computerId)
				: of(null),
	});

	protected readonly zonesResource = rxResource({
		stream: () => this.#zoneService.getAll(),
	});

	protected readonly isLoadingData = computed(
		() =>
			(this.isEditing && this.computerResource.isLoading()) ||
			(this.isEditing && this.zonesResource.isLoading()),
	);

	protected readonly form = this.#formBuilder.group({
		name: ["", [Validators.required, Validators.minLength(4)]],
		zoneId: [0, [Validators.required, Validators.min(1)]],
		status: ["available", [Validators.required]],
	});

	constructor() {
		effect(() => {
			const computer = this.computerResource.value();
			if (!computer) return;

			this.form.patchValue({
				name: computer.name,
				zoneId: computer.zone?.id,
				status: computer.status,
			});
		});
	}

	protected onSubmit(): void {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}

		const { name, zoneId, status } = this.form.getRawValue();

		const dto: CreateComputerDto = {
			name,
			zone_id: zoneId,
			status: status as ComputerStatus,
		};

		const action$ = this.#computerId
			? this.#computerService.update(this.#computerId, dto)
			: this.#computerService.create(dto);

		action$.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe({
			next: () => this.#router.navigate(["/admin/computers"]),
			error: (err) => console.error("Error al guardar el ordenador:", err),
		});
	}
}
