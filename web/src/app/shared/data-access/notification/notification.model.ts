import type { UserResponse } from '../user/user.model';

export interface NotificationResponse {
  id: number;
  user_id: number;
  message: string;
  read_at?: string;
  created_at: string;
  user: UserResponse;
}

export interface CreateNotificationDto {
  user_id: number;
  message: string;
}

export type UpdateNotificationDto = CreateNotificationDto;
