import type { ReservationResponse } from "../reservations/reservation.model";
import type { Zone } from "../zones/zone.model";

export type ComputerStatus = "available" | "maintenance" | "occupied";
export type ComputerStatusLabel = "Disponible" | "Mantenimiento" | "Ocupado";

export interface ComputerResponse {
	id: number;
	name: string;
	specs: string;
	status: ComputerStatus;
	zone: Zone | null;
	zone_id: number;
	reservations: ReservationResponse[];
}

export interface Computer
	extends Omit<ComputerResponse, "status" | "reservations"> {
	status: ComputerStatusLabel;
	statusRaw: ComputerStatus;
	statusAccent: string;
}

export interface CreateComputerDto {
	name: string;
	zone_id: number;
	status: string;
	specs: string;
}

export type UpdateComputerDto = CreateComputerDto;
