import { mapToNotification } from "@shared/mappers/notification.mapper";
import { mapToPayment } from "@shared/mappers/payment.mapper";
import { mapToReservation } from "@shared/mappers/reservation.mapper";
import type { User, UserResponse } from "@shared/models/user.model";

export function mapToUser(res: UserResponse): User {
	return {
		...res,
		avatarPath: res.avatar_path,
		notifications: res.notifications
			? res.notifications.map(mapToNotification)
			: undefined,
		payments: res.payments ? res.payments.map(mapToPayment) : undefined,
		reservations: res.reservations
			? res.reservations.map(mapToReservation)
			: undefined,
		emailVerifiedAt: res.email_verified_at ? res.email_verified_at : null,
		createdAt: res.created_at,
		updatedAt: res.updated_at,
		deletedAt: res.deleted_at,
	};
}
