import { registerLocaleData } from "@angular/common";
import {
	provideHttpClient,
	withFetch,
	withInterceptors,
} from "@angular/common/http";
import localeEs from "@angular/common/locales/es";
import {
	type ApplicationConfig,
	LOCALE_ID,
	provideBrowserGlobalErrorListeners,
	provideZonelessChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";
import { authInterceptor } from "@core/interceptors/auth.interceptor";
import { routes } from "./app.routes";

registerLocaleData(localeEs);

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideRouter(routes),
		provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
		provideZonelessChangeDetection(),
		{ provide: LOCALE_ID, useValue: "es" },
	],
};
