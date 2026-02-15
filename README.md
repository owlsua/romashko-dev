
# [ROMASHKO.dev](https://romashko.dev)

My personal terminal style website

<img width="800" alt="Screenshot 2023-03-21 at 11 20 26" src="https://user-images.githubusercontent.com/69318224/226577760-d4f5dbbe-c365-4e20-b5c2-f9aa0ade8c0f.png">

## Running Locally

Clone the project

```bash
git clone https://github.com/owlsua/romashko-dev.git
```

Go to the project directory

```bash
cd romashko-dev
```

Install dependencies

```bash
npm install
```

Setup environment variables

```bash
cp .env.example .env.local
```

Update values in `.env.local`.

- Public variables (`NEXT_PUBLIC_*`) are used by UI content and external links.
- `OPENWEATHER_API_KEY` is server-side only and is used by the weather API route.


Start the server

```bash
npm run dev
```

## Weather API route

The project includes a server-side proxy endpoint: `/api/weather`.

- Supports city query: `/api/weather?q=Kyiv`
- Supports coordinates query: `/api/weather?lat=50.45&lon=30.52`
- Validates coordinates and request method
- Uses in-memory caching for 5 minutes
- Keeps `OPENWEATHER_API_KEY` hidden from the browser

## Scripts

```bash
npm run dev       # run app locally
npm run test:ci   # run tests once
npm run lint      # run eslint
npm run build     # production build
```

## Contributing
Please feel free to pull requests or log issues.

Thanks!
