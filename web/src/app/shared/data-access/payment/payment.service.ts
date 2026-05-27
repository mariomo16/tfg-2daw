import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { API_URL } from '../../../core/tokens/api-url.token';
import type { CreatePaymentDto, PaymentResponse } from './payment.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  readonly #http = inject(HttpClient);
  readonly #adminUrl = `${inject(API_URL)}/admin/payments`;

  getAll(): Observable<PaymentResponse[]> {
    return this.#http.get<PaymentResponse[]>(this.#adminUrl);
  }

  getById(id: number): Observable<PaymentResponse> {
    return this.#http.get<PaymentResponse>(`${this.#adminUrl}/${id}`);
  }

  create(data: CreatePaymentDto): Observable<PaymentResponse> {
    return this.#http.post<PaymentResponse>(this.#adminUrl, data);
  }
}
