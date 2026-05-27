import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	resource,
} from "@angular/core";
import { firstValueFrom } from "rxjs";
import { LoadingIcons } from "../../../shared/icons/icons";
import { COMPUTER_STATUS_LABELS } from "../../computers/computer.constants";
import { ComputerService } from "../../computers/computer.service";
import { TimeSlotService } from "../../time-slots/timeslot.service";
import { ZoneService } from "../../zones/zone.service";
import { UserService } from "../users/user.service";
import { DashboardCard, type StatCardData } from "./card/dashboard-card";

@Component({
	selector: "app-dashboard",
	imports: [DashboardCard],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: "./dashboard.html",
})
export class Dashboard {
	// #region Dependencies
	readonly #zoneService = inject(ZoneService);
	readonly #computerService = inject(ComputerService);
	readonly #timeslotService = inject(TimeSlotService);
	readonly #userService = inject(UserService);
	// #endregion
	protected readonly loadingIcon = LoadingIcons.spinner;

	// #region Zones
	protected readonly zonesResource = resource({
		loader: () => firstValueFrom(this.#zoneService.getAll()),
	});

	protected readonly totalZones = computed(
		() => this.zonesResource.value()?.length ?? 0,
	);
	// #endregion

	// #region Computers
	protected readonly computersResource = resource({
		loader: () => firstValueFrom(this.#computerService.getAll()),
	});

	protected readonly totalComputers = computed(
		() => this.computersResource.value()?.length ?? 0,
	);

	protected readonly computerStats = computed(() => {
		const computers = this.computersResource.value() ?? [];
		return {
			available: computers.filter(
				(c) => c.status === COMPUTER_STATUS_LABELS.available,
			),
			occupued: computers.filter(
				(c) => c.status === COMPUTER_STATUS_LABELS.occupied,
			),
			maintenance: computers.filter(
				(c) => c.status === COMPUTER_STATUS_LABELS.maintenance,
			),
		};
	});
	// #endregion

	// #region TimeSlots
	protected readonly timeslotsResource = resource({
		loader: () => firstValueFrom(this.#timeslotService.getAll()),
	});

	protected readonly totalTimeSlots = computed(
		() => this.timeslotsResource.value()?.length ?? 0,
	);

	protected readonly earliestTimeSlot = computed(() => {
		const timeslots = this.timeslotsResource.value();
		if (!timeslots?.length) return null;

		return timeslots.reduce((earliest, current) =>
			current.startTime < earliest.startTime ? current : earliest,
		);
	});

	protected readonly latestTimeSlot = computed(() => {
		const timeslots = this.timeslotsResource.value();
		if (!timeslots?.length) return null;

		return timeslots.reduce((latest, current) =>
			current.endTime > latest.endTime ? current : latest,
		);
	});
	// #endregion

	// #region Users

	protected readonly usersResource = resource({
		loader: () => firstValueFrom(this.#userService.getAll()),
	});

	protected readonly totalUsers = computed(
		() => this.usersResource.value()?.length ?? 0,
	);

	protected readonly clientUsers = computed(
		() =>
			this.usersResource.value()?.filter((u) => u.role === "client").length ??
			0,
	);

	protected readonly adminUsers = computed(
		() =>
			this.usersResource.value()?.filter((u) => u.role === "admin").length ?? 0,
	);

	protected readonly employeeUsers = computed(
		() =>
			this.usersResource.value()?.filter((u) => u.role === "employee").length ??
			0,
	);

	protected readonly newUsersThisWeek = computed(() => {
		const users = this.usersResource.value();
		if (!users?.length) return 0;

		const oneWeekAgo = new Date();
		oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

		return users.filter((user) => new Date(user.createdAtRaw) > oneWeekAgo)
			.length;
	});
	// #endregion

	protected readonly data = computed<StatCardData[]>(() => [
		{
			isLoading: this.usersResource.isLoading,
			error: this.usersResource.error,
			title: "Usuarios",
			info: this.totalUsers,
			iconColor: "text-amber-400",
			linkRoute: "/admin/users/new",
			linkColor: "hover:border-amber-500/30 hover:bg-amber-500/5",
		},
		{
			isLoading: this.usersResource.isLoading,
			error: this.usersResource.error,
			title: "Reservas",
			info: this.totalUsers,
			iconColor: "text-sky-400",
			linkRoute: "/admin/reservations/new",
			linkColor: "hover:border-sky-500/30 hover:bg-sky-500/5",
		},
		{
			isLoading: this.computersResource.isLoading,
			error: this.computersResource.error,
			title: "Ordenadores",
			info: this.totalComputers,
			iconColor: "text-violet-400",
			linkRoute: "/admin/computers/new",
			linkColor: "hover:border-violet-500/30 hover:bg-violet-500/5",
		},
		{
			isLoading: this.zonesResource.isLoading,
			error: this.zonesResource.error,
			title: "Zonas",
			info: this.totalZones,
			iconColor: "text-indigo-400",
			linkRoute: "/admin/zones/new",
			linkColor: "hover:border-indigo-500/30 hover:bg-indigo-500/5",
		},
		{
			isLoading: this.timeslotsResource.isLoading,
			error: this.timeslotsResource.error,
			title: "Franjas horarias",
			info: this.totalTimeSlots,
			iconColor: "text-emerald-400",
			linkRoute: "/admin/timeslots/new",
			linkColor: "hover:border-emerald-500/30 hover:bg-emerald-500/5",
		},
	]);
}
