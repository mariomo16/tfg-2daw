import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { APP } from '../../../../core/constants/app.constants';
import { AuthService } from '../../../../features/auth/auth.service';
import { AuthWidget } from '../../auth-widget/auth-widget';
import { Icon } from '../../icon/icon';

@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, AuthWidget, Icon],
  templateUrl: './navbar.html',
})
export class Navbar {
  readonly #authService = inject(AuthService);

  protected readonly app = APP;
  protected readonly isAuthenticated = this.#authService.isAuthenticated;
  protected readonly user = this.#authService.user;
  protected readonly isLoading = this.#authService.isLoading;

  protected isStaff = computed(
    () => this.user()?.role === 'admin' || this.user()?.role === 'employee',
  );
}
