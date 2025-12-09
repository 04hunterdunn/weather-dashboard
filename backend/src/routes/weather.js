import express from 'express';
import axios from 'axios';

const router = express.Router();
const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * GET /api/weather/current
 * Get current weather for a city
 * Query params: city (required)
 */
router.get('/current', async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }

    if (!API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric' // Use Celsius
      }
    });

    res.json({
      city: response.data.name,
      country: response.data.sys.country,
      temperature: response.data.main.temp,
      feelsLike: response.data.main.feels_like,
      humidity: response.data.main.humidity,
      pressure: response.data.main.pressure,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      windSpeed: response.data.wind.speed,
      cloudiness: response.data.clouds.all,
      timestamp: new Date(response.data.dt * 1000).toISOString()
    });
  } catch (error) {
    if (error.response?.status === 404) {
      res.status(404).json({ error: 'City not found' });
    } else if (error.response?.status === 401) {
      res.status(401).json({ error: 'Invalid API key' });
    } else {
      console.error('Weather API error:', error.message);
      res.status(500).json({ error: 'Failed to fetch weather data' });
    }
  }
});

/**
 * GET /api/weather/forecast
 * Get 5-day forecast for a city
 * Query params: city (required)
 */
router.get('/forecast', async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }

    if (!API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });

    // Group forecast by day
    const forecastByDay = {};
    response.data.list.forEach(item => {
      const day = new Date(item.dt * 1000).toLocaleDateString();
      if (!forecastByDay[day]) {
        forecastByDay[day] = [];
      }
      forecastByDay[day].push({
        time: new Date(item.dt * 1000).toLocaleTimeString(),
        temperature: item.main.temp,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        windSpeed: item.wind.speed
      });
    });

    res.json({
      city: response.data.city.name,
      country: response.data.city.country,
      forecast: forecastByDay
    });
  } catch (error) {
    if (error.response?.status === 404) {
      res.status(404).json({ error: 'City not found' });
    } else {
      console.error('Forecast API error:', error.message);
      res.status(500).json({ error: 'Failed to fetch forecast data' });
    }
  }
});

export default router;
