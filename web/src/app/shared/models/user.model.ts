export type UserRole = "staff" | "client";

export interface UserResponse {
	id: number;
	name: string;
	email: string;
	role: string;
	balance: number;
	image: string;
	notifications: unknown[]; // TODO: Notification interface
	payments: unknown[]; // TODO: Payment interface
	reservations: unknown[]; // TODO: Reservation interface
	email_verified_at: string | null;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
}

export interface User
	extends Omit<
		UserResponse,
		"email_verified_at" | "created_at" | "updated_at" | "deleted_at"
	> {
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
