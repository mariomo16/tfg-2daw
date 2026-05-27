import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
} from '@angular/core';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { of } from 'rxjs';
import type {
  CreateTimeSlotDto,
  UpdateTimeSlotDto,
} from '../../../../shared/data-access/timeslot/timeslot.model';
import { TimeSlotService } from '../../../../shared/data-access/timeslot/timeslot.service';

@Component({
  selector: 'app-timeslot-form',
  imports: [RouterLink, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './timeslot-form.html',
})
export class TimeslotForm {
  readonly #destroyRef = inject(DestroyRef);
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #formBuilder = inject(NonNullableFormBuilder);
  readonly #timeslotService = inject(TimeSlotService);

  readonly #timeslotId = Number(this.#route.snapshot.paramMap.get('id')) || null;

  protected readonly isEditing = this.#timeslotId !== null;

  protected readonly form = this.#formBuilder.group({
    startTime: ['', [Validators.required]],
    endTime: ['', [Validators.required]],
  });

  protected readonly timeslotResource = rxResource({
    stream: () => (this.#timeslotId ? this.#timeslotService.getById(this.#timeslotId) : of(null)),
  });

  protected readonly isLoadingData = computed(
    () => this.isEditing && this.timeslotResource.isLoading(),
  );

  constructor() {
    effect(() => {
      const timeslot = this.timeslotResource.value();
      if (!timeslot) return;

      this.form.patchValue({
        startTime: timeslot.start_time,
        endTime: timeslot.end_time,
      });
    });
  }

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { startTime, endTime } = this.form.getRawValue();

    const dto: CreateTimeSlotDto | UpdateTimeSlotDto = {
      start_time: startTime,
      end_time: endTime,
    };

    const action$ = this.#timeslotId
      ? this.#timeslotService.update(this.#timeslotId, dto)
      : this.#timeslotService.create(dto);

    action$.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe({
      next: () => this.#router.navigate(['/admin/timeslots']),
      error: (err) => console.error('Error al guardar la franja horaria:', err),
    });
  }
}
