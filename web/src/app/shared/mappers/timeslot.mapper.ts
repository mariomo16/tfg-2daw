import { mapToReservation } from "@shared/mappers/reservation.mapper";
import type { TimeSlot, TimeSlotResponse } from "@shared/models/timeslot.model";

export function mapToTimeSlot(response: TimeSlotResponse): TimeSlot {
	return {
		...response,
		reservations: response.reservations.map(mapToReservation) ?? [],
	};
}
