import { test, expect } from 'vitest';

import { convertToTimezone, formatHour, unixTimeToDate } from './date';

test('unixTimeToDate converts seconds to Date', () => {
  const seconds = 1_600_000_000; // fixed reference
  const d = unixTimeToDate(seconds);
  expect(d).toBeInstanceOf(Date);
  expect(Math.floor(d.getTime() / 1000)).toBe(seconds);
});

test('formatHour returns hour with am/pm', () => {
  const d = new Date('2020-01-01T15:00:00Z');
  const label = formatHour(d);
  expect(/am|pm/i.test(label)).toBe(true);
});

test('convertToTimezone returns a valid Date', () => {
  const d = new Date('2020-01-01T12:00:00Z');
  const converted = convertToTimezone(d, 'UTC');
  expect(converted).toBeInstanceOf(Date);
  expect(isNaN(converted.getTime())).toBe(false);
});
