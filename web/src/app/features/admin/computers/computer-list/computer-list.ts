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
import { ComputerService } from "../../../computers/computer.service";

@Component({
	selector: "app-computer-list",
	imports: [RouterLink, SafeHtmlPipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: "./computer-list.html",
})
export class ComputerList {
	readonly #computerService = inject(ComputerService);
	readonly #destroyRef = inject(DestroyRef);

	protected readonly loadingIcon = LoadingIcons.spinner;

	protected readonly computersResource = resource({
		loader: () => firstValueFrom(this.#computerService.getAll()) ?? [],
	});

	protected readonly columns = [
		{ key: "id", label: "ID" },
		{ key: "name", label: "NOMBRE" },
		{ key: "zone", label: "ZONA" },
		{ key: "status", label: "ESTADO" },
		{ key: "specs", label: "SPECS" },
	] as const;

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
