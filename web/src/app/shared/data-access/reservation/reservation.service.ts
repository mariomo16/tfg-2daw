import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { API_URL } from '../../../core/tokens/api-url.token';
import type {
  CreateReservationDto,
  ReservationResponse,
  UpdateReservationDto,
} from './reservation.model';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  readonly #http = inject(HttpClient);
  readonly #baseUrl = `${inject(API_URL)}/reservations`;
  readonly #adminUrl = `${inject(API_URL)}/admin/reservations`;

  getAll(): Observable<ReservationResponse[]> {
    return this.#http.get<ReservationResponse[]>(this.#adminUrl);
  }

  getById(id: number): Observable<ReservationResponse> {
    return this.#http.get<ReservationResponse>(`${this.#adminUrl}/${id}`);
  }

  create(data: CreateReservationDto): Observable<ReservationResponse> {
    return this.#http.post<ReservationResponse>(this.#baseUrl, data);
  }

  update(id: number, data: UpdateReservationDto): Observable<ReservationResponse> {
    return this.#http.put<ReservationResponse>(`${this.#adminUrl}/${id}`, data);
  }

  cancel(id: number): Observable<void> {
    return this.#http.post<void>(`${this.#baseUrl}/${id}/cancel`, null);
  }
}
