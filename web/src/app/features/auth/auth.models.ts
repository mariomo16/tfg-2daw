import type { UserResponse } from '../../shared/data-access/user/user.model';

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
  token: string;
}
