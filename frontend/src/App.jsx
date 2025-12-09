import { useState, useEffect } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import CurrentWeather from './components/CurrentWeather'
import Forecast from './components/Forecast'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorMessage from './components/ErrorMessage'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const RECENTS_STORAGE_KEY = 'weather-dashboard-recent-cities'

function App() {
  const [city, setCity] = useState('London')
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [recentCities, setRecentCities] = useState([])

  const fetchWeather = async (searchCity) => {
    setLoading(true)
    setError(null)
    try {
      const [weatherRes, forecastRes] = await Promise.all([
        fetch(`${API_BASE_URL}/weather/current?city=${searchCity}`),
        fetch(`${API_BASE_URL}/weather/forecast?city=${searchCity}`)
      ])

      if (!weatherRes.ok || !forecastRes.ok) {
        throw new Error('City not found')
      }

      const weatherData = await weatherRes.json()
      const forecastData = await forecastRes.json()

      setCurrentWeather(weatherData)
      setForecast(forecastData)
      setCity(searchCity)

      const normalized = searchCity.trim()
      if (normalized) {
        setRecentCities((prev) => {
          const withoutDupes = prev.filter(
            (c) => c.toLowerCase() !== normalized.toLowerCase()
          )
          return [normalized, ...withoutDupes].slice(0, 6)
        })
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data')
      setCurrentWeather(null)
      setForecast(null)
    } finally {
      setLoading(false)
    }
  }

  // Load recent cities from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENTS_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          const cleaned = parsed
            .filter((c) => typeof c === 'string')
            .map((c) => c.trim())
            .filter(Boolean)
            .slice(0, 6)
          if (cleaned.length) {
            setRecentCities(cleaned)
          }
        }
      }
    } catch (err) {
      console.error('Failed to load recent cities from storage', err)
    }
  }, [])

  // Persist recent cities to localStorage whenever they change
  useEffect(() => {
    try {
      if (recentCities.length > 0) {
        localStorage.setItem(RECENTS_STORAGE_KEY, JSON.stringify(recentCities))
      } else {
        localStorage.removeItem(RECENTS_STORAGE_KEY)
      }
    } catch (err) {
      console.error('Failed to save recent cities to storage', err)
    }
  }, [recentCities])

  // Fetch initial weather on mount
  useEffect(() => {
    fetchWeather(city)
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌤️ Weather Dashboard</h1>
        <p>Get real-time weather information</p>
      </header>

      <main className="app-main">
        <SearchBar
          onSearch={fetchWeather}
          recentCities={recentCities}
          onRecentClick={fetchWeather}
        />

        {error && <ErrorMessage message={error} />}
        {loading && <LoadingSpinner />}

        {currentWeather && !loading && (
          <>
            <CurrentWeather weather={currentWeather} />
            {forecast && <Forecast forecast={forecast} />}
          </>
        )}

        {!loading && !currentWeather && !error && (
          <div className="welcome-message">
            <p>Search for a city to see its weather</p>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Powered by OpenWeatherMap API</p>
      </footer>
    </div>
  )
}

export default App
