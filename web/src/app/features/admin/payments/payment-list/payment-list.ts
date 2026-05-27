import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaymentService } from '../../../../shared/data-access/payment/payment.service';
import { DataTable } from '../../../../shared/ui/data-table/data-table';
import { ErrorState } from '../../../../shared/ui/error-state/error-state';
import { LoadingState } from '../../../../shared/ui/loading-state/loading-state';

@Component({
  selector: 'app-payment-list',
  imports: [DatePipe, CurrencyPipe, DataTable, LoadingState, ErrorState],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './payment-list.html',
})
export class PaymentList {
  readonly #paymentService = inject(PaymentService);

  protected readonly paymentsResource = rxResource({
    stream: () => this.#paymentService.getAll(),
  });

  protected readonly columns: string[] = ['ID', 'USUARIO', 'RESERVA', 'IMPORTE', 'TIPO', 'FECHA'];

  protected readonly actions = false;
}
