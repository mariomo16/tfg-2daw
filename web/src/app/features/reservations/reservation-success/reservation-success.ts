import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import type { ReservationResponse } from '../../../shared/data-access/reservation/reservation.model';
import type { ZoneExtended } from '../../../shared/data-access/zone/zone.model';
import { Icon } from '../../../shared/ui/icon/icon';

@Component({
  selector: 'app-reservation-success',
  imports: [CommonModule, Icon, DatePipe, CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reservation-success.html',
})
export class ReservationSuccess {
  readonly reservation = input.required<ReservationResponse>();
  readonly zone = input.required<ZoneExtended>();
  readonly close = output<void>();

  onClose() {
    this.close.emit();
  }
}
