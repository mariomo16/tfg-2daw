import { HttpClient, type HttpErrorResponse } from "@angular/common/http";
import { computed, Injectable, inject, signal } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, map, type Observable, of, tap, throwError } from "rxjs";
import { API_URL } from "../../core/tokens/api-url.token";
import { mapToUser } from "../admin/users/user.mapper";
import type { User, UserResponse } from "../admin/users/user.model";
import type { AuthResponse, LoginDto, RegisterDto } from "./auth.models";

interface AuthState {
	user: User | null;
	isLoading: boolean;
}

@Injectable({
	providedIn: "root",
})
export class AuthService {
	readonly #http = inject(HttpClient);
	readonly #router = inject(Router);
	readonly #baseUrl = inject(API_URL);

	readonly #state = signal<AuthState>({ user: null, isLoading: false });

	readonly user = computed(() => this.#state().user);
	readonly isAuthenticated = computed(() => !!this.#state().user);
	readonly isLoading = computed(() => this.#state().isLoading);

	constructor() {
		this.checkAuth().subscribe();
	}

	login(credentials: LoginDto): Observable<AuthResponse> {
		this.#setLoading(true);
		return this.#http
			.post<AuthResponse>(`${this.#baseUrl}/login`, credentials)
			.pipe(
				tap((response) => this.#setUser(mapToUser(response.user))),
				catchError(this.#handleError),
			);
	}

	register(data: RegisterDto): Observable<AuthResponse> {
		this.#setLoading(true);
		return this.#http
			.post<AuthResponse>(`${this.#baseUrl}/register`, data)
			.pipe(
				tap((response) => this.#setUser(mapToUser(response.user))),
				catchError(this.#handleError),
			);
	}

	logout(): Observable<void> {
		this.#setLoading(true);
		return this.#http.post<void>(`${this.#baseUrl}/logout`, {}).pipe(
			tap(() => this.#clearAndRedirect()),
			catchError((err) => {
				this.#clearAndRedirect();
				return throwError(() => err);
			}),
		);
	}

	checkAuth(): Observable<User | null> {
		this.#setLoading(true);
		return this.#http.get<UserResponse>(`${this.#baseUrl}/user`).pipe(
			map(mapToUser),
			tap((user) =>
				this.#state.update((s) => ({ ...s, user, isLoading: false })),
			),
			catchError((): Observable<null> => {
				// console.error("Auth check failed:", error);
				this.#state.update((s) => ({ ...s, user: null, isLoading: false }));
				return of(null);
			}),
		);
	}

	#setUser(user: User): void {
		this.#state.update((s) => ({ ...s, user, isLoading: false }));
	}

	#clearAndRedirect(): void {
		this.#state.update((s) => ({ ...s, user: null, isLoading: false }));
		this.#router.navigate(["/auth/login"]);
	}

	#setLoading(isLoading: boolean): void {
		this.#state.update((s) => ({ ...s, isLoading }));
	}

	readonly #handleError = (error: HttpErrorResponse) => {
		this.#setLoading(false);
		return throwError(() => error);
	};
}
