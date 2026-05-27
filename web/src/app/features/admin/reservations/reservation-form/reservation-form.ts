import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
} from '@angular/core';
import { ReservationService } from '../../../../shared/data-access/reservation/reservation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { CreateReservationDto } from '../../../../shared/data-access/reservation/reservation.model';
import { of } from 'rxjs';

@Component({
  selector: 'app-reservation-form',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reservation-form.html',
})
export class ReservationForm {
  readonly #destroyRef = inject(DestroyRef);
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #formBuilder = inject(NonNullableFormBuilder);
  readonly #reservationService = inject(ReservationService);

  readonly #reservationId = Number(this.#route.snapshot.paramMap.get('id')) || null;

  protected readonly isEditing = this.#reservationId !== null;

  protected readonly reservationResource = rxResource({
    stream: () =>
      this.#reservationId ? this.#reservationService.getById(this.#reservationId) : of(null),
  });

  protected readonly isLoadingData = computed(
    () => this.isEditing && this.reservationResource.isLoading(),
  );

  protected readonly form = this.#formBuilder.group({
    user_id: [0, [Validators.required]],
    computer_id: [0, [Validators.required]],
    time_slot_id: [0, [Validators.required]],
    total_price: [0, [Validators.required]],
    date: [''],
  });

  constructor() {
    effect(() => {
      const reservation = this.reservationResource.value();
      if (!reservation) return;

      this.form.patchValue({
        computer_id: reservation.computer_id,
        time_slot_id: reservation.time_slot_id,
        total_price: reservation.total_price,
        date: reservation.date,
      });
    });
  }

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { user_id, computer_id, time_slot_id, total_price, date } = this.form.getRawValue();

    const dto: CreateReservationDto = {
      user_id,
      computer_id,
      time_slot_id,
      total_price,
      date,
    };

    const action$ = this.#reservationId
      ? this.#reservationService.update(this.#reservationId, dto)
      : this.#reservationService.create(dto);

    action$.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe({
      next: () => this.#router.navigate(['/admin/reservations']),
      error: (err) => console.error('Error al guardar la reserva:', err),
    });
  }
}
