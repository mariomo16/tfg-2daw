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
import { routes } from "./app.routes";
import { credentialsInterceptor } from "./core/interceptors/credentials.interceptor";

registerLocaleData(localeEs);

export const appConfig: ApplicationConfig = {
	providers: [
		{ provide: LOCALE_ID, useValue: "es" },
		provideBrowserGlobalErrorListeners(),
		provideHttpClient(withFetch(), withInterceptors([credentialsInterceptor])),
		provideRouter(routes),
		provideZonelessChangeDetection(),
	],
};
