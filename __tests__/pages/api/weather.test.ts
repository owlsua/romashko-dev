describe('weather API handler', () => {
  const originalEnv = process.env;

  const createMockRes = () => {
    const res: any = {
      statusCode: 200,
      headers: {},
      body: undefined,
      status(code: number) {
        this.statusCode = code;
        return this;
      },
      json(payload: unknown) {
        this.body = payload;
        return this;
      },
      setHeader(name: string, value: string) {
        this.headers[name] = value;
      },
    };

    return res;
  };

  const importHandler = async (apiKey?: string) => {
    jest.resetModules();
    process.env = { ...originalEnv };

    if (apiKey) {
      process.env.OPENWEATHER_API_KEY = apiKey;
    } else {
      delete process.env.OPENWEATHER_API_KEY;
    }

    const weatherModule = await import('@/pages/api/weather');
    return weatherModule.default;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (global as any).fetch = jest.fn();
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  test('returns 405 for unsupported method', async () => {
    const handler = await importHandler('test-key');
    const req = { method: 'POST', query: {} } as any;
    const res = createMockRes();

    await handler(req, res);

    expect(res.statusCode).toBe(405);
    expect(res.body).toEqual({ error: 'Method not allowed' });
  });

  test('returns 500 when API key is missing', async () => {
    const handler = await importHandler();
    const req = { method: 'GET', query: {} } as any;
    const res = createMockRes();

    await handler(req, res);

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ error: 'API key not configured' });
  });

  test('returns 400 for invalid coordinates', async () => {
    const handler = await importHandler('test-key');
    const req = {
      method: 'GET',
      query: { lat: '999', lon: '20' },
    } as any;
    const res = createMockRes();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid coordinates' });
  });

  test('returns weather data for city query', async () => {
    const handler = await importHandler('test-key');
    const mockData = {
      weather: [{ description: 'clear sky' }],
      main: { temp: 20, feels_like: 19, humidity: 55 },
      wind: { speed: 3.1 },
      name: 'Kyiv',
      sys: { country: 'UA' },
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const req = {
      method: 'GET',
      query: { q: 'Kyiv' },
    } as any;
    const res = createMockRes();

    await handler(req, res);

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('q=Kyiv'),
    );
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('appid=test-key'),
    );
    expect(res.headers['Cache-Control']).toBe('public, max-age=300');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockData);
  });

  test('returns cached result for repeated request', async () => {
    const handler = await importHandler('test-key');
    const mockData = {
      weather: [{ description: 'mist' }],
      main: { temp: 10, feels_like: 8, humidity: 80 },
      wind: { speed: 1.5 },
      name: 'Lviv',
      sys: { country: 'UA' },
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const req = {
      method: 'GET',
      query: { q: 'Lviv' },
    } as any;

    const resFirst = createMockRes();
    await handler(req, resFirst);

    const resSecond = createMockRes();
    await handler(req, resSecond);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(resSecond.statusCode).toBe(200);
    expect(resSecond.body).toEqual(mockData);
  });
});
