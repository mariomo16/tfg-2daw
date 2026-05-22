import { mapToComputer } from "@shared/mappers/computer.mapper";
import { mapToPayment } from "@shared/mappers/payment.mapper";
import { mapToTimeSlot } from "@shared/mappers/timeslot.mapper";
import { mapToUser } from "@shared/mappers/user.mapper";
import type {
	Reservation,
	ReservationResponse,
} from "@shared/models/reservation.model";

export function mapToReservation(res: ReservationResponse): Reservation {
	return {
		...res,
		userId: res.user_id,
		computerId: res.computer_id,
		timeslotId: res.time_slot_id,
		user: res.user ? mapToUser(res.user) : undefined,
		Payment: res.payment ? mapToPayment(res.payment) : undefined,
		Computer: res.computer ? mapToComputer(res.computer) : undefined,
		timeslot: res.time_slot ? mapToTimeSlot(res.time_slot) : undefined,
		createdAt: res.created_at,
		updatedAt: res.updated_at,
	};
}
