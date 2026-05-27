import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import {
  COMPUTER_STATUS_ACCENTS,
  COMPUTER_STATUS_LABELS,
} from '../../../shared/data-access/computer/computer.constants';
import type { ComputerStatus } from '../../../shared/data-access/computer/computer.model';
import { ZoneService } from '../../../shared/data-access/zone/zone.service';
import { Icon } from '../../../shared/ui/icon/icon';
import { Footer } from '../../../shared/ui/layout/footer/footer';
import { Navbar } from '../../../shared/ui/layout/navbar/navbar';
import { LoadingState } from '../../../shared/ui/loading-state/loading-state';
import { ErrorState } from '../../../shared/ui/error-state/error-state';
import { EmptyState } from '../../../shared/ui/empty-state/empty-state';

@Component({
  selector: 'app-zone-computers',
  imports: [CommonModule, Navbar, Footer, Icon, LoadingState, ErrorState, EmptyState],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './zone-computers.html',
})
export class ZoneComputers {
  readonly #zoneService = inject(ZoneService);
  readonly #route = inject(ActivatedRoute);

  readonly id = toSignal(this.#route.params.pipe(map((params) => params['id'])));

  readonly zoneResource = rxResource({
    stream: () => this.#zoneService.getById(Number(this.id())),
  });

  readonly mappedComputers = computed(() => this.zoneResource.value()?.computers ?? []);

  computerStatus(status: ComputerStatus) {
    return status === 'maintenance'
      ? COMPUTER_STATUS_LABELS.maintenance
      : COMPUTER_STATUS_LABELS.available;
  }

  computerStatusAccent(status: ComputerStatus) {
    switch (status) {
      case 'maintenance':
        return COMPUTER_STATUS_ACCENTS.maintenance;
      default:
        return COMPUTER_STATUS_ACCENTS.available;
    }
  }
}
