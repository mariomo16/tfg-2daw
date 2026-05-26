import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { API_URL } from "@core/tokens/api-url.token";
import { mapToComputer } from "@shared/mappers/computer.mapper";
import type {
	Computer,
	ComputerResponse,
	CreateComputerDto,
	UpdateComputerDto,
} from "@shared/models/computer.model";
import { map, type Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class ComputerService {
	readonly #http = inject(HttpClient);
	readonly #resourceUrl = `${inject(API_URL)}/computers`;

	getAll(): Observable<Computer[]> {
		return this.#http
			.get<ComputerResponse[]>(this.#resourceUrl)
			.pipe(map((computers) => computers.map(mapToComputer)));
	}

	getById(id: number): Observable<Computer> {
		return this.#http
			.get<ComputerResponse>(`${this.#resourceUrl}/${id}`)
			.pipe(map(mapToComputer));
	}

	create(data: CreateComputerDto): Observable<Computer> {
		return this.#http
			.post<ComputerResponse>(this.#resourceUrl, data)
			.pipe(map(mapToComputer));
	}

	update(id: number, data: UpdateComputerDto): Observable<Computer> {
		return this.#http
			.put<ComputerResponse>(`${this.#resourceUrl}/${id}`, data)
			.pipe(map(mapToComputer));
	}

	delete(id: number): Observable<void> {
		return this.#http.delete<void>(`${this.#resourceUrl}/${id}`);
	}
}
