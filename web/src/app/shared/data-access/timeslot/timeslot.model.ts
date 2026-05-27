import type { ReservationResponse } from '../reservation/reservation.model';

export interface TimeSlotResponse {
  id: number;
  start_time: string;
  end_time: string;
  reservations: ReservationResponse[];
}

export interface TimeSlotExtended extends TimeSlotResponse {
  duration: number;
}

export interface CreateTimeSlotDto {
  start_time: string;
  end_time: string;
}

export type UpdateTimeSlotDto = CreateTimeSlotDto;
