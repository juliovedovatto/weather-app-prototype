import client from './client';

import type { CurrentWeather, ForecastResponse, SearchLocationResult } from '@/models/weather';

const API_KEY = import.meta.env?.VITE_WEATHERAPI_KEY || '';
const BASE_URL = 'https://api.weatherapi.com/v1';

export interface GetCurrentWeatherOptions {
  aqi?: 'yes' | 'no';
  lang?: string;
}

/**
 * Fetch current weather for a location.
 */
export async function getCurrentWeather(q: string, opts: GetCurrentWeatherOptions = {}) {
  if (!q) {
    throw new Error('getCurrentWeather: query (q) is required');
  }
  if (!API_KEY) {
    throw new Error('Missing VITE_WEATHERAPI_KEY');
  }

  const params: Record<string, string> = { key: API_KEY, q };
  if (opts.aqi) {
    params.aqi = opts.aqi;
  }
  if (opts.lang) {
    params.lang = opts.lang;
  }

  const url = `${BASE_URL}/current.json`;
  const res = await client.get<CurrentWeather>(url, { params });
  return res.data;
}

/**
 * Search for locations by query.
 */
export async function searchLocations(q: string, opts: { signal?: AbortSignal } = {}) {
  if (!q) {
    throw new Error('searchLocations: query (q) is required');
  }
  if (!API_KEY) {
    throw new Error('Missing VITE_WEATHERAPI_KEY');
  }
  const params: Record<string, string> = { key: API_KEY, q };
  const url = `${BASE_URL}/search.json`;
  const res = await client.get<SearchLocationResult[]>(url, { params, signal: opts.signal });
  return res.data;
}

export interface GetLocationForecastOptions {
  days?: number; // number of forecast days to fetch
  lang?: string;
}

/**
 * Fetch weather forecast for a location.
 */
export async function getLocationForecast(q: string, opts: GetLocationForecastOptions = {}) {
  if (!q) {
    throw new Error('getLocationForecast: query (q) is required');
  }
  if (!API_KEY) {
    throw new Error('Missing VITE_WEATHERAPI_KEY');
  }

  const params: Record<string, string | number> = { key: API_KEY, q, days: opts.days ?? 1 };
  if (opts.lang) {
    params.lang = opts.lang;
  }

  const url = `${BASE_URL}/forecast.json`;
  const response = await client.get<ForecastResponse>(url, { params });

  return response.data;
}
