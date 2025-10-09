# GeoSociety Backend

Express.js backend API for the GeoSociety application.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (Neon)
- **ORM**: Drizzle ORM
- **Authentication**: Passport.js (Local Strategy)
- **Session**: Express Session
- **File Upload**: Multer
- **WebSocket**: ws

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   Copy `.env.example` to `.env` and configure:
   ```bash
   cp .env.example .env
   ```

   Required variables:
   - `DATABASE_URL` - PostgreSQL connection string
   - `SESSION_SECRET` - Random secret key for sessions
   - `FRONTEND_URL` - Your frontend URL (for CORS)
   - `PORT` - Server port (default: 5000)
   - `HOST` - Server host (default: 0.0.0.0)

3. Push database schema:
   ```bash
   npm run db:push
   ```

## Development

Run the development server:
```bash
npm run dev
```

The server will start on port 5000 by default and accept requests from `http://localhost:5173` (frontend dev server).

## Production Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Set production environment variables:
   - `NODE_ENV=production`
   - `DATABASE_URL` - Production database URL
   - `SESSION_SECRET` - Strong random secret
   - `FRONTEND_URL` - Your deployed frontend URL (e.g., `https://myapp.com`)
   - `PORT` - Server port (often provided by hosting platform)

3. Start the server:
   ```bash
   npm start
   ```

### Deployment Platforms

**Render / Railway / Fly.io:**
- Connect your repository
- Set root directory to `backend/`
- Build command: `npm install && npm run build`
- Start command: `npm start`
- Add environment variables in platform settings

**Heroku:**
```bash
cd backend
git init
heroku create your-app-name
heroku addons:create heroku-postgresql
heroku config:set SESSION_SECRET=your-secret
heroku config:set FRONTEND_URL=https://your-frontend.com
git add .
git commit -m "Deploy backend"
git push heroku main
```

**VPS (Ubuntu/Debian):**
```bash
# Install Node.js 20+
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and setup
git clone <your-repo>
cd backend
npm install
npm run build

# Use PM2 for process management
npm install -g pm2
pm2 start dist/index.js --name geosociety-api
pm2 save
pm2 startup
```

## Project Structure

- `server/` - Express server code
  - `index.ts` - Server entry point
  - `routes.ts` - API routes
  - `storage.ts` - Database logic
  - `upload.ts` - File upload handling
- `shared/` - Shared schemas and types (shared with frontend)
- `migrations/` - Database migrations

## API Endpoints

The API is available at `/api/*` with routes defined in `server/routes.ts`.
