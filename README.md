# ManuelTECH Company Website

A full-stack company website for **ManuelTECH** — intelligent software, AI solutions, automation systems, and robotics.

## Tech Stack

| Layer    | Technology        |
| -------- | ----------------- |
| Frontend | React + Vite + Tailwind CSS |
| Backend  | Node.js (NestJS)  |
| Database | PostgreSQL        |

## Project Structure

```
├── frontend/          # React SPA
├── backend/           # NestJS API
├── docker-compose.yml # PostgreSQL database
└── README.md
```

## Pages

| Route        | Description                                      |
| ------------ | ------------------------------------------------ |
| `/`          | Home — hero, services preview, robotics, portfolio |
| `/services`  | All service categories                           |
| `/about`     | Mission, vision, team, core values               |
| `/products`  | AI products, robotics showcase, full portfolio   |
| `/contact`   | Contact form, consultation booking, map          |

## Getting Started

### 1. Database (pick one)

**Local dev (default):** SQLite — no Docker required. Set `DB_TYPE=sqlite` in `backend/.env` (already configured).

**Production / Docker:** PostgreSQL:

```bash
docker compose up -d
```

Set `DB_TYPE=postgres` in `backend/.env` and match `DB_PASSWORD` to your Postgres user.

### 2. Backend

```bash
cd backend
cp .env.example .env   # if .env doesn't exist
npm install
npm run start:dev
```

API runs at `http://localhost:3000` for local development, and the deployed backend is available at `https://manueltech.onrender.com`.

If login fails with “Cannot reach the API”, ensure only one backend is running on port 3000 (`npm run start:dev` in `backend`).

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Site runs at `http://localhost:5173` for local development, and the deployed frontend is available at `https://manueltechsite.netlify.app`

## API Endpoints

| Method | Endpoint            | Description              |
| ------ | ------------------- | ------------------------ |
| GET    | `/api/health`       | Health check             |
| POST   | `/api/contact`      | Submit contact form      |
| POST   | `/api/consultation` | Book free consultation   |
| POST   | `/api/admin/auth/login` | Admin login (JWT)    |
| GET    | `/api/admin/stats`  | Dashboard stats (auth)   |
| GET    | `/api/admin/contacts` | List contact messages (auth) |
| GET    | `/api/admin/consultations` | List consultations (auth) |

## Admin panel (separate from public site)

The admin area is **not** linked from the public website. Only staff who know the URL can access it.

| URL | Purpose |
| --- | ------- |
| `http://localhost:5173/admin/login` | Sign in |
| `http://localhost:5173/admin` | Dashboard (contact & consultation submissions) |

Default credentials (change in `backend/.env`):

- Email: `admin@manueltech.com`
- Password: `admin123`

Set `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `JWT_SECRET` in production.

## Customization

Update contact details in:

- `frontend/src/components/layout/Footer.tsx`
- `frontend/src/pages/ContactPage.tsx`

Replace placeholder email, phone, WhatsApp, and map location with your real business info.

## Production Build

```bash
# Frontend
cd frontend && npm run build

# Backend
cd backend && npm run build && npm run start:prod
```

Set `VITE_API_BASE_URL` to your production API URL when deploying the frontend separately.
