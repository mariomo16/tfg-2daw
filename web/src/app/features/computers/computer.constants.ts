import type { ComputerStatus, ComputerStatusLabel } from "./computer.model";

export const COMPUTER_STATUS_LABELS: Record<
	ComputerStatus,
	ComputerStatusLabel
> = {
	available: "Disponible",
	occupied: "Ocupado",
	maintenance: "Mantenimiento",
};

export const COMPUTER_STATUS_ACCENTS: Record<ComputerStatus, string> = {
	available: "bg-accent-emerald/10 text-accent-emerald",
	occupied: "bg-accent-blue/10 text-accent-blue",
	maintenance: "bg-accent-amber/10 text-accent-amber",
};
