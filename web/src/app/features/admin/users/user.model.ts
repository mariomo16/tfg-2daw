import type { ReservationResponse } from "../../reservations/reservation.model";

export type UserRole = "client" | "employee" | "admin";

export interface UserResponse {
	id: number;
	role: UserRole;
	email: string;
	email_verified_at: string | null;
	name: string;
	balance: number;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
	reservations: ReservationResponse[];
	payments: PaymentResponse[];
	notifications: unknown[]; // TODO notifications interface
}

export interface User
	extends Omit<
		UserResponse,
		"email_verified_at" | "created_at" | "updated_at" | "deleted_at"
	> {
	verifiedAt: string | null;
	createdAt: string;
	createdAtRaw: string;
}

export interface CreateUserDto {
	name: string;
	email: string;
	password: string;
	role: UserRole;
	balance: number;
}

export type UpdateUserDto = CreateUserDto;
