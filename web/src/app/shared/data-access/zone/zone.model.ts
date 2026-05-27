import type { ComputerResponse } from '../computer/computer.model';

export type ZoneName = 'Zona Gaming' | 'Zona Torneo' | 'Zona VIP';

export interface ZoneResponse {
  id: number;
  name: ZoneName;
  price_per_slot: number;
  computers?: ComputerResponse[];
}

export interface ZoneExtended extends ZoneResponse {
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
