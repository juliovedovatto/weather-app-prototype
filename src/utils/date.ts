import { format, fromUnixTime } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

/**
 * Resolved timezone of the current runtime environment.
 */
export const currentTz = Intl.DateTimeFormat().resolvedOptions().timeZone;

/**
 * Converts a date-like value to a Date adjusted to the specified timezone.
 *
 * @param date Original date-like value.
 * @param tz Target timezone (defaults to the current environment timezone).
 * @returns Date instance representing the same instant in the target timezone.
 */
export function convertToTimezone(date: Date | number | string, tz: string = currentTz) {
  const d = typeof date === 'string' ? new Date(date) : new Date(date);
  return toZonedTime(d, tz);
}

/**
 * Formats a Date as an hour with AM/PM (e.g. 3PM).
 * @param date Date to format.
 * @returns Formatted hour label.
 */
export function formatHour(date: Date) {
  return format(date, 'ha');
}

/**
 * Converts a Unix epoch value in seconds to a Date.
 * @param seconds Unix timestamp in seconds.
 * @returns Date representing the provided epoch seconds.
 */
export function unixTimeToDate(seconds: number) {
  return fromUnixTime(seconds);
}
