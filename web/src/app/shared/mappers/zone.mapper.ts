import { mapToComputer } from "@shared/mappers/computer.mapper";
import type { Zone, ZoneResponse } from "@shared/models/zone.model";

export function mapToZone(response: ZoneResponse): Zone {
	return {
		...response,
		coverImage: response.cover_image,
		computers: response.computers?.map(mapToComputer) ?? [],
	};
}
