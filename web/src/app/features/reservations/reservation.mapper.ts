import { mapToUser } from "../admin/users/user.mapper";
import { mapToComputer } from "../computers/computer.mapper";
import { mapToPayment } from "../payments/payment.mapper";
import { mapToTimeSlot } from "../time-slots/timeslot.mapper";
import type { Reservation, ReservationResponse } from "./reservation.model";

export function mapToReservation(response: ReservationResponse): Reservation {
	return {
		...response,
		userId: response.user_id,
		computerId: response.computer_id,
		timeSlotId: response.time_slot_id,
		totalPrice: response.total_price,
		updatedAt: response.updated_at,
		payment: response.payment ? mapToPayment(response.payment) : undefined,
		computer: response.computer ? mapToComputer(response.computer) : undefined,
		timeSlot: response.timeslot ? mapToTimeSlot(response.timeslot) : undefined,
		user: response.user ? mapToUser(response.user) : undefined,
	};
}
