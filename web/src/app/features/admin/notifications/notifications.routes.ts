import type { Routes } from '@angular/router';

export const NOTIFICATIONS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./notification-list/notification-list').then((m) => m.NotificationList),
    title: 'Notificaciones',
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./notification-form/notification-form').then((m) => m.NotificationForm),
    title: 'Nueva notificación',
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./notification-detail/notification-detail').then((m) => m.NotificationDetail),
    title: 'Detalles de notificación',
  },
];
