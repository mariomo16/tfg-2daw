import type { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  {
    path: 'pruebas',
    loadComponent: () => import('./features/lab/lab').then((module) => module.Lab),
    title: 'PRUEBAS UI',
  },
  {
    path: '',
    loadComponent: () => import('./features/home/home').then((module) => module.Home),
    title: 'Inicio',
  },
  {
    path: 'auth',
    canActivate: [guestGuard],
    loadChildren: () => import('./features/auth/auth.routes').then((module) => module.AUTH_ROUTES),
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/admin/admin.routes').then((module) => module.ADMIN_ROUTES),
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/profile/profile.routes').then((module) => module.PROFILE_ROUTES),
  },
  {
    path: 'new-reservation',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/reservations/reservation-create/reservation-create').then(
        (module) => module.ReservationCreate,
      ),
    title: 'Nueva Reserva',
  },
  {
    path: 'zones/:id',
    loadComponent: () =>
      import('./features/zones/zone-computers/zone-computers').then(
        (module) => module.ZoneComputers,
      ),
    title: 'Equipos de la Zona',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./shared/ui/not-found/not-found').then((module) => module.NotFound),
    title: 'Página no encontrada',
  },
];
