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
import { UserService } from "../user.service";

@Component({
	selector: "app-user-list",
	imports: [RouterLink, SafeHtmlPipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: "./user-list.html",
})
export class UserList {
	readonly #userService = inject(UserService);
	readonly #destroyRef = inject(DestroyRef);
	protected readonly loadingIcon = LoadingIcons.spinner;

	protected readonly usersResource = resource({
		loader: () => firstValueFrom(this.#userService.getAll()),
	});

	protected readonly columns = [
		{ key: "id", label: "ID" },
		{ key: "name", label: "NOMBRE" },
		{ key: "email", label: "EMAIL" },
		{ key: "reservations", label: "RESERVAS" },
		{ key: "createdAt", label: "REGISTRO" },
	] as const;

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
