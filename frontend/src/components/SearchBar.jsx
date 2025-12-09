import { useState } from 'react'
import './SearchBar.css'

// A larger curated list of popular global cities for autocomplete suggestions
const POPULAR_CITIES = [
  'New York',
  'New Delhi',
  'New Orleans',
  'Newcastle',
  'Los Angeles',
  'San Francisco',
  'San Diego',
  'San Jose',
  'Chicago',
  'Houston',
  'Phoenix',
  'Philadelphia',
  'Dallas',
  'Miami',
  'Atlanta',
  'Boston',
  'Seattle',
  'Denver',
  'Austin',
  'London',
  'Manchester',
  'Birmingham',
  'Edinburgh',
  'Paris',
  'Lyon',
  'Marseille',
  'Berlin',
  'Munich',
  'Hamburg',
  'Madrid',
  'Barcelona',
  'Valencia',
  'Rome',
  'Milan',
  'Naples',
  'Lisbon',
  'Amsterdam',
  'Brussels',
  'Vienna',
  'Prague',
  'Budapest',
  'Warsaw',
  'Zurich',
  'Geneva',
  'Stockholm',
  'Copenhagen',
  'Oslo',
  'Helsinki',
  'Tokyo',
  'Osaka',
  'Kyoto',
  'Nagoya',
  'Seoul',
  'Busan',
  'Beijing',
  'Shanghai',
  'Shenzhen',
  'Hong Kong',
  'Singapore',
  'Bangkok',
  'Kuala Lumpur',
  'Jakarta',
  'Manila',
  'Sydney',
  'Melbourne',
  'Brisbane',
  'Perth',
  'Auckland',
  'Toronto',
  'Vancouver',
  'Montreal',
  'Calgary',
  'Ottawa',
  'Mexico City',
  'Guadalajara',
  'Monterrey',
  'Bogota',
  'Lima',
  'Sao Paulo',
  'Rio de Janeiro',
  'Buenos Aires',
  'Santiago',
  'Cape Town',
  'Johannesburg',
  'Nairobi',
  'Cairo',
  'Istanbul',
  'Athens',
  'Dubai',
  'Abu Dhabi',
  'Doha'
]

export default function SearchBar({ onSearch, recentCities = [], onRecentClick }) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)

  const updateSuggestions = (value) => {
    const trimmed = value.trim()

    if (trimmed.length < 2) {
      setSuggestions([])
      setShowSuggestions(false)
      setHighlightedIndex(-1)
      return
    }

    const lower = trimmed.toLowerCase()

    // Prefer prefix matches, then fallback to contains matches
    const prefixMatches = POPULAR_CITIES.filter((city) =>
      city.toLowerCase().startsWith(lower)
    )
    const containsMatches = POPULAR_CITIES.filter(
      (city) =>
        !city.toLowerCase().startsWith(lower) &&
        city.toLowerCase().includes(lower)
    )

    const matches = [...prefixMatches, ...containsMatches].slice(0, 8)

    setSuggestions(matches)
    setShowSuggestions(matches.length > 0)
    setHighlightedIndex(matches.length ? 0 : -1)
  }

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)
    updateSuggestions(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = query.trim()

    if (!trimmed) return

    // If a suggestion is highlighted, prefer that
    const city =
      highlightedIndex >= 0 && highlightedIndex < suggestions.length
        ? suggestions[highlightedIndex]
        : trimmed

    onSearch(city)
    setQuery('')
    setSuggestions([])
    setShowSuggestions(false)
    setHighlightedIndex(-1)
  }

  const handleSuggestionSelect = (city) => {
    setQuery(city)
    onSearch(city)
    setSuggestions([])
    setShowSuggestions(false)
    setHighlightedIndex(-1)
  }

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightedIndex((prev) => {
        const next = prev + 1
        return next >= suggestions.length ? 0 : next
      })
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightedIndex((prev) => {
        const next = prev - 1
        return next < 0 ? suggestions.length - 1 : next
      })
    } else if (e.key === 'Enter') {
      // Let the form submit handler handle the selection
      // so we don't call onSearch twice.
      if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
        e.preventDefault()
        const city = suggestions[highlightedIndex]
        handleSuggestionSelect(city)
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
      setHighlightedIndex(-1)
    }
  }

  const handleRecentClick = (city) => {
    if (!city) return

    if (onRecentClick) {
      onRecentClick(city)
    } else {
      onSearch(city)
    }

    setQuery(city)
    setSuggestions([])
    setShowSuggestions(false)
    setHighlightedIndex(-1)
  }

  return (
    <div className="search-bar-container">
      <form className="search-bar" onSubmit={handleSubmit}>
        <div className="search-input-wrapper">
          <input
            type="text"
            name="city"
            placeholder="Search for a city (e.g. London or Rogers, AR, US)..."
            className="search-input"
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            required
          />
          {showSuggestions && (
            <ul className="search-suggestions">
              {suggestions.map((city, index) => (
                <li
                  key={city}
                  className={`search-suggestion${
                    index === highlightedIndex
                      ? ' search-suggestion--active'
                      : ''
                  }`}
                  // use onMouseDown so click registers before input loses focus
                  onMouseDown={(e) => {
                    e.preventDefault()
                    handleSuggestionSelect(city)
                  }}
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {recentCities.length > 0 && (
        <div className="recent-searches">
          <span className="recent-label">Recent:</span>
          <div className="recent-chips">
            {recentCities.map((city) => (
              <button
                key={city}
                type="button"
                className="recent-chip"
                onClick={() => handleRecentClick(city)}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}

      <p className="search-helper">
        Tip: for similar city names, use more detail like <strong>Rogers, AR, US</strong> or{' '}
        <strong>Rogers, MN, US</strong>.
      </p>
    </div>
  )
}
