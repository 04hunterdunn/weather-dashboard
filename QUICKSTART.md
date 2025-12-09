# Quick Start Guide

## 5-Minute Setup

### 1. Install Dependencies
```bash
cd c:\Users\Hunter Dunn\Desktop\weather-dashboard
npm install
```

### 2. Get Your Free Weather API Key
- Go to: https://openweathermap.org/api
- Click "Sign Up"
- Verify email
- Copy your API key

### 3. Configure Backend
```bash
cd backend
# Edit .env file:
# - Replace API key value
# - Leave other settings as-is
```

**`.env` content:**
```
PORT=5000
OPENWEATHER_API_KEY=your_key_here_12345...
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 4. Run Everything
```bash
cd ..
npm run dev
```

### 5. Open in Browser
Visit: **http://localhost:5173**

## That's It!

Search for any city and see live weather data!

---

## What's Running?

- **Frontend**: http://localhost:5173 (React app)
- **Backend**: http://localhost:5000 (API server)
- **Changes auto-reload** when you edit files

## File Structure Overview

```
weather-dashboard/
├── frontend/          ← React app (what you see)
│   └── src/
│       ├── App.jsx    ← Main component
│       └── components/ ← UI components
├── backend/           ← API server (gets weather data)
│   └── src/
│       ├── server.js  ← Express app
│       └── routes/    ← API endpoints
└── README.md          ← Full documentation
```

## Making Changes

### Edit Frontend UI
- Edit files in `frontend/src/`
- Browser auto-refreshes

### Edit Backend API
- Edit files in `backend/src/`
- Server auto-restarts

### Add New Features
Check `ARCHITECTURE.md` for guidance

## Deployment

### Frontend → Vercel
1. Push to GitHub
2. Connect Vercel
3. Set `VITE_API_URL` env var
4. Deploy

### Backend → Render
1. Push to GitHub
2. Create web service on Render
3. Set environment variables
4. Deploy

## Troubleshooting

**Port in use?**
```powershell
# Windows - change port in .env
PORT=5001
```

**API key not working?**
- Double-check it's copied correctly
- Wait 5 minutes after creating key
- Try a major city name

**Still stuck?**
- Read `SETUP.md` for detailed help
- Check `ARCHITECTURE.md` to understand the code

## Key Files to Explore

1. **Frontend Component** → `frontend/src/App.jsx`
2. **Backend API** → `backend/src/server.js`
3. **Weather Route** → `backend/src/routes/weather.js`
4. **Architecture** → `ARCHITECTURE.md`

Enjoy building! 🌤️
