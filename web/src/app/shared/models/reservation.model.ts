export type ReservationStatus = "confirmed" | "cancelled" | "pending";

export interface ReservationResponse {
	id: number;
	date: string;
	status: ReservationStatus;
	price: number;
	user_id: number;
	computer_id: number;
	time_slot_id: number;
	user: unknown; // TODO: User interface
	payment: unknown; // TODO: Payment interface
	computer: unknown; // TODO: Computer interface
	timeslot: unknown; // TODO: TimeSlot interface
	created_at: string;
	updated_at: string;
}

export interface CreateReservationDto {
	date: string;
	status: ReservationStatus;
	price: number;
	user_id: number;
	computer_id: number;
	time_slot_id: number;
}

export interface UpdateReservationDto extends Partial<CreateReservationDto> {}
