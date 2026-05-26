import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	inject,
} from "@angular/core";
import { rxResource, takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { RouterLink } from "@angular/router";
import { COMPUTER_STATUS_LABELS } from "@shared/constants/computer.constants";
import type { ComputerStatus } from "@shared/models/computer.model";
import { ComputerService } from "@shared/services/computer.service";
import { DataTable } from "@shared/ui/data-table/data-table";
import { ErrorState } from "@shared/ui/states/error-state/error-state";
import { LoadingState } from "@shared/ui/states/loading-state/loading-state";

@Component({
	selector: "app-computer-list",
	imports: [RouterLink, DataTable, LoadingState, ErrorState],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: "./computer-list.html",
})
export class ComputerList {
	readonly #computerService = inject(ComputerService);
	readonly #destroyRef = inject(DestroyRef);

	protected readonly computersResource = rxResource({
		stream: () => this.#computerService.getAll(),
	});

	protected readonly columns: string[] = ["ID", "NOMBRE", "ZONA", "ESTADO"];

	protected readonly actions = true;

	getComputerStatus(status: ComputerStatus) {
		return COMPUTER_STATUS_LABELS[status];
	}

	protected onDelete(id: number): void {
		this.#computerService
			.delete(id)
			.pipe(takeUntilDestroyed(this.#destroyRef))
			.subscribe({
				next: () => this.computersResource.reload(),
				error: (error) => console.error("No se ha podido eliminar,", error),
			});
	}
}
