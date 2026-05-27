import type { UserRole, UserRoleLabel } from './user.model';

export const USER_ROLE_LABELS: Record<UserRole, UserRoleLabel> = {
  admin: 'Administrador',
  employee: 'Empleado',
  client: 'Cliente',
};
