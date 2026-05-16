import type {
	Reservation,
	ReservationResponse,
} from "@shared/models/reservation.model";
import type { User, UserResponse } from "@shared/models/user.model";

export type PaymentType = "payment" | "refund";

export interface PaymentResponse {
	id: number;
	type: PaymentType;
	amount: number;
	user_id: number;
	reservation_id: number;
	user: UserResponse;
	reservation: ReservationResponse;
	created_at: string;
}

export interface Payment
	extends Omit<
		PaymentResponse,
		"user_id" | "reservation_id" | "user" | "reservation" | "created_at"
	> {
	userId: number;
	reservationId: number;
	user: User | undefined;
	reservation: Reservation | undefined;
	createdAt: string;
}

export interface CreatePaymentDto {
	type: PaymentType;
	amount: number;
	user_id: number;
	reservation_id: number;
}
