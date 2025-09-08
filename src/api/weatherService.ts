import client from './client';

import type { CurrentWeather, ForecastResponse, ForecastHour } from '@/models/weather';

const API_KEY = import.meta.env?.VITE_WEATHERAPI_KEY || '';
const BASE_URL = 'https://api.weatherapi.com/v1';

export interface GetCurrentWeatherOptions {
  aqi?: 'yes' | 'no';
  lang?: string;
}

export async function getCurrentWeather(q: string, opts: GetCurrentWeatherOptions = {}) {
  if (!q) throw new Error('getCurrentWeather: query (q) is required');
  if (!API_KEY) throw new Error('Missing VITE_WEATHERAPI_KEY');

  const params: Record<string, string> = { key: API_KEY, q };
  if (opts.aqi) params.aqi = opts.aqi;
  if (opts.lang) params.lang = opts.lang;

  const url = `${BASE_URL}/current.json`;
  const res = await client.get<CurrentWeather>(url, { params });
  return res.data;
}

export interface GetLocationForecastOptions {
  days?: number; // number of forecast days to fetch
  lang?: string;
}

/**
 * Fetch weather forecast for a location.
 * Returns a flattened array of hours (by default for the first forecast day).
 */
export async function getLocationForecast(q: string, opts: GetLocationForecastOptions = {}): Promise<ForecastHour[]> {
  if (!q) throw new Error('getLocationForecast: query (q) is required');
  if (!API_KEY) throw new Error('Missing VITE_WEATHERAPI_KEY');

  const params: Record<string, string | number> = { key: API_KEY, q, days: opts.days ?? 1 };
  if (opts.lang) params.lang = opts.lang;

  const url = `${BASE_URL}/forecast.json`;
  const res = await client.get<ForecastResponse>(url, { params });

  const forecastDays = res.data.forecast?.forecastday ?? [];
  if (!forecastDays.length) return [];

  // Flatten requested days (defaults to first day if days=1)
  return forecastDays.flatMap((d) => d.hour);
}
