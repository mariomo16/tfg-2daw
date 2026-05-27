import type { HttpInterceptorFn } from "@angular/common/http";

/**
 * Adds `withCredentials: true` to every outgoing request so the browser
 * sends and accepts cross-origin cookies (the HttpOnly `token` cookie).
 */
export const credentialsInterceptor: HttpInterceptorFn = (req, next) =>
	next(req.clone({ withCredentials: true }));
