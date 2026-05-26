import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { API_URL } from "@core/tokens/api-url.token";
import { mapToTimeSlot } from "@shared/mappers/timeslot.mapper";
import type {
	CreateTimeSlotDto,
	TimeSlot,
	TimeSlotResponse,
	UpdateTimeSlotDto,
} from "@shared/models/timeslot.model";
import { map, type Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class TimeSlotService {
	readonly #http = inject(HttpClient);
	readonly #resourceUrl = `${inject(API_URL)}/timeslots`;

	getAll(): Observable<TimeSlot[]> {
		return this.#http
			.get<TimeSlotResponse[]>(this.#resourceUrl)
			.pipe(map((timeslots) => timeslots.map(mapToTimeSlot)));
	}

	getById(id: number): Observable<TimeSlot> {
		return this.#http
			.get<TimeSlotResponse>(`${this.#resourceUrl}/${id}`)
			.pipe(map(mapToTimeSlot));
	}

	create(data: CreateTimeSlotDto): Observable<TimeSlot> {
		return this.#http
			.post<TimeSlotResponse>(this.#resourceUrl, data)
			.pipe(map(mapToTimeSlot));
	}

	update(id: number, data: UpdateTimeSlotDto): Observable<TimeSlot> {
		return this.#http
			.put<TimeSlotResponse>(`${this.#resourceUrl}/${id}`, data)
			.pipe(map(mapToTimeSlot));
	}

	delete(id: number): Observable<void> {
		return this.#http.delete<void>(`${this.#resourceUrl}/${id}`);
	}
}
