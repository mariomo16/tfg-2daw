import { ZONE_ACCENTS, ZONE_ICONS } from './zone.constants';
import type { ZoneExtended, ZoneResponse } from './zone.model';

export function mapToZone(response: ZoneResponse): ZoneExtended {
  const available = response.computers?.filter(
    (computer) => computer.status === 'available',
  ).length;

  return {
    ...response,
    availableComputers: available ?? 0,
    totalComputers: response.computers?.length ?? 0,
    icon: ZONE_ICONS[response.name],
    accent: ZONE_ACCENTS[response.name],
  };
}
