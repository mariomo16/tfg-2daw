import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject } from '@angular/core';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import type { CreateNotificationDto } from '../../../../shared/data-access/notification/notification.model';
import { NotificationService } from '../../../../shared/data-access/notification/notification.service';
import { UserService } from '../../../../shared/data-access/user/user.service';

@Component({
  selector: 'app-notification-form',
  imports: [RouterLink, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './notification-form.html',
})
export class NotificationForm {
  readonly #destroyRef = inject(DestroyRef);
  readonly #router = inject(Router);
  readonly #formBuilder = inject(NonNullableFormBuilder);
  readonly #notificationService = inject(NotificationService);
  readonly #userService = inject(UserService);

  protected readonly usersResource = rxResource({
    stream: () => this.#userService.getAll(),
  });

  protected readonly isLoadingData = computed(() => this.usersResource.isLoading());

  protected form = this.#formBuilder.group({
    userId: [0, [Validators.required]],
    message: ['', [Validators.required]],
  });

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { userId, message } = this.form.getRawValue();

    const dto: CreateNotificationDto = {
      user_id: userId,
      message,
    };

    this.#notificationService
      .create(dto)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: () => this.#router.navigate(['/admin/notifications']),
        error: (err) => console.error('Error al guardar la notificacion:', err),
      });
  }
}
