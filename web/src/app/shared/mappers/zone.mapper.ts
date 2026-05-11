import { mapToComputer } from "@shared/mappers/computer.mapper";
import type { Zone, ZoneResponse } from "@shared/models/zone.model";

export function mapToZone(response: ZoneResponse): Zone {
	return {
		...response,
		computers: response.computers.map(mapToComputer),
	};
}
