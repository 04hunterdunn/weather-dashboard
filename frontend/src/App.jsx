import { useState, useEffect } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import CurrentWeather from './components/CurrentWeather'
import Forecast from './components/Forecast'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorMessage from './components/ErrorMessage'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function App() {
  const [city, setCity] = useState('London')
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

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
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data')
      setCurrentWeather(null)
      setForecast(null)
    } finally {
      setLoading(false)
    }
  }

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
        <SearchBar onSearch={fetchWeather} />

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
