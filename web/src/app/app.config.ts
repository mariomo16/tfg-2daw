import { provideHttpClient, withFetch } from "@angular/common/http";
import {
	type ApplicationConfig,
	LOCALE_ID,
	provideBrowserGlobalErrorListeners,
	provideZonelessChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideRouter(routes),
		provideHttpClient(withFetch()),
		provideZonelessChangeDetection(),
		{ provide: LOCALE_ID, useValue: "es" },
	],
};
