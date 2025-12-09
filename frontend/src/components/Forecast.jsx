import './Forecast.css'

export default function Forecast({ forecast }) {
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
    <div className="forecast">
      <h3>5-Day Forecast</h3>
      <div className="forecast-days">
        {Object.entries(forecast.forecast).map(([day, hourlyData]) => (
          <div key={day} className="forecast-day">
            <h4>{day}</h4>
            <div className="forecast-hours">
              {hourlyData.slice(0, 4).map((hour, idx) => (
                <div key={idx} className="forecast-hour">
                  <p className="hour-time">{hour.time}</p>
                  <span className="hour-emoji">{getWeatherEmoji(hour.icon)}</span>
                  <p className="hour-temp">{Math.round(hour.temperature)}°C</p>
                  <p className="hour-desc">{hour.description}</p>
                  <p className="hour-wind">💨 {hour.windSpeed} m/s</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
