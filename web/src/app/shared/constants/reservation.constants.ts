import type { ReservationStatus } from "@shared/models/reservation.model";

type ReservationStatusLabel = "Confirmado" | "Pendiente" | "Cancelado";

export const RESERVATION_STATUS_LABEL: Record<
	ReservationStatus,
	ReservationStatusLabel
> = {
	confirmed: "Confirmado",
	cancelled: "Cancelado",
	pending: "Pendiente",
};
