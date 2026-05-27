import { ZONE_ACCENTS, ZONE_ICONS } from "./zone.constants";
import type { Zone, ZoneResponse } from "./zone.model";

export function mapToZone(response: ZoneResponse): Zone {
	const available = response.computers.filter(
		(computer) => computer.status === "available",
	).length;

	return {
		id: response.id,
		name: response.name,
		pricePerSlot: response.price_per_slot,
		computers: response.computers,
		totalComputers: response.computers.length,
		availableComputers: available,
		icon: ZONE_ICONS[response.name],
		accent: ZONE_ACCENTS[response.name],
	};
}
