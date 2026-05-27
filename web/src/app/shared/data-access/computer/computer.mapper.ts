import { COMPUTER_STATUS_ACCENTS } from './computer.constants';
import type { ComputerExtended, ComputerResponse } from './computer.model';

export function mapToComputer(response: ComputerResponse): ComputerExtended {
  return {
    ...response,
    statusAccent: COMPUTER_STATUS_ACCENTS[response.status],
  };
}
