import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { API_URL } from "@core/tokens/api-url.token";
import { mapToNotification } from "@shared/mappers/notification.mapper";
import type {
	CreateNotificationDto,
	Notification,
	NotificationResponse,
} from "@shared/models/notification.model";
import { map, type Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class NotificationService {
	readonly #http = inject(HttpClient);
	readonly #resourceUrl = `${inject(API_URL)}/notifications`;
	readonly #userUrl = `${inject(API_URL)}/my-notifications`;

	getAll(): Observable<Notification[]> {
		return this.#http
			.get<NotificationResponse[]>(this.#resourceUrl)
			.pipe(map((notifications) => notifications.map(mapToNotification)));
	}

	getById(id: number): Observable<Notification> {
		return this.#http
			.get<NotificationResponse>(`${this.#resourceUrl}/${id}`)
			.pipe(map(mapToNotification));
	}

	create(data: CreateNotificationDto): Observable<Notification> {
		return this.#http
			.post<NotificationResponse>(this.#resourceUrl, data)
			.pipe(map(mapToNotification));
	}

	delete(id: number): Observable<void> {
		return this.#http.post<void>(`${this.#resourceUrl}/${id}`, null);
	}

	myNotifications(): Observable<Notification[]> {
		return this.#http
			.get<NotificationResponse[]>(this.#userUrl)
			.pipe(map((notifications) => notifications.map(mapToNotification)));
	}
}
