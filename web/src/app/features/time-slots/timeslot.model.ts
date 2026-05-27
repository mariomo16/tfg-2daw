import type { ReservationResponse } from "../reservations/reservation.model";

export interface TimeSlotResponse {
	id: number;
	start_time: string;
	end_time: string;
	reservations: ReservationResponse[];
}

export interface TimeSlot
	extends Omit<TimeSlotResponse, "start_time" | "end_time"> {
	startTime: string;
	endTime: string;
	duration: number;
}

export interface CreateTimeSlotDto {
	start_time: string;
	end_time: string;
}

export type UpdateTimeSlotDto = CreateTimeSlotDto;
