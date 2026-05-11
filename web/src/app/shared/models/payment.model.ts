export type PaymentType = "payment" | "refund";

export interface PaymentResponse {
	id: number;
	type: PaymentType;
	amount: number;
	user_id: number;
	reservation_id: number;
	user: unknown[]; // TODO: User interface
	reservation: unknown[]; // TODO: Reservation interface
	created_at: string;
}

export interface CreatePaymentDto {
	type: PaymentType;
	amount: number;
	user_id: number;
	reservation_id: number;
}
