import { describe, test, expect } from 'vitest';

import { getTemperatureColor } from './temperatureColor';

describe('getTemperatureColor', () => {
  test('returns fallback for invalid temperature', () => {
    expect(getTemperatureColor(undefined)).toBe('wx-gray-100');
    expect(getTemperatureColor(null)).toBe('wx-gray-100');
    expect(getTemperatureColor(Number.NaN)).toBe('wx-gray-100');
  });

  test('maps cold temperature', () => {
    expect(getTemperatureColor(0)).toBe('wx-sky-50');
    expect(getTemperatureColor(8)).toBe('wx-sky-50');
  });

  test('maps mild temperature', () => {
    expect(getTemperatureColor(9)).toBe('wx-aqua-100');
    expect(getTemperatureColor(14)).toBe('wx-aqua-100');
  });

  test('maps pleasant temperature', () => {
    expect(getTemperatureColor(15)).toBe('wx-amber-100');
    expect(getTemperatureColor(19)).toBe('wx-amber-100');
  });

  test('maps warm temperature', () => {
    expect(getTemperatureColor(20)).toBe('wx-orange-100');
    expect(getTemperatureColor(25)).toBe('wx-orange-100');
  });

  test('maps hot temperature', () => {
    expect(getTemperatureColor(26)).toBe('wx-pink-200');
    expect(getTemperatureColor(40)).toBe('wx-pink-200');
  });
});
