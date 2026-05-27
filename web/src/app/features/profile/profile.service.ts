import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { API_URL } from '../../core/tokens/api-url.token';
import type { PaymentResponse } from '../../shared/data-access/payment/payment.model';
import type { ReservationResponse } from '../../shared/data-access/reservation/reservation.model';
import type { UserResponse } from '../../shared/data-access/user/user.model';
import type { UpdateProfileDto } from './edit-profile/edit-profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  readonly #http = inject(HttpClient);
  readonly #baseUrl = inject(API_URL);

  getMyReservations(): Observable<ReservationResponse[]> {
    return this.#http.get<ReservationResponse[]>(`${this.#baseUrl}/my-reservations`);
  }

  getMyPayments(): Observable<PaymentResponse[]> {
    return this.#http.get<PaymentResponse[]>(`${this.#baseUrl}/my-payments`);
  }

  updateProfile(data: UpdateProfileDto): Observable<UserResponse> {
    return this.#http.post<UserResponse>(`${this.#baseUrl}/profile`, data);
  }
}
