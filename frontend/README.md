# GeoSociety Frontend

React-based frontend application for the GeoSociety platform.

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: Wouter
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, shadcn/ui
- **Forms**: React Hook Form + Zod
- **State Management**: TanStack Query
- **Rich Text**: Tiptap
- **Charts**: Recharts
- **Animations**: Framer Motion

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

   For **development**: Leave `VITE_API_URL` empty (uses Vite proxy to localhost:5000)

   For **production**: Set `VITE_API_URL` to your deployed backend URL

## Development

1. Make sure the backend is running on `http://localhost:5000`

2. Run the development server:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5173`. API requests to `/api/*` will be proxied to the backend.

## Production Deployment

1. Build for production:
   ```bash
   npm run build
   ```

   The build output will be in the `dist/` directory.

2. Set environment variable:
   ```
   VITE_API_URL=https://your-backend-api.com
   ```

### Deployment Platforms

**Vercel:**
```bash
cd frontend
npm install -g vercel
vercel
# Follow prompts and set VITE_API_URL in environment variables
```

Or connect your repository in Vercel dashboard:
- Root directory: `frontend/`
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `VITE_API_URL=https://your-backend.com`

**Netlify:**
```bash
cd frontend
npm install -g netlify-cli
netlify deploy --prod
```

Or connect in Netlify dashboard:
- Base directory: `frontend/`
- Build command: `npm run build`
- Publish directory: `dist`
- Environment variable: `VITE_API_URL=https://your-backend.com`

**Static Hosting (Nginx/Apache):**

Build the project and upload the `dist/` folder to your server:
```bash
npm run build
# Upload dist/ to your web server
```

Nginx config example:
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/geosociety/dist;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

**GitHub Pages:**

Update `vite.config.ts` base to match your repository name, then:
```bash
npm run build
# Deploy dist/ to gh-pages branch
```

## Project Structure

- `src/` - Application source code
  - `pages/` - Page components
  - `components/` - Reusable components
  - `lib/` - Utilities and helpers
  - `hooks/` - Custom React hooks
- `shared/` - Shared schemas and types (shared with backend)
- `attached_assets/` - Static assets
- `public/` - Public static files

## UI Components

This project uses shadcn/ui components configured via `components.json`. Components are built on Radix UI primitives and styled with Tailwind CSS.
