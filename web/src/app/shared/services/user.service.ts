import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { API_URL } from "@core/tokens/api-url.token";
import { mapToUser } from "@shared/mappers/user.mapper";
import type {
	CreateUserDto,
	UpdateUserDto,
	User,
	UserResponse,
} from "@shared/models/user.model";
import { map, type Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class UserService {
	readonly #http = inject(HttpClient);
	readonly #resourceUrl = `${inject(API_URL)}/users`;

	getAll(): Observable<User[]> {
		return this.#http
			.get<UserResponse[]>(this.#resourceUrl)
			.pipe(map((users) => users.map(mapToUser)));
	}

	getById(id: number): Observable<User> {
		return this.#http
			.get<UserResponse>(`${this.#resourceUrl}/${id}`)
			.pipe(map(mapToUser));
	}

	create(data: CreateUserDto | FormData): Observable<User> {
		return this.#http
			.post<UserResponse>(this.#resourceUrl, data)
			.pipe(map(mapToUser));
	}

	update(id: number, data: UpdateUserDto | FormData): Observable<User> {
		return this.#http
			.put<UserResponse>(`${this.#resourceUrl}/${id}`, data)
			.pipe(map(mapToUser));
	}

	delete(id: number): Observable<void> {
		return this.#http.delete<void>(`${this.#resourceUrl}/${id}`);
	}
}
