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
import type { CreateTimeSlotDto } from "@shared/models/timeslot.model";
import { TimeSlotService } from "@shared/services/timeslot.service";
import { LoadingState } from "@shared/ui/states/loading-state/loading-state";
import { of } from "rxjs";

@Component({
	selector: "app-timeslot-form",
	imports: [RouterLink, ReactiveFormsModule, LoadingState],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: "./timeslot-form.html",
})
export class TimeslotForm {
	readonly #destroyRef = inject(DestroyRef);
	readonly #route = inject(ActivatedRoute);
	readonly #router = inject(Router);
	readonly #formBuilder = inject(NonNullableFormBuilder);
	readonly #timeslotService = inject(TimeSlotService);

	readonly #timeslotId =
		Number(this.#route.snapshot.paramMap.get("id")) || null;

	protected readonly isEditing = this.#timeslotId !== null;

	protected readonly form = this.#formBuilder.group({
		startTime: ["", [Validators.required]],
		endTime: ["", [Validators.required]],
	});

	protected readonly timeslotResource = rxResource({
		stream: () =>
			this.#timeslotId
				? this.#timeslotService.getById(this.#timeslotId)
				: of(null),
	});

	protected readonly isLoadingData = computed(
		() => this.isEditing && this.timeslotResource.isLoading(),
	);

	constructor() {
		effect(() => {
			const timeslot = this.timeslotResource.value();
			if (!timeslot) return;

			this.form.patchValue({
				startTime: timeslot.start,
				endTime: timeslot.end,
			});
		});
	}

	protected onSubmit(): void {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}

		const { startTime, endTime } = this.form.getRawValue();

		const dto: CreateTimeSlotDto = {
			start: startTime,
			end: endTime,
		};

		const action$ = this.#timeslotId
			? this.#timeslotService.update(this.#timeslotId, dto)
			: this.#timeslotService.create(dto);

		action$.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe({
			next: () => this.#router.navigate(["/admin/timeslots"]),
			error: (err) => console.error("Error al guardar la franja horaria:", err),
		});
	}
}
