import {
	ChangeDetectionStrategy,
	Component,
	computed,
	DestroyRef,
	effect,
	inject,
	model,
	resource,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { firstValueFrom } from "rxjs";
import { Icon } from "../../../../shared/components/icon/icon";
import { LoadingIcons } from "../../../../shared/icons/icons";
import { SafeHtmlPipe } from "../../../../shared/pipes/safe-html.pipe";
import type {
	CreateTimeSlotDto,
	UpdateTimeSlotDto,
} from "../../../time-slots/timeslot.model";
import { TimeSlotService } from "../../../time-slots/timeslot.service";

@Component({
	selector: "app-timeslot-form",
	imports: [RouterLink, SafeHtmlPipe, FormsModule, Icon],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: "./timeslot-form.html",
})
export class TimeslotForm {
	readonly #timeslotService = inject(TimeSlotService);
	readonly #route = inject(ActivatedRoute);
	readonly #router = inject(Router);
	readonly #destroyRef = inject(DestroyRef);

	readonly #timeslotId =
		Number(this.#route.snapshot.paramMap.get("id")) || null;

	protected readonly isEditing = computed(() => this.#timeslotId !== null);

	protected readonly loadingIcon = LoadingIcons.spinner;

	protected readonly startTime = model<string>("");
	protected readonly endTime = model<string>("");

	protected readonly timeslotResource = resource({
		loader: () =>
			this.#timeslotId
				? firstValueFrom(this.#timeslotService.getById(this.#timeslotId))
				: Promise.resolve(null),
	});

	constructor() {
		effect(() => {
			const timeslot = this.timeslotResource.value();
			if (!timeslot) return;
			this.startTime.set(timeslot.startTime);
			this.endTime.set(timeslot.endTime);
		});
	}

	protected onSubmit(): void {
		if (!this.startTime() || !this.endTime()) return;

		const dto: CreateTimeSlotDto | UpdateTimeSlotDto = {
			start_time: this.startTime(),
			end_time: this.endTime(),
		};

		const action$ = this.#timeslotId
			? this.#timeslotService.update(this.#timeslotId, dto)
			: this.#timeslotService.create(dto);

		action$.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe({
			next: () => this.#router.navigate(["/admin/timeslots"]),
			error: (err) => console.error("No se ha podido enviar,", err),
		});
	}
}
