import { mapToReservation } from "@shared/mappers/reservation.mapper";
import { mapToZone } from "@shared/mappers/zone.mapper";
import type { Computer, ComputerResponse } from "@shared/models/computer.model";

export function mapToComputer(response: ComputerResponse): Computer {
	return {
		...response,
		zone: response.zone ? mapToZone(response.zone) : undefined,
		reservations: response.reservations
			? response.reservations.map(mapToReservation)
			: undefined,
	};
}
