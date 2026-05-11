export interface TimeSlotResponse {
	id: number;
	start: string;
	end: string;
	reservations: unknown[]; // TODO: Reservation interface
}

export interface CreateTimeSlotDto {
	start: string;
	end: string;
}

export interface UpdateTimeSlotDto extends Partial<CreateTimeSlotDto> {}
