import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	inject,
} from "@angular/core";
import { rxResource, takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { RouterLink } from "@angular/router";
import { TimeSlotService } from "@shared/services/timeslot.service";
import { DataTable } from "@shared/ui/data-table/data-table";
import { ErrorState } from "@shared/ui/states/error-state/error-state";
import { LoadingState } from "@shared/ui/states/loading-state/loading-state";

@Component({
	selector: "app-timeslot-list",
	imports: [DataTable, RouterLink, LoadingState, ErrorState],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: "./timeslot-list.html",
})
export class TimeslotList {
	readonly #timeslotService = inject(TimeSlotService);
	readonly #destroyRef = inject(DestroyRef);

	protected readonly timeslotsResource = rxResource({
		stream: () => this.#timeslotService.getAll(),
	});

	protected readonly columns: string[] = ["ID", "HORA INICIO", "HORA FIN"];

	protected readonly actions = true;

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
