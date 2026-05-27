import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { ZoneExtended } from '../../../shared/data-access/zone/zone.model';
import { Icon } from '../../../shared/ui/icon/icon';

@Component({
  selector: 'app-zone-card',
  imports: [CurrencyPipe, RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './zone-card.html',
})
export class ZoneCard {
  readonly zone = input.required<ZoneExtended>();
}
