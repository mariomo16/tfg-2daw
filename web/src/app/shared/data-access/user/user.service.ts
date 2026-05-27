import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { API_URL } from '../../../core/tokens/api-url.token';
import type { CreateUserDto, UpdateUserDto, UserResponse } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly #http = inject(HttpClient);
  readonly #adminUrl = `${inject(API_URL)}/admin/users`;

  getAll(): Observable<UserResponse[]> {
    return this.#http.get<UserResponse[]>(this.#adminUrl);
  }

  getById(id: number): Observable<UserResponse> {
    return this.#http.get<UserResponse>(`${this.#adminUrl}/${id}`);
  }

  create(data: CreateUserDto | FormData): Observable<UserResponse> {
    return this.#http.post<UserResponse>(this.#adminUrl, data);
  }

  update(id: number, data: UpdateUserDto | FormData): Observable<UserResponse> {
    return this.#http.put<UserResponse>(`${this.#adminUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.#http.delete<void>(`${this.#adminUrl}/${id}`);
  }
}
