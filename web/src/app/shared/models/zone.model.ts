import type { Computer, ComputerResponse } from "@shared/models/computer.model";

export interface ZoneResponse {
	id: number;
	name: string;
	description: string;
	price: number;
	cover_image: string;
	computers: ComputerResponse[];
}

export interface Zone extends Omit<ZoneResponse, "cover_image" | "computers"> {
	coverImage: string;
	computers: Computer[] | undefined;
}

export interface CreateZoneDto {
	name: string;
	description: string;
	price: number;
	cover_image: string;
}

export interface UpdateZoneDto extends Partial<CreateZoneDto> {}
