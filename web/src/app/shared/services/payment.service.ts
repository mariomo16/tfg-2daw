import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { API_URL } from "@core/tokens/api-url.token";
import { mapToPayment } from "@shared/mappers/payment.mapper";
import type {
	CreatePaymentDto,
	Payment,
	PaymentResponse,
} from "@shared/models/payment.model";
import { map, type Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class PaymentService {
	readonly #http = inject(HttpClient);
	readonly #resourceUrl = `${inject(API_URL)}/payments`;

	getAll(): Observable<Payment[]> {
		return this.#http
			.get<PaymentResponse[]>(this.#resourceUrl)
			.pipe(map((payments) => payments.map(mapToPayment)));
	}

	getById(id: number): Observable<Payment> {
		return this.#http
			.get<PaymentResponse>(`${this.#resourceUrl}/${id}`)
			.pipe(map(mapToPayment));
	}

	create(data: CreatePaymentDto): Observable<Payment> {
		return this.#http
			.post<PaymentResponse>(this.#resourceUrl, data)
			.pipe(map(mapToPayment));
	}
}
