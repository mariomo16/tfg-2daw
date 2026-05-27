import type { User, UserResponse } from "../admin/users/user.model";
import type {
	Reservation,
	ReservationResponse,
} from "../reservations/reservation.model";

export type PaymentType = "payment" | "refund";

export interface PaymentResponse {
	id: number;
	user_id: number;
	reservation_id: number;
	amount: number;
	type: PaymentType;
	created_at: string;
	user?: UserResponse;
	reservation?: ReservationResponse;
}

export interface Payment
	extends Omit<
		PaymentResponse,
		"user_id" | "reservation_id" | "created_at" | "user" | "reservation"
	> {
	userId: number;
	reservationId: number;
	createdAt: string;
	user?: User;
	reservation?: Reservation;
}

export interface CreatePaymentDto {
	user_id: number;
	reservation_id: number;
	amount: number;
	type: string;
}
