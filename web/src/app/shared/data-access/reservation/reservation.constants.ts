import type { ReservationStatus, ReservationStatusLabel } from './reservation.model';

export const RESERVATION_STATUS_LABEL: Record<ReservationStatus, ReservationStatusLabel> = {
  confirmed: 'Confirmado',
  cancelled: 'Cancelado',
};
