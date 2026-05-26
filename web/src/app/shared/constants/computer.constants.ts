import type { ComputerStatus } from "@shared/models/computer.model";

type ComputerStatusLabel = "Disponible" | "Mantenimiento" | "Ocupado";

export const COMPUTER_STATUS_LABELS: Record<
	ComputerStatus,
	ComputerStatusLabel
> = {
	available: "Disponible",
	occupied: "Ocupado",
	maintenance: "Mantenimiento",
};
