import { HttpClient } from '@angular/common/http';
import { computed, Injectable, inject, isDevMode, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CookieService } from 'ngx-cookie-service';
import { catchError, type Observable, of, tap } from 'rxjs';
import { API_URL } from '../../core/tokens/api-url.token';
import { USER_ROLE_LABELS } from '../../shared/data-access/user/user.constants';
import type { UserResponse } from '../../shared/data-access/user/user.model';
import type { AuthResponse, LoginDto, RegisterDto } from './auth.models';

interface AuthState {
  user: UserResponse | null;
  isLoading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly #http = inject(HttpClient);
  readonly #baseUrl = inject(API_URL);
  readonly #cookies = inject(CookieService);

  readonly #TOKEN_KEY = 'token';
  readonly #state = signal<AuthState>({ user: null, isLoading: false });

  readonly user = computed(() => this.#state().user);
  readonly userRole = computed(() => {
    const user = this.user();
    return user ? USER_ROLE_LABELS[user.role] : null;
  });
  readonly isAuthenticated = computed(() => !!this.#state().user);
  readonly isLoading = computed(() => this.#state().isLoading);

  constructor() {
    this.checkAuth().pipe(takeUntilDestroyed()).subscribe();
  }

  login(credentials: LoginDto): Observable<AuthResponse> {
    return this.#authRequest('login', credentials);
  }

  register(data: RegisterDto): Observable<AuthResponse> {
    return this.#authRequest('register', data);
  }

  logout(): Observable<void> {
    this.#updateState({ isLoading: true });

    return this.#http.post<void>(`${this.#baseUrl}/logout`, {}).pipe(tap(() => this.#clearToken()));
  }

  checkAuth(): Observable<UserResponse | null> {
    if (!this.#cookies.get(this.#TOKEN_KEY)) {
      this.#updateState({ user: null, isLoading: false });
      return of(null);
    }

    this.#updateState({ isLoading: true });
    return this.#http.get<UserResponse>(`${this.#baseUrl}/user`).pipe(
      catchError(() => of(null)),
      tap((user) => this.#updateState({ user, isLoading: false })),
    );
  }

  #authRequest(
    endpoint: 'login' | 'register',
    payload: LoginDto | RegisterDto,
  ): Observable<AuthResponse> {
    this.#updateState({ isLoading: true });

    return this.#http.post<AuthResponse>(`${this.#baseUrl}/${endpoint}`, payload).pipe(
      tap((response) => {
        this.#saveToken(response.token);
        this.#updateState({
          isLoading: false,
        });
      }),
    );
  }

  #updateState(partialState: Partial<AuthState>): void {
    this.#state.update((state) => ({ ...state, ...partialState }));
  }

  #saveToken(token: string): void {
    this.#cookies.set(this.#TOKEN_KEY, token, {
      expires: 7,
      secure: !isDevMode(),
      sameSite: 'Strict',
      path: '/',
    });
  }

  #clearToken(): void {
    this.#cookies.delete(this.#TOKEN_KEY, '/');
    this.#updateState({ user: null, isLoading: false });
  }
}
