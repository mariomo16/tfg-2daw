import type { Computer, ComputerResponse } from "./computer.model";

export interface ZoneResponse {
	id: number;
	name: string;
	description: string;
	price: number;
	image: string;
	computers: ComputerResponse[];
}

export interface Zone extends Omit<ZoneResponse, "computers"> {
	computers: Computer[];
}

export interface CreateZoneDto {
	name: string;
	description: string;
	price: number;
	image: File;
}

export interface UpdateZoneDto extends Partial<CreateZoneDto> {}
