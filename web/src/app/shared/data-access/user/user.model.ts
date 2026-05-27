import type { NotificationResponse } from '../notification/notification.model';
import type { PaymentResponse } from '../payment/payment.model';
import type { ReservationResponse } from '../reservation/reservation.model';

export type UserRole = 'admin' | 'employee' | 'client';
export type UserRoleLabel = 'Administrador' | 'Empleado' | 'Cliente';

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  balance: number;
  image?: File;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  payments?: PaymentResponse[];
  reservations?: ReservationResponse[];
  notifications?: NotificationResponse[];
}

export interface CreateUserDto {
  name: string;
  email: string;
  role?: UserRole;
  balance: number;
  image?: File;
  password: string;
}

export type UpdateUserDto = CreateUserDto;
