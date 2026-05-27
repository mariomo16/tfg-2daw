import type { ComputerStatus, ComputerStatusLabel } from './computer.model';

export const COMPUTER_STATUS_LABELS: Record<ComputerStatus, ComputerStatusLabel> = {
  available: 'Disponible',
  occupied: 'Ocupado',
  maintenance: 'Mantenimiento',
};

export const COMPUTER_STATUS_ACCENTS: Record<ComputerStatus, string> = {
  available: 'bg-success/10 text-success border border-bold border-success/20',
  occupied: 'bg-info/10 text-info border border-info/20',
  maintenance: 'bg-warning/10 text-warning border border-warning/20',
};
