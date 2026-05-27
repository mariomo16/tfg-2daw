import type { User, UserResponse } from "../admin/users/user.model";
import type { Computer, ComputerResponse } from "../computers/computer.model";
import type { Payment, PaymentResponse } from "../payments/payment.model";
import type { TimeSlot, TimeSlotResponse } from "../time-slots/timeslot.model";

export type ReservationStatus = "confirmed" | "cancelled";

export interface ReservationResponse {
	id: number;
	user_id: number;
	computer_id: number;
	time_slot_id: number;
	date: string;
	status: ReservationStatus;
	total_price: number;
	updated_at: string;
	computer?: ComputerResponse;
	payment?: PaymentResponse;
	timeslot?: TimeSlotResponse;
	user?: UserResponse;
}

export interface Reservation
	extends Omit<
		ReservationResponse,
		| "user_id"
		| "computer_id"
		| "time_slot_id"
		| "total_price"
		| "updated_at"
		| "payment"
		| "computer"
		| "timeslot"
		| "user"
	> {
	userId: number;
	computerId: number;
	timeSlotId: number;
	totalPrice: number;
	updatedAt: string;
	payment?: Payment;
	computer?: Computer;
	timeSlot?: TimeSlot;
	user?: User;
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
