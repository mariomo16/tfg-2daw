import type { ComputerResponse } from '../computer/computer.model';
import type { PaymentResponse } from '../payment/payment.model';
import type { TimeSlotResponse } from '../timeslot/timeslot.model';
import type { UserResponse } from '../user/user.model';

export type ReservationStatus = 'confirmed' | 'cancelled';
export type ReservationStatusLabel = 'Confirmado' | 'Cancelado';

export interface ReservationResponse {
  id: number;
  user_id: number;
  computer_id: number;
  time_slot_id: number;
  date: string;
  status: ReservationStatus;
  total_price: number;
  updated_at: string;
  computer: ComputerResponse;
  payment: PaymentResponse;
  timeslot: TimeSlotResponse;
  user: UserResponse;
}

export interface CreateReservationDto {
  user_id: number;
  computer_id: number;
  time_slot_id: number;
  total_price: number;
  date: string;
}

export interface UpdateReservationDto {
  status?: ReservationStatus;
  computer_id?: number;
}
