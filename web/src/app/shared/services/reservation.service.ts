import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { API_URL } from "@core/tokens/api-url.token";
import { mapToReservation } from "@shared/mappers/reservation.mapper";
import type {
	CreateReservationDto,
	Reservation,
	ReservationResponse,
	UpdateReservationDto,
} from "@shared/models/reservation.model";
import { map, type Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class ReservationService {
	readonly #http = inject(HttpClient);
	readonly #resourceUrl = `${inject(API_URL)}/reservations`;

	getAll(): Observable<Reservation[]> {
		return this.#http
			.get<ReservationResponse[]>(this.#resourceUrl)
			.pipe(map((reservations) => reservations.map(mapToReservation)));
	}

	getById(id: number): Observable<Reservation> {
		return this.#http
			.get<ReservationResponse>(`${this.#resourceUrl}/${id}`)
			.pipe(map(mapToReservation));
	}

	create(data: CreateReservationDto): Observable<Reservation> {
		return this.#http
			.post<ReservationResponse>(this.#resourceUrl, data)
			.pipe(map(mapToReservation));
	}

	update(id: number, data: UpdateReservationDto): Observable<Reservation> {
		return this.#http
			.put<ReservationResponse>(`${this.#resourceUrl}/${id}`, data)
			.pipe(map(mapToReservation));
	}

	cancel(id: number): Observable<void> {
		return this.#http.post<void>(`${this.#resourceUrl}/${id}/cancel`, null);
	}
}
