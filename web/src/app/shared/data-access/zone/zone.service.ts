import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, type Observable } from 'rxjs';
import { API_URL } from '../../../core/tokens/api-url.token';
import { mapToZone } from './zone.mapper';
import type { CreateZoneDto, UpdateZoneDto, ZoneExtended, ZoneResponse } from './zone.model';

@Injectable({
  providedIn: 'root',
})
export class ZoneService {
  readonly #http = inject(HttpClient);
  readonly #baseUrl = `${inject(API_URL)}/zones`;
  readonly #adminUrl = `${inject(API_URL)}/admin/zones`;

  getAll(): Observable<ZoneExtended[]> {
    return this.#http.get<ZoneResponse[]>(this.#baseUrl).pipe(map((zones) => zones.map(mapToZone)));
  }

  getById(id: number): Observable<ZoneExtended> {
    return this.#http
      .get<ZoneResponse>(`${this.#baseUrl}/${id}`)
      .pipe(map((zone) => mapToZone(zone)));
  }

  create(data: CreateZoneDto): Observable<ZoneExtended> {
    return this.#http.post<ZoneResponse>(this.#adminUrl, data).pipe(map((zone) => mapToZone(zone)));
  }

  update(id: number, data: UpdateZoneDto): Observable<ZoneExtended> {
    return this.#http
      .put<ZoneResponse>(`${this.#adminUrl}/${id}`, data)
      .pipe(map((zone) => mapToZone(zone)));
  }

  delete(id: number): Observable<void> {
    return this.#http.delete<void>(`${this.#adminUrl}/${id}`);
  }
}
