import type { Computer, ComputerResponse } from "@shared/models/computer.model";
import type { Payment, PaymentResponse } from "@shared/models/payment.model";
import type { TimeSlot, TimeSlotResponse } from "@shared/models/timeslot.model";
import type { User, UserResponse } from "@shared/models/user.model";

export type ReservationStatus = "confirmed" | "cancelled" | "pending";

export interface ReservationResponse {
	id: number;
	date: string;
	status: ReservationStatus;
	price: number;
	user_id: number;
	computer_id: number;
	time_slot_id: number;
	user: UserResponse;
	payment: PaymentResponse;
	computer: ComputerResponse;
	time_slot: TimeSlotResponse;
	created_at: string;
	updated_at: string;
}

export interface Reservation
	extends Omit<
		ReservationResponse,
		| "user_id"
		| "computer_id"
		| "time_slot_id"
		| "user"
		| "payment"
		| "computer"
		| "time_slot"
		| "created_at"
		| "updated_at"
	> {
	userId: number;
	computerId: number;
	timeslotId: number;
	user: User | undefined;
	Payment: Payment | undefined;
	Computer: Computer | undefined;
	timeslot: TimeSlot | undefined;
	createdAt: string;
	updatedAt: string;
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
