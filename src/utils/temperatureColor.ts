/**
 * Map a temperature in Celsius to a Tailwind color token.
 *
 * Ranges:
 *  - ≤ 8°C   -> cold
 *  - 9–14°C  -> mild
 *  - 15–19°C -> pleasant
 *  - 20–25°C -> warm
 *  - ≥ 26°C  -> hot
 *  - invalid or not defined -> neutral fallback
 *
 * @param temp Temperature in Celsius
 * @returns Color token string
 */
export function getTemperatureColor(temp?: number | null) {
  if (temp == null || Number.isNaN(temp)) {
    return 'wx-gray-100';
  }

  let color: string;

  switch (true) {
    case temp <= 8:
      color = 'wx-sky-50';
      break;
    case temp <= 14:
      color = 'wx-aqua-100';
      break;
    case temp <= 19:
      color = 'wx-amber-100';
      break;
    case temp <= 25:
      color = 'wx-orange-100';
      break;
    default:
      color = 'wx-pink-200';
      break;
  }

  return color;
}
