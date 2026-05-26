import { mapToReservation } from "@shared/mappers/reservation.mapper";
import type { TimeSlot, TimeSlotResponse } from "@shared/models/timeslot.model";

export function mapToTimeSlot(res: TimeSlotResponse): TimeSlot {
	return {
		...res,
		reservations: res.reservations
			? res.reservations.map(mapToReservation)
			: undefined,
	};
}
