import type { Routes } from "@angular/router";
import { AdminLayout } from "./layout/admin-layout";

export const ADMIN_ROUTES: Routes = [
	{
		path: "",
		component: AdminLayout,
		children: [
			{
				path: "",
				redirectTo: "reservations",
				pathMatch: "full",
			},
			{
				path: "reservations",
				loadComponent: () =>
					import("./reservations/reservation-list/reservation-list").then(
						(m) => m.ReservationList,
					),
				title: "Reservas",
			},
			{
				path: "users",
				loadChildren: () =>
					import("./users/user.routes").then((m) => m.USER_ROUTES),
			},
			{
				path: "payments",
				loadComponent: () =>
					import("./payments/payment-list/payment-list").then(
						(m) => m.PaymentList,
					),
				title: "Pagos",
			},
			{
				path: "zones",
				loadChildren: () =>
					import("./zones/zones.routes").then((m) => m.ZONES_ROUTES),
			},
			{
				path: "computers",
				loadChildren: () =>
					import("./computers/computers.routes").then(
						(m) => m.COMPUTERS_ROUTES,
					),
			},
			{
				path: "timeslots",
				loadChildren: () =>
					import("./timeslots/timeslots.routes").then(
						(m) => m.TIMESLOTS_ROUTES,
					),
			},
		],
	},
];
