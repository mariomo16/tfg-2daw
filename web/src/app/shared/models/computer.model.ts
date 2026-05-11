export type ComputerStatus = "available" | "maintenance" | "occupied";

export interface ComputerResponse {
	id: number;
	name: string;
	status: ComputerStatus;
	zone: unknown[]; // TODO: Zone interface
	reservations: unknown[]; // TODO: Reservation interface
}

export interface CreateComputerDto {
	name: string;
	status: ComputerStatus;
	zone_id: number;
}

export interface UpdateComputerDto extends Partial<CreateComputerDto> {}
