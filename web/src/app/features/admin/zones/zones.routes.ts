import type { Routes } from '@angular/router';

export const ZONES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./zone-list/zone-list').then((m) => m.ZoneList),
    title: 'Zonas',
  },
  {
    path: 'new',
    loadComponent: () => import('./zone-form/zone-form').then((m) => m.ZoneForm),
    title: 'Nueva zona',
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./zone-form/zone-form').then((m) => m.ZoneForm),
    title: 'Editar zona',
  },
];
