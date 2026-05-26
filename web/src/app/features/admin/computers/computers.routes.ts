import type { Routes } from "@angular/router";

export const COMPUTERS_ROUTES: Routes = [
	{
		path: "",
		loadComponent: () =>
			import("./computer-list/computer-list").then((m) => m.ComputerList),
		title: "Ordenadores",
	},
	{
		path: "new",
		loadComponent: () =>
			import("./computer-form/computer-form").then((m) => m.ComputerForm),
		title: "Nuevo ordenador",
	},
	{
		path: ":id/edit",
		loadComponent: () =>
			import("./computer-form/computer-form").then((m) => m.ComputerForm),
		title: "Editar ordenador",
	},
];
