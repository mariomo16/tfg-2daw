import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { type CanActivateFn, Router } from '@angular/router';
import { filter, map, take } from 'rxjs';
import { AuthService } from '../../features/auth/auth.service';

export const guestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const checkAuth = () => {
    return auth.isAuthenticated() ? router.createUrlTree(['/']) : true;
  };

  if (!auth.isLoading()) {
    return checkAuth();
  }

  return toObservable(auth.isLoading).pipe(
    filter((isLoading) => !isLoading),
    take(1),
    map(() => checkAuth()),
  );
};
