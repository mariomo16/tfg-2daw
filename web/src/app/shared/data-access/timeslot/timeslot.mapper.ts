import type { TimeSlotExtended, TimeSlotResponse } from './timeslot.model';

export function mapToTimeSlot(response: TimeSlotResponse): TimeSlotExtended {
  return {
    ...response,
    start_time: response.start_time.slice(0, 5),
    end_time: response.end_time.slice(0, 5),
    duration: calcDuration(response.start_time, response.end_time),
  };
}

export function calcDuration(start: string, end: string): number {
  const [startH, startM] = start.split(':').map(Number);
  const [endH, endM] = end.split(':').map(Number);
  const duration = (endH * 60 + endM - (startH * 60 + startM)) / 60;
  return Math.round(duration * 100) / 100;
}
