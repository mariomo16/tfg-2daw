import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  model,
} from '@angular/core';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { of } from 'rxjs';
import { UserService } from '../../../../shared/data-access/user/user.service';

@Component({
  selector: 'app-user-form',
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-form.html',
})
export class UserForm {
  readonly #destroyRef = inject(DestroyRef);
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #formBuilder = inject(NonNullableFormBuilder);
  readonly #userService = inject(UserService);

  readonly #userId = Number(this.#route.snapshot.paramMap.get('id')) || null;

  protected readonly isEditing = this.#userId !== null;

  protected readonly userResource = rxResource({
    stream: () => (this.#userId ? this.#userService.getById(this.#userId) : of(null)),
  });

  protected readonly isLoadingData = computed(
    () => this.isEditing && this.userResource.isLoading(),
  );

  protected readonly form = this.#formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
    email: ['', [Validators.required, Validators.email]],
    role: ['client', [Validators.required]],
    balance: ['', [Validators.required, Validators.min(0)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  protected readonly image = model<File>();

  constructor() {
    effect(() => {
      const user = this.userResource.value();
      if (!user) return;

      this.form.patchValue({
        name: user.name,
        email: user.email,
        role: user.role,
        balance: String(user.balance),
      });
    });
  }

  protected onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.image.set(input.files?.[0]);
  }

  protected onSubmit(): void {
    const formData = new FormData();
    const image = this.image();

    const { name, email, role, balance, password } = this.form.getRawValue();

    formData.append('name', name);
    formData.append('email', email);
    formData.append('role', role);
    formData.append('balance', balance);
    formData.append('password', password);
    if (image) formData.append('image', image);

    const action$ = this.#userId
      ? this.#userService.update(this.#userId, formData)
      : this.#userService.create(formData);

    action$.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe({
      next: () => this.#router.navigate(['/admin/users']),
      error: (err) => console.error('Error al guardar el usuario:', err),
    });
  }
}
