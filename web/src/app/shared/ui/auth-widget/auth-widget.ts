import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { STORAGE_URL } from '../../../core/tokens/api-url.token';
import { AuthService } from '../../../features/auth/auth.service';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-auth-widget',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icon],
  templateUrl: './auth-widget.html',
})
export class AuthWidget {
  readonly #authService = inject(AuthService);
  readonly #router = inject(Router);
  protected readonly storageUrl = inject(STORAGE_URL);

  protected readonly currentUser = this.#authService.user;
  protected readonly currentUserRole = this.#authService.userRole;

  protected onLogout(): void {
    this.#authService
      .logout()
      .pipe()
      .subscribe({
        next: () => this.#router.navigate(['/']),
        error: (err) => console.error(err),
      });
  }
}
