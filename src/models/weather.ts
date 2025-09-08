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
