import type { User, UserResponse } from "./user.model";

export function mapToUser(response: UserResponse): User {
	return {
		id: response.id,
		role: response.role,
		email: response.email,
		verifiedAt: response.email_verified_at
			? formatDate(response.email_verified_at)
			: null,
		name: response.name,
		balance: response.balance,
		createdAt: formatDate(response.created_at),
		createdAtRaw: response.created_at,
		reservations: response.reservations,
		payments: response.payments,
		notifications: response.notifications,
	};
}

function formatDate(dateString: string): string {
	return new Date(dateString).toLocaleDateString("es-ES", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});
}
