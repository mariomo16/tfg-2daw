import type { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	const cookies = inject(CookieService);
	const token = cookies.get("token");

	if (!token) return next(req);

	return next(
		req.clone({
			setHeaders: { Authorization: `Bearer ${token}` },
		}),
	);
};
