import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { map, type Observable } from "rxjs";
import { API_URL } from "../../core/tokens/api-url.token";
import { mapToComputer } from "./computer.mapper";
import type {
	Computer,
	ComputerResponse,
	CreateComputerDto,
	UpdateComputerDto,
} from "./computer.model";

@Injectable({
	providedIn: "root",
})
export class ComputerService {
	readonly #http = inject(HttpClient);
	readonly #baseUrl = `${inject(API_URL)}/computers`;
	readonly #adminUrl = `${inject(API_URL)}/admin/computers`;

	getAll(): Observable<Computer[]> {
		return this.#http
			.get<ComputerResponse[]>(this.#baseUrl)
			.pipe(
				map((computers) =>
					computers.map((computer) => mapToComputer(computer)),
				),
			);
	}

	getById(id: number): Observable<Computer> {
		return this.#http
			.get<ComputerResponse>(`${this.#baseUrl}/${id}`)
			.pipe(map((computer) => mapToComputer(computer)));
	}

	create(data: CreateComputerDto): Observable<Computer> {
		return this.#http
			.post<ComputerResponse>(this.#adminUrl, data)
			.pipe(map((computer) => mapToComputer(computer)));
	}

	update(id: number, data: UpdateComputerDto): Observable<Computer> {
		return this.#http
			.put<ComputerResponse>(`${this.#adminUrl}/${id}`, data)
			.pipe(map((computer) => mapToComputer(computer)));
	}

	delete(id: number): Observable<void> {
		return this.#http.delete<void>(`${this.#adminUrl}/${id}`);
	}
}
