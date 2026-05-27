import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ReservationService } from '../../../../shared/data-access/reservation/reservation.service';
import { DataTable } from '../../../../shared/ui/data-table/data-table';
import { ErrorState } from '../../../../shared/ui/error-state/error-state';
import { LoadingState } from '../../../../shared/ui/loading-state/loading-state';

@Component({
  selector: 'app-reservation-list',
  imports: [DatePipe, CurrencyPipe, DataTable, LoadingState, ErrorState],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reservation-list.html',
})
export class ReservationList {
  readonly #reservationService = inject(ReservationService);

  protected readonly reservationsResource = rxResource({
    stream: () => this.#reservationService.getAll(),
  });

  protected readonly columns: string[] = [
    'ID',
    'USUARIO',
    'EQUIPO',
    'FECHA',
    'HORARIO',
    'ESTADO',
    'PRECIO',
  ];

  protected readonly actions = false;
}
