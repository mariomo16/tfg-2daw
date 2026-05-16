import type { User, UserResponse } from "./user.model";

export interface NotificationResponse {
	id: number;
	message: string;
	user_id: number;
	user: UserResponse;
	created_at: string;
}

export interface Notification
	extends Omit<NotificationResponse, "user_id" | "user" | "created_at"> {
	userId: number;
	user: User | undefined;
	createdAt: string;
}

export interface CreateNotificationDto {
	message: string;
	user_id: number;
}
