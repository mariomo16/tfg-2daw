import { mapToUser } from "../admin/users/user.mapper";
import { mapToReservation } from "../reservations/reservation.mapper";
import type { Payment, PaymentResponse } from "./payment.model";

export function mapToPayment(response: PaymentResponse): Payment {
	return {
		...response,
		userId: response.user_id,
		reservationId: response.reservation_id,
		createdAt: response.created_at,
		user: response.user ? mapToUser(response.user) : undefined,
		reservation: response.reservation
			? mapToReservation(response.reservation)
			: undefined,
	};
}
