# Weather Dashboard

Full‑stack weather dashboard that lets you search any city, see real‑time
conditions, and view a 5‑day forecast. The React frontend is hosted on
**Vercel** and talks to a custom Node.js/Express backend that wraps the
OpenWeatherMap API.

## Live Demo

- Frontend (Vercel): [https://weather-dashboard-frontend-uvxd.vercel.app/](https://weather-dashboard-frontend-uvxd.vercel.app/)

## Why I Built This

- **Practice full‑stack development** with a real app in a monorepo
  (frontend + backend).
- **Work with third‑party APIs** by integrating OpenWeatherMap and shaping the
  raw responses into a clean, frontend‑friendly contract.
- **Focus on UX**: fast search, autocomplete, recent cities, and clear
  loading/error states so it feels like a polished product.

## Project Structure

```
weather-dashboard/
├── frontend/          # React frontend (Vite) – deployed on Vercel
├── backend/           # Node.js/Express API – can be deployed separately
└── package.json       # Monorepo configuration / root scripts
```

## Features

- **City search with autocomplete**
  - Curated list of global cities with smart suggestions.
  - Keyboard navigation (arrow keys, enter, escape) for quick selection.
  - Tips for disambiguating similar city names (e.g. `Rogers, AR, US`).

- **Recent search history**
  - Recently searched cities rendered as clickable chips.
  - Persisted with `localStorage` so they survive page reloads.

- **Current weather view**
  - City and country, last updated timestamp.
  - Temperature and “feels like” temperature.
  - Humidity, wind speed, pressure, and cloudiness.
  - Simple emoji/icon to visualize the conditions.

- **5‑day forecast**
  - Forecast grouped by day, with several time slots per day.
  - Each slot shows temperature, description, wind speed, and an icon.

- **Unit toggle**
  - Switch between **metric** (°C, m/s) and **imperial** (°F, mph).
  - Changing units automatically refetches the data for the current city.

- **Polished UX**
  - Loading spinner while data is being fetched.
  - Friendly error messaging for invalid cities or API failures.
  - Clean, responsive layout with simple CSS.

## Tech Stack

- **Frontend**
  - React 19
  - Vite
  - CSS3
  - JavaScript (ES6+)

- **Backend**
  - Node.js
  - Express.js
  - Axios (for HTTP calls to OpenWeatherMap)
  - CORS
  - dotenv for environment configuration

- **APIs & Hosting**
  - OpenWeatherMap API for weather and forecast data
  - Vercel for hosting the React frontend
  - (Backend can be hosted on Render, Railway, or any Node‑compatible host)

## API Endpoints (Backend)

The backend exposes a small REST API used by the frontend.

- **Base URL (local)**: `http://localhost:5000/api`
- **Base URL (production)**: configured in the frontend via `VITE_API_URL`.

### `GET /api/weather/current`

Get the current weather for a city.

- **Query parameters:**
  - `city` (string, required) – e.g. `London` or `Rogers, AR, US`.
  - `units` (string, optional) – `metric` or `imperial`.

**Example response:**

```json
{
  "city": "London",
  "country": "GB",
  "temperature": 15.5,
  "feelsLike": 14.8,
  "humidity": 72,
  "pressure": 1013,
  "description": "partly cloudy",
  "icon": "02d",
  "windSpeed": 3.5,
  "cloudiness": 40,
  "timestamp": "2025-12-08T10:30:00.000Z"
}
```

### `GET /api/weather/forecast`

Get a 5‑day forecast for a city, grouped by day.

- **Query parameters:**
  - `city` (string, required)
  - `units` (string, optional) – `metric` or `imperial`

**Example response:**

```json
{
  "city": "London",
  "country": "GB",
  "forecast": {
    "12/8/2025": [
      {
        "time": "10:00:00 AM",
        "temperature": 15.5,
        "description": "partly cloudy",
        "icon": "02d",
        "windSpeed": 3.5
      }
    ]
  }
}
```

## Environment Variables

### Backend (`backend/.env`)

```bash
PORT=5000
OPENWEATHER_API_KEY=your_api_key_here
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend (`frontend/.env` or `.env.local`)

```bash
VITE_API_URL=http://localhost:5000/api
```

## Quick Start (Local)

### 1. Install dependencies

```bash
npm install
```

### 2. Get OpenWeatherMap API key

- Go to `https://openweathermap.org/api`
- Create an account and generate an API key.
- Put the key in `backend/.env` as `OPENWEATHER_API_KEY`.

### 3. Run both servers

From the repo root:

```bash
npm run dev
```

This starts:

- Frontend at `http://localhost:5173`
- Backend at `http://localhost:5000`

## Deployment

### Frontend (Vercel)

1. Push the repo to GitHub.
2. Import the project into Vercel and set the root to `frontend` (if needed).
3. In **Project Settings → Environment Variables**, set:
   - `VITE_API_URL=https://weather-dashboard-backend-jj2b.onrender.com/api`
4. Deploy – Vercel builds the Vite app and serves it from a URL like
   `https://weather-dashboard-frontend-uvxd.vercel.app/`.

### Backend (Render)

The backend for this project is hosted on **Render** at:

- `https://weather-dashboard-backend-jj2b.onrender.com/`  
- API base URL: `https://weather-dashboard-backend-jj2b.onrender.com/api`

To deploy or recreate it:

1. Push the repo to GitHub.
2. Create a new **Web Service** on Render from the `backend` directory.
3. Set environment variables: `PORT`, `OPENWEATHER_API_KEY`, `NODE_ENV`,
   `FRONTEND_URL`.
4. Deploy, then ensure `VITE_API_URL` (locally and on Vercel) points to
   `https://weather-dashboard-backend-jj2b.onrender.com/api`.

## How It Works

1. User types a city name in the search bar (with autocomplete and recent
   suggestions).
2. Frontend calls the backend `/api/weather/current` and
   `/api/weather/forecast` endpoints.
3. Backend fetches data from OpenWeatherMap, normalizes it, and returns clean
   JSON.
4. Frontend displays the current conditions and forecast, and lets the user
   toggle units.

## Contributing

Feel free to fork this repo, open issues, or submit pull requests.
