import type { ReservationResponse } from '../reservation/reservation.model';
import type { UserResponse } from '../user/user.model';

export type PaymentType = 'payment' | 'refund';

export interface PaymentResponse {
  id: number;
  user_id: number;
  reservation_id: number;
  amount: number;
  type: PaymentType;
  created_at: string;
  user: UserResponse;
  reservation: ReservationResponse;
}

export interface CreatePaymentDto {
  user_id: number;
  reservation_id: number;
  amount: number;
  type: string;
}
