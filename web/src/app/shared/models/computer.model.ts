import type { Reservation, ReservationResponse } from "./reservation.model";
import type { Zone } from "./zone.model";

export type ComputerStatus = "available" | "maintenance" | "occupied";

export interface ComputerResponse {
	id: number;
	name: string;
	status: ComputerStatus;
	zone: Zone;
	reservations: ReservationResponse[];
}

export interface Computer
	extends Omit<ComputerResponse, "zone" | "reservations"> {
	zone: Zone;
	reservations: Reservation[];
}

export interface CreateComputerDto {
	name: string;
	status: ComputerStatus;
	zone_id: number;
}

export interface UpdateComputerDto extends Partial<CreateComputerDto> {}
