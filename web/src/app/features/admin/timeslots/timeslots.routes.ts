import type { Routes } from "@angular/router";

export const TIMESLOTS_ROUTES: Routes = [
	{
		path: "",
		loadComponent: () =>
			import("./timeslot-list/timeslot-list").then((m) => m.TimeslotList),
		title: "Franjas horarias",
	},
	{
		path: "new",
		loadComponent: () =>
			import("./timeslot-form/timeslot-form").then((m) => m.TimeslotForm),
		title: "Nueva franja",
	},
	{
		path: ":id/edit",
		loadComponent: () =>
			import("./timeslot-form/timeslot-form").then((m) => m.TimeslotForm),
		title: "Editar franja",
	},
];
