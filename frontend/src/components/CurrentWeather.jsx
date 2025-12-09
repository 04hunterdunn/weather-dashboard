import './CurrentWeather.css'

export default function CurrentWeather({ weather }) {
  const getWeatherEmoji = (icon) => {
    const emojiMap = {
      '01d': '☀️', '01n': '🌙',
      '02d': '⛅', '02n': '☁️',
      '03d': '☁️', '03n': '☁️',
      '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️',
      '10d': '🌧️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️',
      '13d': '❄️', '13n': '❄️',
      '50d': '🌫️', '50n': '🌫️'
    }
    return emojiMap[icon] || '🌤️'
  }

  return (
    <div className="current-weather">
      <div className="weather-header">
        <h2>{weather.city}, {weather.country}</h2>
        <p className="last-updated">
          Last updated: {new Date(weather.timestamp).toLocaleString()}
        </p>
      </div>

      <div className="weather-main">
        <div className="temperature-section">
          <span className="emoji">{getWeatherEmoji(weather.icon)}</span>
          <div className="temp-info">
            <span className="temperature">{Math.round(weather.temperature)}°C</span>
            <span className="feels-like">Feels like {Math.round(weather.feelsLike)}°C</span>
          </div>
        </div>

        <p className="description">{weather.description.toUpperCase()}</p>
      </div>

      <div className="weather-details">
        <div className="detail-card">
          <span className="detail-icon">💧</span>
          <div className="detail-info">
            <p className="detail-label">Humidity</p>
            <p className="detail-value">{weather.humidity}%</p>
          </div>
        </div>

        <div className="detail-card">
          <span className="detail-icon">💨</span>
          <div className="detail-info">
            <p className="detail-label">Wind Speed</p>
            <p className="detail-value">{weather.windSpeed} m/s</p>
          </div>
        </div>

        <div className="detail-card">
          <span className="detail-icon">🔽</span>
          <div className="detail-info">
            <p className="detail-label">Pressure</p>
            <p className="detail-value">{weather.pressure} hPa</p>
          </div>
        </div>

        <div className="detail-card">
          <span className="detail-icon">☁️</span>
          <div className="detail-info">
            <p className="detail-label">Cloudiness</p>
            <p className="detail-value">{weather.cloudiness}%</p>
          </div>
        </div>
      </div>
    </div>
  )
}
