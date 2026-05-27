import type { UserResponse } from "../admin/users/user.model";

export interface LoginDto {
	email: string;
	password: string;
}

export interface RegisterDto {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
}

export interface AuthResponse {
	user: UserResponse;
}
