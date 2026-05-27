import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { API_URL } from '../../../core/tokens/api-url.token';
import type {
  CreateNotificationDto,
  NotificationResponse,
  UpdateNotificationDto,
} from './notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  readonly #http = inject(HttpClient);
  readonly #userUrl = `${inject(API_URL)}/my-notifications`;
  readonly #adminUrl = `${inject(API_URL)}/admin/notifications`;

  getAll(): Observable<NotificationResponse[]> {
    return this.#http.get<NotificationResponse[]>(this.#adminUrl);
  }

  getById(id: number): Observable<NotificationResponse> {
    return this.#http.get<NotificationResponse>(`${this.#adminUrl}/${id}`);
  }

  create(data: CreateNotificationDto): Observable<NotificationResponse> {
    return this.#http.post<NotificationResponse>(this.#adminUrl, data);
  }

  update(id: number, data: UpdateNotificationDto): Observable<NotificationResponse> {
    return this.#http.post<NotificationResponse>(`${this.#adminUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.#http.post<void>(`${this.#adminUrl}/${id}`, null);
  }

  myNotifications(): Observable<NotificationResponse[]> {
    return this.#http.get<NotificationResponse[]>(this.#userUrl);
  }
}
