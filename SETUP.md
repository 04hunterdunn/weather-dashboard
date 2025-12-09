# Setup & Installation Guide

## Prerequisites

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)
- **OpenWeatherMap API Key** - [Sign up](https://openweathermap.org/api)

## Step-by-Step Setup

### 1. Clone or Navigate to Project

```bash
cd weather-dashboard
```

### 2. Install Dependencies

Install all dependencies for the monorepo:

```bash
npm install
```

This automatically installs dependencies for both `frontend/` and `backend/` folders.

### 3. Get OpenWeatherMap API Key

1. Go to [OpenWeatherMap API](https://openweathermap.org/api)
2. Click "Sign Up" and create a free account
3. Go to your API keys page
4. Copy the "Current weather data" or default API key

### 4. Setup Backend Environment

1. Navigate to backend folder:
   ```bash
   cd backend
   ```

2. Copy the example env file:
   ```bash
   cp .env.example .env
   ```

3. Edit `.env` file and add your API key:
   ```
   PORT=5000
   OPENWEATHER_API_KEY=your_api_key_here
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

4. Navigate back:
   ```bash
   cd ..
   ```

### 5. Setup Frontend Environment (Optional)

If you want to change the backend URL:

1. Navigate to frontend folder:
   ```bash
   cd frontend
   ```

2. Create `.env.local` file:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

3. Navigate back:
   ```bash
   cd ..
   ```

### 6. Run Development Servers

From the root directory, run both servers simultaneously:

```bash
npm run dev
```

You should see output like:
```
> VITE v7.2.4  dev server running at:
> ➜  Local:   http://localhost:5173/

🌤️  Weather Dashboard Backend running on http://localhost:5000
📡 CORS enabled for: http://localhost:5173
```

### 7. Test the Application

1. Open browser to `http://localhost:5173`
2. You should see the Weather Dashboard
3. Search for a city (e.g., "London")
4. You should see current weather and forecast

## Troubleshooting

### Port Already in Use

If you get "port 5000 already in use" or "port 5173 already in use":

**Windows (PowerShell):**
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID)
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
# Find and kill process
lsof -i :5000
kill -9 <PID>
```

Or change the port in `.env`:
```
PORT=5001
```

### API Key Not Working

1. Check that the API key is correctly copied (no extra spaces)
2. Wait a few minutes after creating the key (may take time to activate)
3. Try a different city name
4. Check your OpenWeatherMap account is active

### Backend not responding

1. Check backend is running: `npm run dev -w backend`
2. Check port 5000 is not blocked by firewall
3. Check .env file has correct API key
4. Check CORS is configured: `FRONTEND_URL=http://localhost:5173`

### Frontend showing "City not found"

1. Check you spelled the city name correctly
2. Try a major city (London, New York, Paris)
3. Check backend console for errors
4. Check network tab in browser dev tools

### Changes not auto-reloading

1. **Frontend**: Vite should auto-reload. Try refreshing browser.
2. **Backend**: Check you have the latest changes. Restart with `Ctrl+C` and `npm run dev -w backend`

## Development Commands

### Individual Development

**Frontend only:**
```bash
npm run dev -w frontend
# or
cd frontend && npm run dev
```

**Backend only:**
```bash
npm run dev -w backend
# or
cd backend && npm run dev
```

### Building for Production

```bash
npm run build
```

This creates:
- `frontend/dist/` - Optimized React bundle
- Backend is ready to run with `npm run start -w backend`

### Linting

Check code quality:
```bash
npm run lint
```

## Project Cleanup

If you accidentally created the `client/` folder and don't need it:

```bash
# From root directory
rmdir /s client  # Windows
# or
rm -rf client    # Mac/Linux
```

## Next Steps

1. **Explore the Code**
   - Open `frontend/src/App.jsx` to see main component
   - Open `backend/src/server.js` to see API setup
   - Read `ARCHITECTURE.md` for detailed explanation

2. **Make Changes**
   - Try modifying component styling
   - Add new weather metrics
   - Experiment with the code!

3. **Deploy**
   - See main `README.md` for deployment instructions
   - Frontend → Vercel
   - Backend → Render

## IDE Setup (VS Code)

Recommended extensions:
- **ES7+ React/Redux/React-Native snippets** (dsznajder.es7-react-js-snippets)
- **Prettier - Code formatter** (esbenp.prettier-vscode)
- **ESLint** (dbaeumer.vscode-eslint)
- **Thunder Client** or **REST Client** (for testing API)

## Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Express.js Guide](https://expressjs.com)
- [OpenWeatherMap API Docs](https://openweathermap.org/api)
- [MDN Web Docs](https://developer.mozilla.org)

## Getting Help

If you encounter issues:

1. Check the error message carefully
2. Look in the troubleshooting section above
3. Check browser console (F12) and network tab
4. Check terminal output for errors
5. Try restarting the development servers
6. Read the ARCHITECTURE.md file for more context
