# Weather Dashboard - Architecture Guide

## Overview

This is a **monorepo** containing a weather dashboard application with a React frontend and Node.js/Express backend.

## Project Structure

```
weather-dashboard/
├── frontend/                    # React application (Vite)
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   │   ├── SearchBar.jsx   # City search input
│   │   │   ├── CurrentWeather.jsx  # Displays current conditions
│   │   │   ├── Forecast.jsx    # Shows 5-day forecast
│   │   │   ├── LoadingSpinner.jsx  # Loading indicator
│   │   │   └── ErrorMessage.jsx    # Error display
│   │   ├── App.jsx             # Main app component
│   │   ├── App.css             # App styling
│   │   ├── index.css           # Global styles
│   │   └── main.jsx            # React entry point
│   ├── vite.config.js          # Vite configuration
│   ├── package.json            # Frontend dependencies
│   └── .env.example            # Environment template
│
├── backend/                     # Node.js/Express API
│   ├── src/
│   │   ├── routes/
│   │   │   └── weather.js      # Weather API endpoints
│   │   └── server.js           # Express server setup
│   ├── package.json            # Backend dependencies
│   ├── eslint.config.js        # Linting rules
│   ├── .env.example            # Environment template
│   └── README.md               # Backend documentation
│
├── package.json                # Monorepo root
├── README.md                   # Main documentation
└── .gitignore                  # Git ignore rules
```

## How It Works

### Frontend Flow

```
User Interface (React)
    ↓
SearchBar Component
    ↓
Makes HTTP GET request
    ↓
/api/weather/current?city=London
    ↓
Backend API
    ↓
Returns JSON data
    ↓
CurrentWeather Component displays it
    ↓
Forecast Component displays forecast
```

### Component Breakdown

1. **SearchBar.jsx**
   - Handles user input for city name
   - Submits form to trigger weather fetch
   - Clears input after submission

2. **CurrentWeather.jsx**
   - Displays current temperature
   - Shows "feels like" temperature
   - Displays weather icon/emoji
   - Shows humidity, wind speed, pressure, cloudiness
   - Shows last update timestamp

3. **Forecast.jsx**
   - Groups forecast data by day
   - Shows hourly forecasts for each day
   - Displays temperature, conditions, and wind speed
   - Shows weather icons

4. **LoadingSpinner.jsx**
   - Spinning animation while fetching
   - Shows "Loading weather data..." message

5. **ErrorMessage.jsx**
   - Displays error alerts
   - Shows when city not found or API fails

### Backend Flow

```
HTTP Request
    ↓
Express Router (/api/weather)
    ↓
Weather Route Handler
    ↓
Extract city from query params
    ↓
Call OpenWeatherMap API
    ↓
Format response data
    ↓
Return JSON to frontend
```

### API Endpoints

**Current Weather**
```
GET /api/weather/current?city=London

Response:
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

**Forecast**
```
GET /api/weather/forecast?city=London

Response:
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
      },
      ...
    ],
    ...
  }
}
```

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     USER INTERFACE                          │
│          SearchBar → Enter "London" → Submit                │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP GET Request
                       ↓
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND (Node.js)                        │
│  /api/weather/current?city=London                           │
│  - Receives city parameter                                  │
│  - Validates input                                          │
│  - Calls OpenWeatherMap API                                 │
│  - Formats response                                         │
└──────────────────────┬──────────────────────────────────────┘
                       │ JSON Response
                       ↓
┌─────────────────────────────────────────────────────────────┐
│                   FRONTEND (React)                          │
│  - App.jsx receives data                                    │
│  - Updates state (currentWeather)                           │
│  - Passes to CurrentWeather component                       │
│  - Passes to Forecast component                             │
│  - Components render with data                              │
└─────────────────────────────────────────────────────────────┘
                       │
                       ↓
              ┌────────────────┐
              │ User sees:     │
              │ - Temperature  │
              │ - Humidity     │
              │ - Wind Speed   │
              │ - Forecast     │
              └────────────────┘
```

## Key Technologies Explained

### Frontend
- **React**: Component-based UI framework
  - Components manage their own state and props
  - Reusable building blocks for the UI

- **Vite**: Fast build tool and dev server
  - Hot Module Replacement (HMR) for instant updates
  - Optimized builds for production

- **Fetch API**: Built-in browser API for HTTP requests
  - Fetches data from backend
  - No external dependencies needed

### Backend
- **Express.js**: Minimalist web framework
  - Simple routing system
  - Middleware for CORS, JSON parsing
  - Error handling

- **Axios**: HTTP client library
  - Makes requests to OpenWeatherMap API
  - Handles errors gracefully

- **CORS**: Cross-Origin Resource Sharing
  - Allows frontend (different origin) to call backend
  - Configured to allow localhost:5173

### External API
- **OpenWeatherMap**: Weather data provider
  - Real-time weather information
  - 5-day forecasts
  - Multiple data points (temperature, humidity, etc.)

## Environment Variables

**Backend (.env)**
```
PORT=5000
OPENWEATHER_API_KEY=your_key_here
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Frontend (.env.local)**
```
VITE_API_URL=http://localhost:5000/api
```

## Development Workflow

1. **Start Development Servers**
   ```bash
   npm run dev
   ```
   - Starts React dev server on `http://localhost:5173`
   - Starts Node.js server on `http://localhost:5000`
   - Changes auto-reload due to HMR

2. **Make Changes**
   - Edit React components → Auto-reload in browser
   - Edit backend routes → Auto-reload server

3. **Test Endpoints**
   - Use browser dev tools to inspect network requests
   - Or use tools like Postman/curl to test API

4. **Build for Production**
   ```bash
   npm run build
   ```
   - Creates optimized bundle for frontend
   - Ready for Vercel deployment

## Deployment

### Frontend → Vercel
1. Connect GitHub repository
2. Set `VITE_API_URL` to production backend URL
3. Auto-deploys on push

### Backend → Render
1. Create Web Service on Render
2. Set environment variables
3. Connect GitHub repository
4. Auto-deploys on push

## Common Patterns Used

### State Management
```javascript
const [currentWeather, setCurrentWeather] = useState(null)
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)
```

### Data Fetching
```javascript
const fetchWeather = async (city) => {
  try {
    const response = await fetch(`${API_URL}/weather/current?city=${city}`)
    const data = await response.json()
    setCurrentWeather(data)
  } catch (err) {
    setError(err.message)
  }
}
```

### Conditional Rendering
```javascript
{loading && <LoadingSpinner />}
{error && <ErrorMessage message={error} />}
{currentWeather && <CurrentWeather weather={currentWeather} />}
```

## Styling Approach

- **CSS Modules Style**: Each component has its own CSS file
- **Responsive Design**: Mobile-first approach
- **Gradients**: Beautiful linear gradients for modern look
- **Flexbox/Grid**: Modern layout techniques

## Performance Considerations

1. **Frontend**
   - React.lazy() for code splitting (optional)
   - Memoization to prevent unnecessary re-renders
   - Optimized images/icons

2. **Backend**
   - Caching API responses (optional)
   - Error handling and validation
   - Environment-based configuration

## Security Notes

1. **API Key**: Never commit `.env` files - use `.env.example`
2. **CORS**: Configured to only accept requests from frontend
3. **Input Validation**: Backend validates city parameter
4. **Error Messages**: Production hides sensitive info

## Next Steps / Enhancements

1. Add more weather metrics (UV index, air quality)
2. Add location-based weather (geolocation)
3. Add weather alerts/notifications
4. Add favorites/saved cities
5. Add animations and transitions
6. Add unit conversion (Celsius/Fahrenheit)
7. Add dark mode
8. Add weather charts/graphs
9. Add historical data
10. Add multi-language support
