import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { STORAGE_URL } from '../../core/tokens/api-url.token';
import { Footer } from '../../shared/ui/layout/footer/footer';
import { Navbar } from '../../shared/ui/layout/navbar/navbar';
import { AuthService } from '../auth/auth.service';
import { EditProfile } from './edit-profile/edit-profile';
import { UserPayments } from './payments/payments';
import { UserReservations } from './reservations/reservations';

@Component({
  selector: 'app-profile',
  imports: [CurrencyPipe, UserReservations, UserPayments, Navbar, Footer, EditProfile],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './profile.html',
})
export class Profile {
  readonly #authService = inject(AuthService);
  protected readonly storageUrl = inject(STORAGE_URL);

  protected readonly currentUser = this.#authService.user;
  protected readonly currentUserRole = this.#authService.userRole;
  protected readonly isEditing = signal(false);

  protected toggleEditing(): void {
    this.isEditing.update((value) => !value);
  }

  protected onProfileSaved(): void {
    this.#authService.checkAuth().subscribe(() => {
      this.isEditing.set(false);
    });
  }
}
