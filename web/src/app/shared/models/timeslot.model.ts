import type { Reservation, ReservationResponse } from "./reservation.model";

export interface TimeSlotResponse {
	id: number;
	start: string;
	end: string;
	reservations: ReservationResponse[];
}

export interface TimeSlot extends Omit<TimeSlotResponse, "reservations"> {
	reservations: Reservation[] | undefined;
}

export interface CreateTimeSlotDto {
	start: string;
	end: string;
}

export interface UpdateTimeSlotDto extends Partial<CreateTimeSlotDto> {}
