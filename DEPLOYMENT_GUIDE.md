# Deployment Guide

This guide will help you deploy the GeoSpatial Society website with the backend on Railway and the frontend on Vercel.

## Overview

- **Backend**: Deployed on Railway (https://geospatial-society-production.up.railway.app/)
- **Frontend**: To be deployed on Vercel

## Prerequisites

- Railway account (backend already deployed)
- Vercel account
- GitHub repository with your code

## Step 1: Configure Railway Backend

### Environment Variables

In your Railway project settings, add these environment variables:

```
NODE_ENV=production
PORT=8080
SESSION_SECRET=<your-secure-random-string>
FRONTEND_URL=<your-vercel-url>
ADMIN_USERNAME=<your-admin-username>
ADMIN_PASSWORD=<your-admin-password>
```

**Important Notes:**
- Replace `<your-vercel-url>` with your Vercel deployment URL (e.g., `https://your-site.vercel.app`)
- Replace `<your-secure-random-string>` with a long random string for session security
- Set your admin credentials securely

### Update FRONTEND_URL After Vercel Deployment

After you deploy to Vercel and get your production URL, you MUST update the `FRONTEND_URL` environment variable on Railway:

1. Go to your Railway project
2. Navigate to Variables tab
3. Update `FRONTEND_URL` to your Vercel URL (e.g., `https://geospatial-society.vercel.app`)
4. Railway will automatically redeploy with the new configuration

## Step 2: Deploy Frontend to Vercel

### Option A: Using Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

3. Deploy to Vercel:
   ```bash
   vercel
   ```

4. Follow the prompts to link your project

### Option B: Using Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Environment Variables on Vercel

In your Vercel project settings, add this environment variable:

```
VITE_API_URL=https://geospatial-society-production.up.railway.app
```

**Important**:
- This tells the frontend where to find the backend API
- Make sure there's NO trailing slash

## Step 3: Update Railway with Vercel URL

Once you have your Vercel deployment URL:

1. Go to Railway dashboard
2. Select your backend project
3. Go to Variables tab
4. Update `FRONTEND_URL` with your Vercel URL
5. Example: `FRONTEND_URL=https://geospatial-society.vercel.app`

This allows the backend to accept CORS requests from your frontend.

## Step 4: Verify Deployment

### Test the Frontend

1. Visit your Vercel URL
2. Check that the homepage loads correctly
3. Navigate through different pages

### Test the API Connection

1. Try logging into the admin panel
2. Check if news, events, and other content loads
3. Submit an induction form to test form submissions

### Common Issues and Solutions

#### CORS Errors

**Symptom**: Console shows "blocked by CORS policy" errors

**Solution**:
- Verify `FRONTEND_URL` on Railway matches your exact Vercel URL
- Make sure the URL doesn't have a trailing slash
- Check Railway logs for "CORS blocked request from origin" messages

#### API Requests Failing

**Symptom**: Frontend can't fetch data from backend

**Solution**:
- Verify `VITE_API_URL` on Vercel is set correctly
- Check that it points to `https://geospatial-society-production.up.railway.app`
- Ensure there's no trailing slash

#### Session/Cookie Issues

**Symptom**: Admin login doesn't persist or logs out immediately

**Solution**:
- The backend is configured to use secure cookies in production
- Ensure both Railway and Vercel are using HTTPS
- Check browser console for cookie-related warnings

#### Environment Variables Not Working

**Symptom**: Changes to environment variables don't take effect

**Solution**:
- After updating environment variables on Vercel, redeploy the frontend
- After updating environment variables on Railway, the backend will auto-redeploy
- Clear your browser cache and try again

## Development vs Production

### Local Development

When running locally:
- Frontend: `cd frontend && npm run dev` (runs on http://localhost:5177)
- Backend: `cd backend && npm run dev` (runs on http://localhost:8080)
- The Vite proxy handles API requests automatically

### Production

When deployed:
- Frontend makes direct requests to Railway backend
- CORS headers allow cross-origin requests
- Secure cookies are used for sessions

## Architecture

```
┌─────────────────┐          ┌──────────────────┐
│                 │          │                  │
│  Vercel         │◄────────►│  Railway         │
│  (Frontend)     │   HTTPS  │  (Backend)       │
│                 │          │                  │
│  React + Vite   │          │  Express.js      │
│                 │          │                  │
└─────────────────┘          └──────────────────┘
```

- Frontend on Vercel serves static React app
- Backend on Railway serves API endpoints
- CORS configured to allow Vercel → Railway requests
- Session cookies work across domains with `sameSite: 'none'` and `secure: true`

## Environment Variables Summary

### Railway (Backend)
```
NODE_ENV=production
PORT=8080
SESSION_SECRET=<secure-random-string>
FRONTEND_URL=<your-vercel-url>
ADMIN_USERNAME=<admin-username>
ADMIN_PASSWORD=<admin-password>
```

### Vercel (Frontend)
```
VITE_API_URL=https://geospatial-society-production.up.railway.app
```

## Updating the Application

### Frontend Updates

1. Make changes to the frontend code
2. Commit and push to GitHub
3. Vercel will automatically deploy the changes

Or manually:
```bash
cd frontend
vercel --prod
```

### Backend Updates

1. Make changes to the backend code
2. Commit and push to GitHub
3. Railway will automatically deploy the changes

## Security Checklist

- [ ] `SESSION_SECRET` is a strong random string (at least 32 characters)
- [ ] `ADMIN_PASSWORD` is strong and secure
- [ ] `FRONTEND_URL` is set correctly on Railway
- [ ] `VITE_API_URL` is set correctly on Vercel
- [ ] Both sites are using HTTPS
- [ ] Secure cookies are enabled in production
- [ ] CORS is configured to only allow your frontend domain

## Support

If you encounter issues:

1. Check Railway logs for backend errors
2. Check Vercel deployment logs for build errors
3. Check browser console for frontend errors
4. Verify all environment variables are set correctly
5. Ensure both deployments are using the latest code

## Next Steps

1. ✅ Backend is deployed on Railway
2. ⏳ Deploy frontend to Vercel
3. ⏳ Configure environment variables
4. ⏳ Update Railway with Vercel URL
5. ⏳ Test the application
6. ✅ Your site is live!
