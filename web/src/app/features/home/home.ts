import { AuthService } from '../auth/auth.service';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ErrorState } from '../../shared/ui/error-state/error-state';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/ui/icon/icon';
import { Footer } from '../../shared/ui/layout/footer/footer';
import { Navbar } from '../../shared/ui/layout/navbar/navbar';
import { LoadingState } from '../../shared/ui/loading-state/loading-state';
import { ZoneCard } from '../zones/zone-card/zone-card';
import { ZoneService } from '../../shared/data-access/zone/zone.service';

@Component({
  selector: 'app-home',
  imports: [Navbar, ZoneCard, Footer, RouterLink, Icon, LoadingState, ErrorState],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  readonly #zoneService = inject(ZoneService);
  readonly #authService = inject(AuthService);

  protected readonly isAuthenticated = this.#authService.isAuthenticated;

  protected readonly zonesResource = rxResource({
    stream: () => this.#zoneService.getAll(),
  });
}
