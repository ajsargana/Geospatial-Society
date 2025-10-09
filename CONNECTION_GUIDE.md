# Frontend-Backend Connection Guide

## Current Status

### ✅ Development Setup (Local)
**WORKS OUT OF THE BOX**

- Backend runs on `http://localhost:5000`
- Frontend runs on `http://localhost:5173`
- Vite proxy forwards `/api/*` requests to backend
- No configuration needed

### ⚠️ Production Setup (Separate Servers)
**REQUIRES CODE UPDATES**

The current code uses direct `/api/...` paths which works in development but **won't work in production** when deployed on separate servers.

## Solutions

### Option 1: Use the API Helper (Recommended)

I've created `src/lib/api.ts` with helper functions. Update your fetch calls:

**Before:**
```typescript
const response = await fetch("/api/news");
```

**After:**
```typescript
import { apiFetch } from "@/lib/api";
const response = await apiFetch("/api/news");
```

Or manually:
```typescript
import { apiUrl } from "@/lib/api";
const response = await fetch(apiUrl("/api/news"));
```

### Option 2: Global Fetch Wrapper (Quick Fix)

Add this to `src/main.tsx` before ReactDOM.render:

```typescript
// Override global fetch for production
if (import.meta.env.VITE_API_URL) {
  const originalFetch = window.fetch;
  window.fetch = (input, init?) => {
    if (typeof input === 'string' && input.startsWith('/api')) {
      input = `${import.meta.env.VITE_API_URL}${input}`;
      init = { ...init, credentials: 'include' };
    }
    return originalFetch(input, init);
  };
}
```

## Environment Variables

### Development
**Frontend:** No `.env` needed (uses Vite proxy)
**Backend:** Create `.env`:
```env
DATABASE_URL=postgresql://...
SESSION_SECRET=dev-secret
FRONTEND_URL=http://localhost:5173
```

### Production

**Frontend `.env`:**
```env
VITE_API_URL=https://your-backend.railway.app
```

**Backend `.env`:**
```env
DATABASE_URL=postgresql://...
SESSION_SECRET=strong-random-secret
FRONTEND_URL=https://your-frontend.vercel.app
NODE_ENV=production
PORT=5000
```

## Testing the Connection

### 1. Start Backend
```bash
cd backend
npm run dev
```

### 2. Start Frontend (New Terminal)
```bash
cd frontend
npm run dev
```

### 3. Test API
Open browser to `http://localhost:5173` and check the Network tab. API calls to `/api/*` should appear and succeed.

## Checklist Before Production Deployment

- [ ] Update fetch calls to use `apiFetch` helper OR add global fetch wrapper
- [ ] Set `VITE_API_URL` in frontend deployment
- [ ] Set `FRONTEND_URL` in backend deployment
- [ ] Verify CORS is working (check browser console for CORS errors)
- [ ] Test authentication/sessions work across domains
- [ ] Update cookie settings for HTTPS (set `secure: true` in backend session config)

## Current Connection Configuration

### Backend (`backend/server/index.ts`)
✅ CORS enabled for `FRONTEND_URL`
✅ Credentials enabled
✅ Listens on port 5000

### Frontend (`frontend/vite.config.ts`)
✅ Vite proxy configured for development
✅ `VITE_API_URL` available at build time
⚠️ API calls need updating for production
