import type { Routes } from '@angular/router';

export const USER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./user-list/user-list').then((m) => m.UserList),
    title: 'Usuarios',
  },
  {
    path: 'new',
    loadComponent: () => import('./user-form/user-form').then((m) => m.UserForm),
    title: 'Nuevo usuario',
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./user-form/user-form').then((m) => m.UserForm),
    title: 'Editar usuario',
  },
];
