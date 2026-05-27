import type { ReservationResponse } from '../reservation/reservation.model';
import type { ZoneResponse } from '../zone/zone.model';

export type ComputerStatus = 'available' | 'maintenance' | 'occupied';
export type ComputerStatusLabel = 'Disponible' | 'Mantenimiento' | 'Ocupado';

export interface ComputerResponse {
  id: number;
  name: string;
  specs?: string;
  status: ComputerStatus;
  zone_id: number;
  zone?: ZoneResponse;
  reservations?: ReservationResponse[];
}

export interface ComputerExtended extends ComputerResponse {
  statusAccent: string;
}

export interface CreateComputerDto {
  name: string;
  zone_id: number;
  status?: string;
  specs?: string;
}

export type UpdateComputerDto = CreateComputerDto;
