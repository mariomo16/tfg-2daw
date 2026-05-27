import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  model,
  output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import type { ComputerExtended } from '../../../shared/data-access/computer/computer.model';
import type {
  CreateReservationDto,
  ReservationResponse,
} from '../../../shared/data-access/reservation/reservation.model';
import { ReservationService } from '../../../shared/data-access/reservation/reservation.service';
import type { TimeSlotExtended } from '../../../shared/data-access/timeslot/timeslot.model';
import type { ZoneExtended } from '../../../shared/data-access/zone/zone.model';
import { Icon } from '../../../shared/ui/icon/icon';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-checkout',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './checkout.html',
})
export class Checkout {
  readonly #router = inject(Router);
  readonly #destroyRef = inject(DestroyRef);

  readonly #authService = inject(AuthService);
  readonly #reservationService = inject(ReservationService);

  readonly step = model.required<number>();

  readonly selectedZone = model.required<ZoneExtended | null>();
  readonly selectedTimeSlot = model.required<TimeSlotExtended | null>();
  readonly selectedComputer = model.required<ComputerExtended | null>();

  readonly totalPrice = computed(() => this.selectedZone()?.price_per_slot ?? 0);
  readonly onSuccess = output<ReservationResponse>();

  confirmReservation() {
    const user = this.#authService.user();
    const zone = this.selectedZone();
    const timeslot = this.selectedTimeSlot();
    const computer = this.selectedComputer();

    if (!user || !zone || !timeslot || !computer) return;

    const dto: CreateReservationDto = {
      user_id: user.id,
      computer_id: computer.id,
      time_slot_id: timeslot.id,
      total_price: this.totalPrice(),
      date: new Date().toISOString(),
    };

    const action$ = this.#reservationService.create(dto);

    action$.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe({
      next: (reservation) => {
        this.onSuccess.emit(reservation);
        this.#resetForm();
        this.#router.navigate(['/new-reservation']);
      },
      error: (err) => console.error('No se ha podido crear la reserva:', err),
    });
  }

  #resetForm(): void {
    this.step.set(1);
    this.selectedZone.set(null);
    this.selectedTimeSlot.set(null);
    this.selectedComputer.set(null);
  }
}
