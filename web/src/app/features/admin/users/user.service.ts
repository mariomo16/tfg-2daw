import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { map, type Observable } from "rxjs";
import { API_URL } from "../../../core/tokens/api-url.token";
import { mapToUser } from "./user.mapper";
import type {
	CreateUserDto,
	UpdateUserDto,
	User,
	UserResponse,
} from "./user.model";

@Injectable({
	providedIn: "root",
})
export class UserService {
	readonly #http = inject(HttpClient);
	readonly #adminUrl = `${inject(API_URL)}/admin/users`;

	getAll(): Observable<User[]> {
		return this.#http
			.get<UserResponse[]>(this.#adminUrl)
			.pipe(map((users) => users.map((user) => mapToUser(user))));
	}

	getById(id: number): Observable<User> {
		return this.#http
			.get<UserResponse>(`${this.#adminUrl}/${id}`)
			.pipe(map((user) => mapToUser(user)));
	}

	create(data: CreateUserDto): Observable<User> {
		return this.#http
			.post<UserResponse>(this.#adminUrl, data)
			.pipe(map((user) => mapToUser(user)));
	}

	update(id: number, data: UpdateUserDto): Observable<User> {
		return this.#http
			.put<UserResponse>(`${this.#adminUrl}/${id}`, data)
			.pipe(map((user) => mapToUser(user)));
	}

	delete(id: number): Observable<void> {
		return this.#http.delete<void>(`${this.#adminUrl}/${id}`);
	}
}
