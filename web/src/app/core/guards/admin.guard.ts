import { inject } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { type CanActivateFn, Router } from "@angular/router";
import { AuthService } from "@core/auth/auth.service";
import { filter, map, take } from "rxjs";

export const adminGuard: CanActivateFn = () => {
	const auth = inject(AuthService);
	const router = inject(Router);

	if (!auth.isLoading()) {
		return auth.isAuthenticated() && auth.isStaff()
			? true
			: router.createUrlTree(["/"]);
	}

	return toObservable(auth.isLoading).pipe(
		filter((isLoading) => !isLoading),
		take(1),
		map(() => {
			if (auth.isAuthenticated() && auth.isStaff()) {
				return true;
			}
			return router.createUrlTree(["/"]);
		}),
	);
};
