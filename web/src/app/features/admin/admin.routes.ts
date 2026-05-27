import type { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/admin-layout').then((m) => m.AdminLayout),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard').then((m) => m.Dashboard),
        title: 'Panel de administración',
      },
      {
        path: 'zones',
        loadChildren: () => import('./zones/zones.routes').then((m) => m.ZONES_ROUTES),
      },
      {
        path: 'computers',
        loadChildren: () => import('./computers/computers.routes').then((m) => m.COMPUTERS_ROUTES),
      },
      {
        path: 'timeslots',
        loadChildren: () => import('./timeslots/timeslots.routes').then((m) => m.TIMESLOTS_ROUTES),
      },
      {
        path: 'users',
        loadChildren: () => import('./users/user.routes').then((m) => m.USER_ROUTES),
      },
      {
        path: 'reservations',
        loadComponent: () =>
          import('./reservations/reservation-list/reservation-list').then((m) => m.ReservationList),
        title: 'Reservas',
      },
      {
        path: 'payments',
        loadComponent: () =>
          import('./payments/payment-list/payment-list').then((m) => m.PaymentList),
        title: 'Pagos',
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./notifications/notifications.routes').then((m) => m.NOTIFICATIONS_ROUTES),
      },
    ],
  },
];
