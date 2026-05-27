import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { APP } from '../../../core/constants/app.constants';
import { AuthWidget } from '../../../shared/ui/auth-widget/auth-widget';
import { Icon } from '../../../shared/ui/icon/icon';
import { AuthService } from '../../auth/auth.service';

interface Catalog {
  name: string;
  routerLink: string;
  icon: string;
}

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Icon, AuthWidget],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admin-layout.html',
})
export class AdminLayout {
  readonly #authService = inject(AuthService);
  readonly #router = inject(Router);

  protected readonly user = this.#authService.user;

  protected readonly app = APP;

  protected readonly styles = {
    navItem:
      'flex items-center gap-3 px-3 py-2 text-sm font-medium hover:bg-zinc-800/50 hover:text-zinc-200 rounded-xs',
    navItemActive: 'text-zinc-100 bg-zinc-800/50',
  };

  protected readonly navItems: Catalog[] = [
    {
      name: 'Dashboard',
      routerLink: '/admin/dashboard',
      icon: 'squares-2x2',
    },
    {
      name: 'Reservas',
      routerLink: '/admin/reservations',
      icon: 'calendar-days',
    },
    {
      name: 'Usuarios',
      routerLink: '/admin/users',
      icon: 'users',
    },
    {
      name: 'Pagos',
      routerLink: '/admin/payments',
      icon: 'banknotes',
    },
    {
      name: 'Zonas',
      routerLink: '/admin/zones',
      icon: 'rectangle-group',
    },
    {
      name: 'Ordenadores',
      routerLink: '/admin/computers',
      icon: 'computer-desktop',
    },
    {
      name: 'Franjas horarias',
      routerLink: '/admin/timeslots',
      icon: 'clock',
    },
    {
      name: 'Notificaciones',
      routerLink: '/admin/notifications',
      icon: 'bell',
    },
  ];

  readonly #url = toSignal(
    this.#router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
    ),
    { initialValue: this.#router.url },
  );

  protected readonly currentPathName = computed(() => {
    const currentUrl = this.#url();
    const match = this.navItems.find(
      (item) =>
        currentUrl === item.routerLink ||
        (item.routerLink !== '/' && currentUrl.startsWith(item.routerLink)),
    );

    return match?.name;
  });
}
