# GeoSociety

A full-stack web application for the GeoSociety platform with separated backend and frontend.

## Project Structure

This repository contains two independent applications designed to be deployed on separate servers:

- **`backend/`** - Express.js REST API server
- **`frontend/`** - React + Vite SPA application

Each directory is a standalone project with its own `package.json`, dependencies, and deployment configuration.

## Quick Start (Development)

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run db:push
npm run dev
```

Backend runs on `http://localhost:5000`

### 2. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Leave VITE_API_URL empty for local development
npm run dev
```

Frontend runs on `http://localhost:5173` with API proxy to backend.

## Production Deployment

The backend and frontend are designed to be deployed on **separate servers**.

### Backend Deployment

Deploy to platforms like **Render**, **Railway**, **Fly.io**, or **Heroku**:

1. **Set environment variables**:
   - `DATABASE_URL` - PostgreSQL connection string
   - `SESSION_SECRET` - Random secret key
   - `FRONTEND_URL` - Your deployed frontend URL (for CORS)
   - `PORT` - Server port (provided by platform)
   - `NODE_ENV=production`

2. **Deploy**:
   - Root directory: `backend/`
   - Build: `npm install && npm run build`
   - Start: `npm start`

Example backend URL: `https://geosociety-api.railway.app`

### Frontend Deployment

Deploy to platforms like **Vercel**, **Netlify**, or **GitHub Pages**:

1. **Set environment variable**:
   - `VITE_API_URL` - Your deployed backend URL (e.g., `https://geosociety-api.railway.app`)

2. **Deploy**:
   - Root directory: `frontend/`
   - Build: `npm run build`
   - Output: `dist/`

Example frontend URL: `https://geosociety.vercel.app`

## Environment Variables Summary

### Backend (`backend/.env`)
```env
DATABASE_URL=postgresql://user:password@host:port/database
SESSION_SECRET=random-secret-key-here
FRONTEND_URL=https://your-frontend-domain.com
PORT=5000
NODE_ENV=production
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=https://your-backend-domain.com
```

## Documentation

- **Backend**: See [`backend/README.md`](backend/README.md) for detailed deployment instructions
- **Frontend**: See [`frontend/README.md`](frontend/README.md) for deployment options

## Architecture

```
┌─────────────────┐         API Requests        ┌─────────────────┐
│   Frontend      │ ──────────────────────────> │    Backend      │
│  (Vercel/       │ <────────────────────────── │  (Railway/      │
│   Netlify)      │      JSON Responses         │   Render)       │
└─────────────────┘                             └─────────────────┘
                                                         │
                                                         ├─ PostgreSQL
                                                         └─ File Storage
```

- Frontend: Static SPA served via CDN
- Backend: Node.js API server with database access
- Communication: RESTful API with CORS enabled

## License

MIT
