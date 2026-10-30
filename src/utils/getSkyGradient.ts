export type TimeInput = string | Date; // "2026-10-29T08:08:00.000" | "08:50" | Date

type RGB = [number, number, number];
type Point = { time: number; top: RGB; bottom: RGB };

/**
 * Parse time to format 00:00
 * Supports:
 * - "2026-10-29T08:08:00.000" (ISO)
 * - "08:50" or "08:50:30" (short)
 * - Date object
 */
function toMinutesOfDay(value: TimeInput): number {
  if (value instanceof Date) {
    return value.getHours() * 60 + value.getMinutes() + value.getSeconds() / 60;
  }

  // Short: "08:50" or "08:50:30"
  const shortMatch = /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/.exec(value);
  if (shortMatch) {
    const hours = Number(shortMatch[1]);
    const minutes = Number(shortMatch[2]);
    const seconds = shortMatch[3] ? Number(shortMatch[3]) : 0;
    
    if (hours > 23 || minutes > 59 || seconds > 59) {
      throw new Error(`Некорректное время: ${value}`);
    }
    
    return hours * 60 + minutes + seconds / 60;
  }

  // ISO: "2026-10-29T08:08:00.000"
  const isoMatch = /T(\d{2}):(\d{2})(?::(\d{2}))?(?:\.\d+)?(?:Z|[+-]\d{2}:?\d{2})?$/i.exec(value);
  if (isoMatch) {
    return Number(isoMatch[1]) * 60 + Number(isoMatch[2]) + (Number(isoMatch[3] ?? 0) / 60);
  }

  throw new Error(`Unsupported time format: ${value}`);
}

function hex(hexColor: string): RGB {
  const n = parseInt(hexColor.replace('#', ''), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const mod = (n: number) => ((n % 1440) + 1440) % 1440;
const mix = (a: RGB, b: RGB, t: number): RGB =>
  a.map((v, i) => Math.round(v + (b[i] - v) * t)) as RGB;

const css = (c: RGB) => `rgb(${c[0]}, ${c[1]}, ${c[2]})`;

const C = {
  night:     ['#070B1E', '#161E3A'],
  preDawn:   ['#1B2148', '#4A3E63'],
  dawn:      ['#4A477C', '#E79A76'],
  sunrise:   ['#84AEDD', '#F5C57E'],
  morning:   ['#47A9FF', '#AFDCF7'],
  noon:      ['#2E8BE6', '#9FD6F5'],
  sunset:    ['#7080BC', '#F08A45'],
  dusk:      ['#432E68', '#A34B5C'],
  twilight:  ['#1B2148', '#33305A'],
} as const;

const phase = (time: number, key: keyof typeof C): Point => ({
  time: mod(time),
  top: hex(C[key][0]),
  bottom: hex(C[key][1]),
});

/**
 * Realistic sky gradient.
 * 
 * @param now - Current time (Date or ISO string)
 * @param sunrise - Sunrise time: "2026-10-29T08:08:00.000" or "08:08"
 * @param sunset - Sunset time: "2026-10-29T17:57:00.000" or "17:57"
 */
export function getRealisticSkyGradient(
  now: TimeInput = new Date(),
  sunrise: TimeInput,
  sunset: TimeInput
): string {
  const rise = toMinutesOfDay(sunrise);
  const set = toMinutesOfDay(sunset);
  const current = toMinutesOfDay(now);

  const dayLength = mod(set - rise);
  const nightLength = mod(rise - set);

  const kd = Math.min(1, dayLength / 300);
  const kn = Math.min(1, nightLength / 300);

  const noonMid = mod(rise + dayLength / 2);
  const nightMid = mod(set + nightLength / 2);

  const raw: Point[] = [
    phase(rise,               'sunrise'),
    phase(rise + 80 * kd,     'morning'),
    phase(noonMid,            'noon'),
    phase(set - 80 * kd,      'morning'),
    phase(set,                'sunset'),
    phase(set + 25 * kn,      'dusk'),
    phase(set + 60 * kn,      'twilight'),
    phase(nightMid,           'night'),
    phase(rise - 60 * kn,     'preDawn'),
    phase(rise - 25 * kn,     'dawn'),
  ];

  const points = Array.from(
    new Map(raw.map(p => [Math.round(p.time), p])).values()
  ).sort((a, b) => a.time - b.time);

  if (points.length < 2) {
    const p = points[0] ?? raw[0];
    return `linear-gradient(to bottom, ${css(p.top)}, ${css(p.bottom)})`;
  }

  const loop = [
    ...points.map(p => ({ ...p, time: p.time - 1440 })),
    ...points,
    ...points.map(p => ({ ...p, time: p.time + 1440 })),
  ];

  let a = loop[0];
  let b = loop[loop.length - 1];

  for (let i = 0; i < loop.length - 1; i++) {
    if (current >= loop[i].time && current <= loop[i + 1].time) {
      a = loop[i];
      b = loop[i + 1];
      break;
    }
  }

  const span = b.time - a.time;
  const linear = span > 0 ? (current - a.time) / span : 0;
  const t = linear * linear * (3 - 2 * linear);

  const top = css(mix(a.top, b.top, t));
  const bottom = css(mix(a.bottom, b.bottom, t));

  return `linear-gradient(180deg, ${top} 0%, ${bottom} 100%)`;
}