import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { map, type Observable } from "rxjs";
import { API_URL } from "../../core/tokens/api-url.token";
import { mapToPayment } from "./payment.mapper";
import type {
	CreatePaymentDto,
	Payment,
	PaymentResponse,
} from "./payment.model";

@Injectable({
	providedIn: "root",
})
export class PaymentService {
	readonly #http = inject(HttpClient);
	readonly #adminUrl = `${inject(API_URL)}/admin/payments`;

	getAll(): Observable<Payment[]> {
		return this.#http
			.get<PaymentResponse[]>(this.#adminUrl)
			.pipe(
				map((payments) => payments.map((payment) => mapToPayment(payment))),
			);
	}

	getById(id: number): Observable<Payment> {
		return this.#http
			.get<PaymentResponse>(`${this.#adminUrl}/${id}`)
			.pipe(map((payment) => mapToPayment(payment)));
	}

	create(data: CreatePaymentDto): Observable<Payment> {
		return this.#http
			.post<PaymentResponse>(this.#adminUrl, data)
			.pipe(map((payment) => mapToPayment(payment)));
	}
}
