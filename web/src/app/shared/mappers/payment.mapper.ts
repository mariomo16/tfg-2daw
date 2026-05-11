import { mapToReservation } from "@shared/mappers/reservation.mapper";
import { mapToUser } from "@shared/mappers/user.mapper";
import type { Payment, PaymentResponse } from "@shared/models/payment.model";

export function mapToPayment(response: PaymentResponse): Payment {
	return {
		...response,
		userId: response.user_id,
		reservationId: response.reservation_id,
		user: mapToUser(response.user),
		reservation: mapToReservation(response.reservation),
		createdAt: response.created_at,
	};
}
