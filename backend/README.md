# Weather Dashboard Backend

Node.js/Express backend API for the Weather Dashboard application.

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create `.env` file** (copy from `.env.example`)
   ```bash
   cp .env.example .env
   ```

3. **Get API Key**
   - Go to [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate an API key
   - Add it to your `.env` file

4. **Run development server**
   ```bash
   npm run dev
   ```

Server will run on `http://localhost:5000`

## API Endpoints

### GET `/api/weather/current?city=<city_name>`
Get current weather for a city.

**Response:**
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

### GET `/api/weather/forecast?city=<city_name>`
Get 5-day forecast for a city.

**Response:**
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

## Deployment to Render

1. Push to GitHub
2. Connect repository to Render
3. Set environment variables in Render dashboard
4. Deploy!

## Environment Variables

- `PORT` - Server port (default: 5000)
- `OPENWEATHER_API_KEY` - OpenWeatherMap API key (required)
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - Frontend URL for CORS (default: http://localhost:5173)
