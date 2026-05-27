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
import type { CreateUserDto, UpdateUserDto, UserRole } from "../user.model";
import { UserService } from "../user.service";

@Component({
	selector: "app-user-form",
	imports: [RouterLink, SafeHtmlPipe, FormsModule, Icon],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: "./user-form.html",
})
export class UserForm {
	readonly #userService = inject(UserService);
	readonly #route = inject(ActivatedRoute);
	readonly #router = inject(Router);
	readonly #destroyRef = inject(DestroyRef);

	readonly #userId = Number(this.#route.snapshot.paramMap.get("id")) || null;

	protected readonly isEditing = computed(() => this.#userId !== null);

	protected readonly loadingIcon = LoadingIcons.spinner;

	protected readonly name = model<string>("");
	protected readonly email = model<string>("");
	protected readonly role = model<UserRole | "">("");
	protected readonly balance = model<number>(0);
	protected readonly password = model<string>("");

	protected readonly userResource = resource({
		loader: () =>
			this.#userId
				? firstValueFrom(this.#userService.getById(this.#userId))
				: Promise.resolve(null),
	});

	constructor() {
		effect(() => {
			const user = this.userResource.value();
			if (!user) return;
			this.name.set(user.name);
			this.email.set(user.email);
			this.role.set(user.role);
			this.balance.set(user.balance);
		});
	}

	protected onSubmit(): void {
		const dto: CreateUserDto | UpdateUserDto = {
			name: this.name(),
			email: this.email(),
			role: this.role() as UserRole,
			balance: this.balance(),
			password: this.password(),
		};

		const action$ = this.#userId
			? this.#userService.update(this.#userId, dto)
			: this.#userService.create(dto);

		action$.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe({
			next: () => this.#router.navigate(["/admin/users"]),
			error: (err) => console.log("No se ha podido enviar,", err),
		});
	}
}
