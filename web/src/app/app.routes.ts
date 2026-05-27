import type { Routes } from "@angular/router";
import { authGuard } from "./core/guards/auth.guard";

export const routes: Routes = [
	{
		path: "",
		loadComponent: () =>
			import("./features/home/home").then((module) => module.Home),
		title: "Inicio",
	},
	{
		path: "auth",
		children: [
			{
				path: "",
				redirectTo: "login",
				pathMatch: "full",
			},
			{
				path: "login",
				loadComponent: () =>
					import("./features/auth/login/login").then((module) => module.Login),
				title: "Iniciar sesión",
			},
			{
				path: "register",
				loadComponent: () =>
					import("./features/auth/register/register").then(
						(module) => module.Register,
					),
				title: "¡Regístrate!",
			},
		],
	},
	{
		path: "admin",
		canActivate: [authGuard],
		loadComponent: () =>
			import("./features/admin/layout/admin-layout").then(
				(module) => module.AdminLayout,
			),
		children: [
			{ path: "", redirectTo: "dashboard", pathMatch: "full" },
			{
				path: "dashboard",
				loadComponent: () =>
					import("./features/admin/dashboard/dashboard").then(
						(module) => module.Dashboard,
					),
				title: "Panel de administración",
			},
			{
				path: "zones",
				loadComponent: () =>
					import("./features/admin/zones/zone-list/zone-list").then(
						(module) => module.ZoneList,
					),
				title: "Zonas",
			},
			{
				path: "zones/new",
				loadComponent: () =>
					import("./features/admin/zones/zone-form/zone-form").then(
						(module) => module.ZoneForm,
					),
				title: "Nueva zona",
			},
			{
				path: "zones/:id/edit",
				loadComponent: () =>
					import("./features/admin/zones/zone-form/zone-form").then(
						(module) => module.ZoneForm,
					),
				title: "Editar zona",
			},
			{
				path: "computers",
				loadComponent: () =>
					import("./features/admin/computers/computer-list/computer-list").then(
						(module) => module.ComputerList,
					),
				title: "Ordenadores",
			},
			{
				path: "computers/new",
				loadComponent: () =>
					import("./features/admin/computers/computer-form/computer-form").then(
						(module) => module.ComputerForm,
					),
				title: "Nuevo ordenador",
			},
			{
				path: "computers/:id/edit",
				loadComponent: () =>
					import("./features/admin/computers/computer-form/computer-form").then(
						(module) => module.ComputerForm,
					),
				title: "Editar ordenador",
			},
			{
				path: "timeslots",
				loadComponent: () =>
					import("./features/admin/timeslots/timeslot-list/timeslot-list").then(
						(module) => module.TimeslotList,
					),
				title: "Franjas horarias",
			},
			{
				path: "timeslots/new",
				loadComponent: () =>
					import("./features/admin/timeslots/timeslot-form/timeslot-form").then(
						(module) => module.TimeslotForm,
					),
				title: "Nueva franja",
			},
			{
				path: "timeslots/:id/edit",
				loadComponent: () =>
					import("./features/admin/timeslots/timeslot-form/timeslot-form").then(
						(module) => module.TimeslotForm,
					),
				title: "Editar franja",
			},
			{
				path: "users",
				loadComponent: () =>
					import("./features/admin/users/user-list/user-list").then(
						(module) => module.UserList,
					),
				title: "Usuarios",
			},
			{
				path: "users/new",
				loadComponent: () =>
					import("./features/admin/users/user-form/user-form").then(
						(module) => module.UserForm,
					),
				title: "Nuevo usuario",
			},
			{
				path: "users/:id/edit",
				loadComponent: () =>
					import("./features/admin/users/user-form/user-form").then(
						(module) => module.UserForm,
					),
				title: "Editar usuario",
			},
			{
				path: "reservations",
				loadComponent: () =>
					import(
						"./features/admin/reservations/reservation-list/reservation-list"
					).then((module) => module.ReservationList),
				title: "Reservas",
			},
			{
				path: "payments",
				loadComponent: () =>
					import("./features/admin/payments/payment-list/payment-list").then(
						(module) => module.PaymentList,
					),
				title: "Pagos",
			},
		],
	},
	{
		path: "**",
		loadComponent: () =>
			import("./shared/ui/errors/not-found/not-found").then(
				(module) => module.NotFound,
			),
		title: "Página no encontrada",
	},
];
