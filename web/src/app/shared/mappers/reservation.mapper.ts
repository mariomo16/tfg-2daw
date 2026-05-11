import { mapToComputer } from "@shared/mappers/computer.mapper";
import { mapToPayment } from "@shared/mappers/payment.mapper";
import { mapToTimeSlot } from "@shared/mappers/timeslot.mapper";
import { mapToUser } from "@shared/mappers/user.mapper";
import type {
	Reservation,
	ReservationResponse,
} from "@shared/models/reservation.model";

export function mapToReservation(response: ReservationResponse): Reservation {
	return {
		...response,
		userId: response.user_id,
		computerId: response.computer_id,
		timeslotId: response.time_slot_id,
		user: mapToUser(response.user) ?? [],
		Payment: mapToPayment(response.payment) ?? [],
		Computer: mapToComputer(response.computer) ?? [],
		timeslot: mapToTimeSlot(response.timeslot) ?? [],
		createdAt: response.created_at,
		updatedAt: response.updated_at,
	};
}
