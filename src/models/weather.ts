export interface CurrentCondition {
  text: string;
  icon: string;
  code: number;
  temp_c?: number;
}

export interface CurrentWeather {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  current: {
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
    wind_dir: string;
    humidity: number;
    cloud: number;
    uv: number;
  };
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
  humidity: number;
  cloud: number;
  will_it_rain?: number;
  chance_of_rain?: number;
  will_it_snow?: number;
  chance_of_snow?: number;
  uv: number;
}

export interface ForecastResponse {
  location: CurrentWeather['location'];
  forecast: {
    forecastday: Array<{
      date: string;
      date_epoch: number;
      hour: ForecastHour[];
    }>;
  };
}
