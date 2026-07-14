# MERN Voting App

A secure, government-portal-styled online voting platform. An administrator registers voters and
candidates; voters log in with an admin-issued Voter ID and password to cast a single ballot and
view live results.

Built as a single deployable unit: an Express 5 / MongoDB API that also serves the built React
(Vite) frontend, so the whole app runs as **one process on one Render service**.

## Stack

- **Backend:** Node.js, Express 5, Mongoose 9, JWT (httpOnly cookies), bcryptjs
- **Frontend:** React 19, Vite, React Router, Tailwind CSS 4, axios

## Project layout

```
backend/     Express API (also serves frontend/dist in production)
frontend/    Vite + React app
```

## Local development

Requires Node.js 20+ and a MongoDB connection string (e.g. MongoDB Atlas).

```bash
npm run install:all          # installs both backend and frontend deps
```

Create `backend/.env` from `backend/.env.example` and fill in `MONGODB_URL`, `JWT_SECRET`,
`ADMIN_USERNAME`, and `ADMIN_PASSWORD`. The admin account is created/updated automatically from
those two env vars every time the server starts.

Run both dev servers (in separate terminals):

```bash
npm run dev:backend          # http://localhost:5050 (API)
npm run dev:frontend         # http://localhost:5173 (Vite, proxies /api to the backend)
```

Open `http://localhost:5173` and log in with the admin credentials from your `.env`.

## Production build (what Render runs)

```bash
npm run build   # installs both sub-projects and builds the Vite app into frontend/dist
npm start        # runs the backend, which serves frontend/dist for all non-API routes
```

## Deploying to Render

This repo includes a `render.yaml` Blueprint, so Render can configure everything automatically:

1. Push this repo to GitHub/GitLab.
2. In Render, choose **New + Blueprint** and point it at the repo.
3. Render will detect `render.yaml` and create a single Web Service with:
   - Build Command: `npm run build`
   - Start Command: `npm start`
   - Health check: `/api/health`
4. Fill in the required environment variables when prompted (nothing is committed to the repo):
   - `MONGODB_URL`
   - `JWT_SECRET`
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`

That's it — one service serves both the API and the frontend from the same URL.
