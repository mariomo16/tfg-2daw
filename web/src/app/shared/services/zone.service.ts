import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { API_URL } from "@core/tokens/api-url.token";
import { mapToZone } from "@shared/mappers/zone.mapper";
import type {
	CreateZoneDto,
	UpdateZoneDto,
	Zone,
	ZoneResponse,
} from "@shared/models/zone.model";
import { map, type Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class ZoneService {
	readonly #http = inject(HttpClient);
	readonly #resourceUrl = `${inject(API_URL)}/zones`;

	getAll(): Observable<Zone[]> {
		return this.#http
			.get<ZoneResponse[]>(this.#resourceUrl)
			.pipe(map((zones) => zones.map(mapToZone)));
	}

	getById(id: number): Observable<Zone> {
		return this.#http
			.get<ZoneResponse>(`${this.#resourceUrl}/${id}`)
			.pipe(map((zone) => mapToZone(zone)));
	}

	create(data: CreateZoneDto): Observable<Zone> {
		return this.#http
			.post<ZoneResponse>(this.#resourceUrl, data)
			.pipe(map((zone) => mapToZone(zone)));
	}

	update(id: number, data: UpdateZoneDto): Observable<Zone> {
		return this.#http
			.put<ZoneResponse>(`${this.#resourceUrl}/${id}`, data)
			.pipe(map((zone) => mapToZone(zone)));
	}

	delete(id: number): Observable<void> {
		return this.#http.delete<void>(`${this.#resourceUrl}/${id}`);
	}
}
