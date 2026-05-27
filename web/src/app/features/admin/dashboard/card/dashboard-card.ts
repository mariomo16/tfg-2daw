import { ChangeDetectionStrategy, Component, input, type Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../../shared/ui/icon/icon';

export interface StatCardData {
  isLoading: Signal<boolean>;
  error: Signal<Error | undefined>;
  title: string;
  info: Signal<number | string>;
  iconColor: string;
  linkRoute: string;
  linkColor: string;
}

@Component({
  selector: 'app-dashboard-card',
  imports: [Icon, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard-card.html',
})
export class DashboardCard {
  readonly data = input.required<StatCardData>();
}
