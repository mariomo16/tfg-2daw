import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	inject,
} from "@angular/core";
import { rxResource, takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { RouterLink } from "@angular/router";
import { ZoneService } from "@shared/services/zone.service";
import { DataTable } from "@shared/ui/data-table/data-table";
import { ErrorState } from "@shared/ui/states/error-state/error-state";
import { LoadingState } from "@shared/ui/states/loading-state/loading-state";

@Component({
	selector: "app-zone-list",
	imports: [RouterLink, DataTable, LoadingState, ErrorState],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: "./zone-list.html",
})
export class ZoneList {
	readonly #zoneService = inject(ZoneService);
	readonly #destroyRef = inject(DestroyRef);

	protected readonly zonesResource = rxResource({
		stream: () => this.#zoneService.getAll(),
	});

	protected readonly columns: string[] = [
		"ID",
		"NOMBRE",
		"CREDITOS",
		"ORDENADORES",
	];

	protected readonly actions = true;

	protected onDelete(id: number): void {
		this.#zoneService
			.delete(id)
			.pipe(takeUntilDestroyed(this.#destroyRef))
			.subscribe({
				next: () => this.zonesResource.reload(),
				error: (error) => console.error("No se ha podido eliminar,", error),
			});
	}
}
