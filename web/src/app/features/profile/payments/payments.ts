import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Icon } from '../../../shared/ui/icon/icon';
import { ProfileService } from './../profile.service';
import { LoadingState } from '../../../shared/ui/loading-state/loading-state';
import { ErrorState } from '../../../shared/ui/error-state/error-state';
import { EmptyState } from '../../../shared/ui/empty-state/empty-state';

@Component({
  selector: 'app-user-payments',
  imports: [DatePipe, CurrencyPipe, Icon, LoadingState, ErrorState, EmptyState],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './payments.html',
})
export class UserPayments {
  readonly #profileService = inject(ProfileService);

  protected readonly paymentsResource = rxResource({
    stream: () => this.#profileService.getMyPayments(),
  });
}
