import type { ComputerResponse } from "../computers/computer.model";

export type ZoneName = "Zona Gaming" | "Zona Torneo" | "Zona VIP";

export interface ZoneResponse {
	id: number;
	name: ZoneName;
	price_per_slot: number;
	computers: ComputerResponse[];
}

export interface Zone {
	id: number;
	name: ZoneName;
	pricePerSlot: number;
	computers: ComputerResponse[];
	availableComputers: number;
	totalComputers: number;
	icon: string;
	accent: string;
}

export interface CreateZoneDto {
	name: ZoneName;
	price_per_slot: number;
}

export type UpdateZoneDto = CreateZoneDto;
