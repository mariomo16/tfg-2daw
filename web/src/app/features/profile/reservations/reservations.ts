import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject } from '@angular/core';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RESERVATION_STATUS_LABEL } from '../../../shared/data-access/reservation/reservation.constants';
import type { ReservationStatus } from '../../../shared/data-access/reservation/reservation.model';
import { ReservationService } from '../../../shared/data-access/reservation/reservation.service';
import { Icon } from '../../../shared/ui/icon/icon';
import { ProfileService } from './../profile.service';
import { Temporal } from 'temporal-polyfill';
import { LoadingState } from '../../../shared/ui/loading-state/loading-state';
import { ErrorState } from '../../../shared/ui/error-state/error-state';
import { EmptyState } from '../../../shared/ui/empty-state/empty-state';

@Component({
  selector: 'app-user-reservations',
  imports: [DatePipe, CurrencyPipe, Icon, LoadingState, ErrorState, EmptyState],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reservations.html',
})
export class UserReservations {
  readonly #destroyRef = inject(DestroyRef);
  readonly #profileService = inject(ProfileService);
  readonly #reservationService = inject(ReservationService);

  protected readonly reservationsResource = rxResource({
    stream: () => this.#profileService.getMyReservations(),
  });

  reservations = computed(() => {
    const data = this.reservationsResource.value();
    if (!data) return [];

    return data.map((reservation) => ({
      ...reservation,
      displayStatus: this.#getDisplayStatus(
        reservation.status,
        reservation.timeslot?.start_time,
        reservation.date,
      ),
      start_time: reservation.timeslot.start_time.slice(0, 5),
    }));
  });

  #getDisplayStatus(status: string, startTime: string, date: string): boolean | string {
    if (status === 'cancelled') return RESERVATION_STATUS_LABEL[status];

    const now = Temporal.Now.plainDateTimeISO();
    const datePart = date.split('T')[0];
    const reservationDateTime = Temporal.PlainDateTime.from(`${datePart}T${startTime}`);

    if (Temporal.PlainDate.compare(reservationDateTime.toPlainDate(), now.toPlainDate())) {
      return RESERVATION_STATUS_LABEL[status as ReservationStatus];
    }

    const diff = now.until(reservationDateTime, { largestUnit: 'minutes' });

    if (diff.minutes >= 60) {
      return 'canCancel';
    }

    return RESERVATION_STATUS_LABEL[status as ReservationStatus];
  }

  protected cancelReservation(reservationId: number) {
    this.#reservationService
      .cancel(reservationId)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: () => this.reservationsResource.reload(),
        error: (error) => console.error('No se ha podido eliminar,', error),
      });
  }
}
