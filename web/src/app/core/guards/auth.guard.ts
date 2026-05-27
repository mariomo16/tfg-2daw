import { inject } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { type CanActivateFn, Router } from "@angular/router";
import { filter, map, take } from "rxjs";
import { AuthService } from "../../features/auth/auth.service";

export const authGuard: CanActivateFn = () => {
	const auth = inject(AuthService);
	const router = inject(Router);

	if (!auth.isLoading()) {
		return auth.isAuthenticated()
			? true
			: router.createUrlTree(["/auth/login"]);
	}

	return toObservable(auth.isLoading).pipe(
		filter((isLoading) => !isLoading),
		take(1),
		map(() => {
			if (auth.isAuthenticated()) {
				return true;
			}
			return router.createUrlTree(["/auth/login"]);
		}),
	);
};
