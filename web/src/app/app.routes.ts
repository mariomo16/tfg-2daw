import type { Routes } from "@angular/router";
import { guestGuard } from "@core/guards/guest.guard";

export const routes: Routes = [
	{
		path: "",
		loadComponent: () =>
			import("@features/home/home").then((module) => module.Home),
		title: "Inicio",
	},
	{
		path: "register",
		canActivate: [guestGuard],
		loadComponent: () =>
			import("@features/auth/register/register").then(
				(module) => module.Register,
			),
		title: "Registrarse",
	},
	{
		path: "login",
		canActivate: [guestGuard],
		loadComponent: () =>
			import("@features/auth/login/login").then((module) => module.Login),
		title: "Iniciar sesión",
	},
	{
		path: "info-zones",
		loadComponent: () =>
			import("@features/info-zones/info-zones").then(
				(module) => module.InfoZones,
			),
		title: "Información de la zonas",
	},
	{
		path: "**",
		loadComponent: () =>
			import("./shared/ui/not-found/not-found").then(
				(module) => module.NotFound,
			),
		title: "Página no encontrada",
	},
];
