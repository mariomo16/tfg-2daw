import {
	COMPUTER_STATUS_ACCENTS,
	COMPUTER_STATUS_LABELS,
} from "./computer.constants";
import type { Computer, ComputerResponse } from "./computer.model";

export function mapToComputer(response: ComputerResponse): Computer {
	return {
		id: response.id,
		name: response.name,
		specs: response.specs,
		zone: response.zone,
		zone_id: response.zone_id,
		status: COMPUTER_STATUS_LABELS[response.status],
		statusRaw: response.status,
		statusAccent: COMPUTER_STATUS_ACCENTS[response.status],
	};
}
