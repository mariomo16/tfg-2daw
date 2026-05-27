import type { Routes } from '@angular/router';

export const PROFILE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./profile').then((m) => m.Profile),
    title: 'Mi Perfil',
  },
];
