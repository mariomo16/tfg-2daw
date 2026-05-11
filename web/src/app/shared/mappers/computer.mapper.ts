import { mapToReservation } from "@shared/mappers/reservation.mapper";
import type { Computer, ComputerResponse } from "@shared/models/computer.model";

export function mapToComputer(response: ComputerResponse): Computer {
	return {
		...response,
		reservations: response.reservations?.map(mapToReservation) ?? [],
	};
}
