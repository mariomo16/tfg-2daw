export interface ZoneResponse {
	id: number;
	name: string;
	description: string;
	price: number;
	image: string;
	computers: unknown[]; // TODO: Computer interface
}

export interface CreateZoneDto {
	name: string;
	description: string;
	price: number;
	image: File;
}

export interface UpdateZoneDto extends Partial<CreateZoneDto> {}
