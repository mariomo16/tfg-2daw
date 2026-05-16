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
    user: response.user ? mapToUser(response.user) : undefined,
    createdAt: response.created_at,
  };
}
