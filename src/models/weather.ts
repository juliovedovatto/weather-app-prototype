export interface CurrentCondition {
  text: string;
  icon: string;
  code: number;
  temp_c?: number;
}

export interface WeatherLocation {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

// Extracted interface for the `current` payload returned by Weather API
export interface CurrentWeatherData {
  last_updated: string;
  last_updated_epoch: number;
  temp_c: number;
  temp_f: number;
  is_day: 0 | 1;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
  feelslike_c: number;
  feelslike_f: number;
  wind_kph: number;
  wind_mph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
}

export interface CurrentWeather {
  location: WeatherLocation;
  current: CurrentWeatherData;
}

// Forecast (subset for hourly timeline)
export interface ForecastHour {
  time_epoch: number;
  time: string; // e.g. "2025-09-08 14:00"
  temp_c: number;
  temp_f: number;
  is_day: 0 | 1;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
  feelslike_c: number;
  wind_kph: number;
  wind_mph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  snow_cm: number;
  humidity: number;
  cloud: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  will_it_rain?: number;
  chance_of_rain?: number;
  will_it_snow?: number;
  chance_of_snow?: number;
  vis_km: number;
  vis_miles: number;
  gust_mph: number;
  gust_kph: number;
  uv: number;
}

export interface ForecastDay {
  date: string;
  date_epoch: number;
  day: {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avgtemp_c: number;
    avgtemp_f: number;
    maxwind_mph: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    totalprecip_in: number;
    totalsnow_cm: number;
    avgvis_km: number;
    avgvis_miles: number;
    avghumidity: number;
    daily_will_it_rain: number;
    daily_chance_of_rain: number;
    daily_will_it_snow: number;
    daily_chance_of_snow: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    uv: number;
  };
  astro: {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moon_phase: string;
    moon_illumination: string; // API returns as string
    is_moon_up?: number;
    is_sun_up?: number;
  };
  hour: ForecastHour[];
}

export interface ForecastResponse {
  location: WeatherLocation;
  current: CurrentWeatherData; // include current conditions alongside forecast
  forecast: {
    forecastday: ForecastDay[];
  };
}
