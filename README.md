# Weather Dashboard

A full-stack weather dashboard application built with React, Node.js/Express, and deployed to Vercel and Render.

## Project Structure

```
weather-dashboard/
├── frontend/          # React frontend (Vite)
├── backend/           # Node.js/Express API
└── package.json       # Monorepo configuration
```

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables

**Backend (.env)**
```
PORT=5000
OPENWEATHER_API_KEY=your_api_key_here
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Frontend (.env.local)**
```
VITE_API_URL=http://localhost:5000/api
```

### 3. Get OpenWeatherMap API Key
- Visit [OpenWeatherMap](https://openweathermap.org/api)
- Sign up for a free account
- Generate an API key
- Add it to your `.env` file

### 4. Run Development Server
```bash
npm run dev
```

This will start both frontend (http://localhost:5173) and backend (http://localhost:5000) simultaneously.

## Features

- 🌤️ Real-time weather information
- 🌍 Search for any city worldwide
- 📊 5-day weather forecast
- 🎨 Beautiful, responsive UI
- ⚡ Fast performance with Vite
- 📱 Mobile-friendly design

## Tech Stack

### Frontend
- React 19
- Vite
- CSS3
- JavaScript ES6+

### Backend
- Node.js
- Express.js
- Axios
- CORS enabled

### APIs
- OpenWeatherMap API

## Deployment

### Frontend (Vercel)
1. Push to GitHub
2. Connect repository to Vercel
3. Set `VITE_API_URL` environment variable
4. Deploy!

### Backend (Render)
1. Push to GitHub
2. Create new Web Service on Render
3. Set environment variables (PORT, OPENWEATHER_API_KEY, etc.)
4. Deploy!

## Development

### Available Scripts

**Root Level:**
- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build both frontend and backend
- `npm run lint` - Run linters on both projects

**Frontend:**
- `npm run dev -w frontend` - Start frontend dev server
- `npm run build -w frontend` - Build for production

**Backend:**
- `npm run dev -w backend` - Start backend with hot reload
- `npm run start -w backend` - Start backend (production)

## How It Works

1. User enters a city name in the search bar
2. Frontend sends request to backend API
3. Backend calls OpenWeatherMap API
4. Backend returns formatted weather data
5. Frontend displays current weather and forecast

## Contributing

Feel free to fork and submit pull requests!

## License

MIT
