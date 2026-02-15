import type { NextApiRequest, NextApiResponse } from 'next';

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const DEFAULT_CITY = 'Kyiv';

interface OpenWeatherResponse {
  coord: { lon: number; lat: number };
  weather: { id: number; main: string; description: string; icon: string }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: { speed: number; deg: number; gust?: number };
  clouds: { all: number };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface CacheEntry {
  data: OpenWeatherResponse;
  timestamp: number;
}

const cache = new Map<string, CacheEntry>();

function getCacheKey(q?: string, lat?: string, lon?: string): string {
  if (lat && lon) return `coords:${lat},${lon}`;
  if (q) return `city:${q.toLowerCase().trim()}`;
  return `city:${DEFAULT_CITY.toLowerCase()}`;
}

function getCached(key: string): OpenWeatherResponse | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

function isValidCoordinate(lat: string, lon: string): boolean {
  const latNum = Number(lat);
  const lonNum = Number(lon);
  return (
    !Number.isNaN(latNum) &&
    !Number.isNaN(lonNum) &&
    latNum >= -90 &&
    latNum <= 90 &&
    lonNum >= -180 &&
    lonNum <= 180
  );
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!OPENWEATHER_API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const q = req.query.q as string | undefined;
  const lat = req.query.lat as string | undefined;
  const lon = req.query.lon as string | undefined;

  if (lat && lon && !isValidCoordinate(lat, lon)) {
    return res.status(400).json({ error: 'Invalid coordinates' });
  }

  const cacheKey = getCacheKey(q, lat, lon);
  const cached = getCached(cacheKey);

  if (cached) {
    res.setHeader('Cache-Control', 'public, max-age=300');
    return res.status(200).json(cached);
  }

  let url: string;

  if (lat && lon) {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`;
  } else if (q) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(q)}&units=metric&appid=${OPENWEATHER_API_KEY}`;
  } else {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${DEFAULT_CITY}&units=metric&appid=${OPENWEATHER_API_KEY}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    cache.set(cacheKey, { data, timestamp: Date.now() });

    res.setHeader('Cache-Control', 'public, max-age=300');
    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ error: 'Failed to fetch weather data' });
  }
}
