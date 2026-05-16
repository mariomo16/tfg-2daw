import { mapToReservation } from "@shared/mappers/reservation.mapper";
import type { Computer, ComputerResponse } from "@shared/models/computer.model";
import { mapToZone } from "./zone.mapper";

export function mapToComputer(response: ComputerResponse): Computer {
	return {
		...response,
		zone: mapToZone(response.zone) ?? [],
		reservations: response.reservations?.map(mapToReservation) ?? [],
	};
}
