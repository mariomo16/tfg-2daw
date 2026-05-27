import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { map, type Observable } from "rxjs";
import { API_URL } from "../../core/tokens/api-url.token";
import { mapToTimeSlot } from "./timeslot.mapper";
import type {
	CreateTimeSlotDto,
	TimeSlot,
	TimeSlotResponse,
	UpdateTimeSlotDto,
} from "./timeslot.model";

@Injectable({
	providedIn: "root",
})
export class TimeSlotService {
	readonly #http = inject(HttpClient);
	readonly #baseUrl = `${inject(API_URL)}/timeslots`;
	readonly #adminUrl = `${inject(API_URL)}/admin/timeslots`;

	getAll(): Observable<TimeSlot[]> {
		return this.#http
			.get<TimeSlotResponse[]>(this.#baseUrl)
			.pipe(
				map((timeslots) =>
					timeslots.map((timeslot) => mapToTimeSlot(timeslot)),
				),
			);
	}

	getById(id: number): Observable<TimeSlot> {
		return this.#http
			.get<TimeSlotResponse>(`${this.#adminUrl}/${id}`)
			.pipe(map((timeslot) => mapToTimeSlot(timeslot)));
	}

	create(data: CreateTimeSlotDto): Observable<TimeSlot> {
		return this.#http
			.post<TimeSlotResponse>(this.#adminUrl, data)
			.pipe(map((timeslot) => mapToTimeSlot(timeslot)));
	}

	update(id: number, data: UpdateTimeSlotDto): Observable<TimeSlot> {
		return this.#http
			.put<TimeSlotResponse>(`${this.#adminUrl}/${id}`, data)
			.pipe(map((timeslot) => mapToTimeSlot(timeslot)));
	}

	delete(id: number): Observable<void> {
		return this.#http.delete<void>(`${this.#adminUrl}/${id}`);
	}
}
