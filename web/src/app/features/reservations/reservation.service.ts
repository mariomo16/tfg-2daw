import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { map, type Observable } from "rxjs";
import { API_URL } from "../../core/tokens/api-url.token";
import { mapToReservation } from "./reservation.mapper";
import type {
	CreateReservationDto,
	Reservation,
	ReservationResponse,
	UpdateReservationDto,
} from "./reservation.model";

@Injectable({
	providedIn: "root",
})
export class ReservationService {
	readonly #http = inject(HttpClient);
	readonly #adminUrl = `${inject(API_URL)}/admin/reservations`;

	getAll(): Observable<Reservation[]> {
		return this.#http
			.get<ReservationResponse[]>(this.#adminUrl)
			.pipe(
				map((reservations) =>
					reservations.map((reservation) => mapToReservation(reservation)),
				),
			);
	}

	getById(id: number): Observable<Reservation> {
		return this.#http
			.get<ReservationResponse>(`${this.#adminUrl}/${id}`)
			.pipe(map((reservation) => mapToReservation(reservation)));
	}

	create(data: CreateReservationDto): Observable<Reservation> {
		return this.#http
			.post<ReservationResponse>(this.#adminUrl, data)
			.pipe(map((reservation) => mapToReservation(reservation)));
	}

	update(id: number, data: UpdateReservationDto): Observable<Reservation> {
		return this.#http
			.put<ReservationResponse>(`${this.#adminUrl}/${id}`, data)
			.pipe(map((reservation) => mapToReservation(reservation)));
	}
}
