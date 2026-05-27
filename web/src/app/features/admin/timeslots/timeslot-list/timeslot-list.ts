import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	inject,
	resource,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { RouterLink } from "@angular/router";
import { firstValueFrom } from "rxjs";
import { LoadingIcons } from "../../../../shared/icons/icons";
import { SafeHtmlPipe } from "../../../../shared/pipes/safe-html.pipe";
import { TimeSlotService } from "../../../time-slots/timeslot.service";

@Component({
	selector: "app-timeslot-list",
	imports: [RouterLink, SafeHtmlPipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: "./timeslot-list.html",
})
export class TimeslotList {
	readonly #timeslotService = inject(TimeSlotService);
	readonly #destroyRef = inject(DestroyRef);

	protected readonly loadingIcon = LoadingIcons.spinner;

	protected readonly timeslotsResource = resource({
		loader: () => firstValueFrom(this.#timeslotService.getAll()),
	});

	protected readonly columns = [
		{ key: "id", label: "ID" },
		{ key: "startTime", label: "HORA INICIO" },
		{ key: "endTime", label: "HORA FIN" },
		{ key: "duration", label: "DURACIÓN" },
	] as const;

	protected onDelete(id: number): void {
		this.#timeslotService
			.delete(id)
			.pipe(takeUntilDestroyed(this.#destroyRef))
			.subscribe({
				next: () => this.timeslotsResource.reload(),
				error: (error) => console.error("No se ha podido eliminar,", error),
			});
	}
}
