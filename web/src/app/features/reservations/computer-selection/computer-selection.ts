import { ChangeDetectionStrategy, Component, computed, inject, model, output } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { COMPUTER_STATUS_LABELS } from '../../../shared/data-access/computer/computer.constants';
import type {
  ComputerExtended,
  ComputerStatus,
} from '../../../shared/data-access/computer/computer.model';
import { ComputerService } from '../../../shared/data-access/computer/computer.service';
import type { ReservationResponse } from '../../../shared/data-access/reservation/reservation.model';
import type { TimeSlotExtended } from '../../../shared/data-access/timeslot/timeslot.model';
import type { ZoneExtended } from '../../../shared/data-access/zone/zone.model';
import { Checkout } from '../checkout/checkout';
import { LoadingState } from '../../../shared/ui/loading-state/loading-state';
import { ErrorState } from '../../../shared/ui/error-state/error-state';

@Component({
  selector: 'app-computer-selection',
  imports: [Checkout, LoadingState, ErrorState],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './computer-selection.html',
})
export class ComputerSelection {
  readonly #computerService = inject(ComputerService);

  readonly step = model.required<number>();
  readonly selectedZone = model.required<ZoneExtended | null>();
  readonly selectedTimeSlot = model.required<TimeSlotExtended | null>();
  readonly selectedComputer = model<ComputerExtended | null>(null);
  readonly onReservationSuccess = output<ReservationResponse>();

  readonly computersResource = rxResource({
    stream: () => this.#computerService.getAll(),
  });

  readonly filteredComputers = computed(() => {
    const zone = this.selectedZone();
    const computers = this.computersResource.value();
    const timeslot = this.selectedTimeSlot();

    return computers
      ?.filter((computer) => computer.zone_id === zone?.id)
      .map((computer) => {
        const isReserved =
          timeslot?.reservations?.some(
            (reservation) =>
              reservation.computer_id === computer.id && reservation.status === 'confirmed',
          ) ?? false;

        return { ...computer, isReserved };
      });
  });

  selectComputer(comp: ComputerExtended & { isReserved?: boolean }) {
    if (comp.status !== 'available' || comp.isReserved) return;

    this.selectedComputer.set(comp);
  }

  getComputerStatusLabel(status: ComputerStatus) {
    return COMPUTER_STATUS_LABELS[status];
  }
}
