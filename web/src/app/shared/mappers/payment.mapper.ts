import { mapToReservation } from "@shared/mappers/reservation.mapper";
import { mapToUser } from "@shared/mappers/user.mapper";
import type { Payment, PaymentResponse } from "@shared/models/payment.model";

export function mapToPayment(res: PaymentResponse): Payment {
  return {
    ...res,
    userId: res.user_id,
    reservationId: res.reservation_id,
    user: res.user ? mapToUser(res.user) : undefined,
    reservation: res.reservation
      ? mapToReservation(res.reservation)
      : undefined,
    createdAt: res.created_at,
  };
}
