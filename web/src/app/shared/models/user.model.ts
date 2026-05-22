import type {
	Notification,
	NotificationResponse,
} from "@shared/models/notification.model";
import type { Payment, PaymentResponse } from "@shared/models/payment.model";
import type {
	Reservation,
	ReservationResponse,
} from "@shared/models/reservation.model";

export type UserRole = "staff" | "client";

export interface UserResponse {
	id: number;
	name: string;
	email: string;
	role: string;
	balance: number;
	avatar_path: string;
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
		| "avatar_path"
		| "notifications"
		| "payments"
		| "reservations"
		| "email_verified_at"
		| "created_at"
		| "updated_at"
		| "deleted_at"
	> {
	avatarPath: string;
	notifications: Notification[] | undefined;
	payments: Payment[] | undefined;
	reservations: Reservation[] | undefined;
	emailVerifiedAt: string | null;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
}

export interface CreateUserDto {
	name: string;
	email: string;
	role: UserRole;
	balance: number;
	avatar_path: File;
	password: string;
}

export interface UpdateUserDto {
	name: string;
	email: string;
	role?: UserRole;
	balance?: number;
	avatar_path?: File;
	password?: string;
}
