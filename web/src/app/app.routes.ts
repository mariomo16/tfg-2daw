import type { Routes } from "@angular/router";

export const routes: Routes = [
	{
		path: "",
		loadComponent: () =>
			import("@features/home/home").then((module) => module.Home),
		title: "Inicio",
	},
	{
		path: "register",
		loadComponent: () =>
			import("@features/auth/register/register").then(
				(module) => module.Register,
			),
		title: "Registrarse",
	},
	{
		path: "login",
		loadComponent: () =>
			import("@features/auth/login/login").then((module) => module.Login),
		title: "Iniciar sesión",
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
