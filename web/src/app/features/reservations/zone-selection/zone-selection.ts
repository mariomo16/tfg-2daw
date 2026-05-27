import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import type { ZoneExtended } from '../../../shared/data-access/zone/zone.model';
import { ZoneService } from '../../../shared/data-access/zone/zone.service';
import { Icon } from '../../../shared/ui/icon/icon';
import { LoadingState } from '../../../shared/ui/loading-state/loading-state';
import { ErrorState } from '../../../shared/ui/error-state/error-state';
@Component({
  selector: 'app-zone-selection',
  imports: [RouterModule, Icon, LoadingState, ErrorState],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './zone-selection.html',
})
export class ZoneSelection {
  readonly #zoneService = inject(ZoneService);

  readonly step = model.required<number>();
  readonly selectedZone = model<ZoneExtended | null>(null);

  readonly zoneResource = rxResource({
    stream: () => this.#zoneService.getAll(),
  });

  protected readonly zoneExtra = [
    {
      description: 'Equipos de alto rendimiento para gaming competitivo',
      imageFallback: 'linear-gradient(135deg, #2e1065 0%, #8b5cf6 100%)',
    },
    {
      description: 'Sala preparada para torneos y competiciones',
      imageFallback: 'linear-gradient(135deg, #7f1d1d 0%, #ef4444 100%)',
    },
    {
      description: 'Sala y equipos enfocados a streams',
      imageFallback: 'linear-gradient(135deg, #713f12 0%, #eab308 100%)',
    },
  ] as const;

  selectZone(zone: ZoneExtended) {
    this.selectedZone.set(zone);
    this.step.set(2);
  }
}
