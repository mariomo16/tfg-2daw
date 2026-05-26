import { DatePipe } from "@angular/common";
import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	inject,
} from "@angular/core";
import { rxResource, takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { RouterLink } from "@angular/router";
import { UserService } from "@shared/services/user.service";
import { DataTable } from "@shared/ui/data-table/data-table";
import { ErrorState } from "@shared/ui/states/error-state/error-state";
import { LoadingState } from "@shared/ui/states/loading-state/loading-state";

@Component({
	selector: "app-user-list",
	imports: [RouterLink, DataTable, DatePipe, LoadingState, ErrorState],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: "./user-list.html",
})
export class UserList {
	readonly #userService = inject(UserService);
	readonly #destroyRef = inject(DestroyRef);

	protected readonly usersResource = rxResource({
		stream: () => this.#userService.getAll(),
	});

	protected readonly columns: string[] = [
		"ID",
		"NOMBRE",
		"EMAIL",
		"RESERVAS",
		"REGISTRO",
		"ROL",
	];

	protected readonly actions = true;

	protected onDelete(id: number): void {
		this.#userService
			.delete(id)
			.pipe(takeUntilDestroyed(this.#destroyRef))
			.subscribe({
				next: () => this.usersResource.reload(),
				error: (error) => console.error("No se ha podido eliminar,", error),
			});
	}
}
