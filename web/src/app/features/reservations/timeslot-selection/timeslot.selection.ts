import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { Temporal } from 'temporal-polyfill';
import type { TimeSlotExtended } from '../../../shared/data-access/timeslot/timeslot.model';
import { TimeSlotService } from '../../../shared/data-access/timeslot/timeslot.service';
import type { ZoneExtended } from '../../../shared/data-access/zone/zone.model';
import { LoadingState } from '../../../shared/ui/loading-state/loading-state';
import { ErrorState } from '../../../shared/ui/error-state/error-state';

@Component({
  selector: 'app-timeslot-selection',
  imports: [RouterModule, LoadingState, ErrorState],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './timeslot-selection.html',
})
export class TimeSlotSelection {
  readonly #timeslotService = inject(TimeSlotService);

  readonly step = model.required<number>();
  readonly selectedZone = model.required<ZoneExtended | null>();
  readonly selectedTimeSlot = model<TimeSlotExtended | null>(null);

  readonly timeslotsResource = rxResource({
    stream: () => this.#timeslotService.getAll(),
  });

  selectTimeSlot(ts: TimeSlotExtended) {
    if (this.isPast(ts.start_time)) return;
    this.selectedTimeSlot.set(ts);
    this.step.set(3);
  }

  isFull(ts: TimeSlotExtended): boolean {
    const zone = this.selectedZone();
    if (!zone) return false;

    const zoneReservationsCount = ts.reservations.filter(
      (res) =>
        res.status !== 'cancelled' && zone.computers?.some((comp) => comp.id === res.computer_id),
    ).length;

    return zoneReservationsCount >= zone.availableComputers;
  }

  isPast(startTime: string): boolean {
    const now = Temporal.Now.plainTimeISO();
    const timeslot = Temporal.PlainTime.from(startTime);
    return Temporal.PlainTime.compare(timeslot, now) < 0;
  }
}
