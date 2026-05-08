import type { Routes } from "@angular/router";

export const routes: Routes = [
	{
		path: "",
		loadComponent: () =>
			import("./features/home/home").then((module) => module.Home),
		title: "Inicio",
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
