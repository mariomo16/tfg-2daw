import { mapToUser } from "@shared/mappers/user.mapper";
import type {
	Notification,
	NotificationResponse,
} from "@shared/models/notification.model";

export function mapToNotification(
	response: NotificationResponse,
): Notification {
	return {
		...response,
		userId: response.user_id,
		user: mapToUser(response.user) ?? [],
		createdAt: response.created_at,
	};
}
