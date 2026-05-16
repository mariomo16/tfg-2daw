import type { Computer, ComputerResponse } from "./computer.model";
import type { Payment, PaymentResponse } from "./payment.model";
import type { TimeSlot, TimeSlotResponse } from "./timeslot.model";
import type { User, UserResponse } from "./user.model";

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
	timeslot: TimeSlotResponse;
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
		| "timeslot"
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
