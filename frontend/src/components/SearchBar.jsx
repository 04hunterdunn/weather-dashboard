import './SearchBar.css'

export default function SearchBar({ onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const city = e.target.city.value.trim()
    if (city) {
      onSearch(city)
      e.target.reset()
    }
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        name="city"
        placeholder="Search for a city..."
        className="search-input"
        required
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  )
}
