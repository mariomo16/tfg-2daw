export interface NotificationResponse {
	id: number;
	message: string;
	user_id: number;
	user: unknown[]; // TODO: User interface
	created_at: string;
}

export interface CreateNotificationDto {
	message: string;
	user_id: number;
}
