import { mapToNotification } from "@shared/mappers/notification.mapper";
import { mapToPayment } from "@shared/mappers/payment.mapper";
import { mapToReservation } from "@shared/mappers/reservation.mapper";
import type { User, UserResponse } from "@shared/models/user.model";

export function mapToUser(response: UserResponse): User {
	return {
		...response,
		notifications: response.notifications.map(mapToNotification),
		payments: response.payments.map(mapToPayment),
		reservations: response.reservations.map(mapToReservation),
		emailVerifiedAt: response.email_verified_at
			? response.email_verified_at
			: null,
		createdAt: response.created_at,
		updatedAt: response.updated_at,
		deletedAt: response.deleted_at ? response.deleted_at : null,
	};
}
