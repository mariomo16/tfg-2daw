import type { Notification, NotificationResponse } from "./notification.model";
import type { PaymentResponse } from "./payment.model";
import type { ReservationResponse } from "./reservation.model";

export type UserRole = "staff" | "client";

export interface UserResponse {
	id: number;
	name: string;
	email: string;
	role: string;
	balance: number;
	image: string;
	notifications: NotificationResponse[];
	payments: PaymentResponse[];
	reservations: ReservationResponse[];
	email_verified_at: string | null;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
}

export interface User
	extends Omit<
		UserResponse,
		| "email_verified_at"
		| "created_at"
		| "updated_at"
		| "deleted_at"
		| "notifications"
		| "payments"
		| "reservations"
	> {
	notifications: Notification[];
	emailVerifiedAt: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: string;
}

export interface CreateUserDto {
	name: string;
	email: string;
	role: UserRole;
	balance: number;
	image: string;
	password: string;
}

export interface UpdateUserDto {
	name: string;
	email: string;
	role?: UserRole;
	balance?: number;
	image?: string;
	password?: string;
}
