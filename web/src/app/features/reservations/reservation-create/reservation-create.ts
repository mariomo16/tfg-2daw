import { ChangeDetectionStrategy, Component, model, signal } from '@angular/core';
import type { ComputerExtended } from '../../../shared/data-access/computer/computer.model';
import type { ReservationResponse } from '../../../shared/data-access/reservation/reservation.model';
import type { TimeSlotExtended } from '../../../shared/data-access/timeslot/timeslot.model';
import type { ZoneExtended } from '../../../shared/data-access/zone/zone.model';
import { Icon } from '../../../shared/ui/icon/icon';
import { Footer } from '../../../shared/ui/layout/footer/footer';
import { Navbar } from '../../../shared/ui/layout/navbar/navbar';
import { ComputerSelection } from '../computer-selection/computer-selection';
import { ReservationSuccess } from '../reservation-success/reservation-success';
import { TimeSlotSelection } from '../timeslot-selection/timeslot.selection';
import { ZoneSelection } from '../zone-selection/zone-selection';

@Component({
  selector: 'app-reservation-create',
  imports: [
    Navbar,
    Footer,
    Icon,
    ComputerSelection,
    TimeSlotSelection,
    ZoneSelection,
    ReservationSuccess,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reservation-create.html',
})
export class ReservationCreate {
  readonly step = model<number>(1);

  readonly selectedZone = model<ZoneExtended | null>(null);
  readonly selectedTimeSlot = model<TimeSlotExtended | null>(null);
  readonly selectedComputer = model<ComputerExtended | null>(null);

  readonly successfulReservation = signal<ReservationResponse | null>(null);
  readonly successfulZone = signal<ZoneExtended | null>(null);

  onReservationSuccess(reservation: ReservationResponse): void {
    this.successfulZone.set(this.selectedZone());
    this.successfulReservation.set(reservation);
  }

  onModalClose(): void {
    this.successfulReservation.set(null);
    this.successfulZone.set(null);
  }

  goBack(): void {
    switch (this.step()) {
      case 2:
        this.selectedZone.set(null);
        this.step.update((s) => s - 1);
        break;
      case 3:
        this.selectedTimeSlot.set(null);
        this.selectedComputer.set(null);
        this.step.update((s) => s - 1);
        break;
    }
  }
}
