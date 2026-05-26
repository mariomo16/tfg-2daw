import { mapToComputer } from "@shared/mappers/computer.mapper";
import type { Zone, ZoneResponse } from "@shared/models/zone.model";

export function mapToZone(res: ZoneResponse): Zone {
	return {
		...res,
		coverImage: res.cover_image,
		computers: res.computers ? res.computers.map(mapToComputer) : undefined,
	};
}
