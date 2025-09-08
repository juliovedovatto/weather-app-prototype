import client from './client';

import type { CurrentWeather } from '@/models/weather';

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
