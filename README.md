# HireJobs Client

The frontend for **HireJobs** — a job marketplace platform where seekers discover and apply to jobs, recruiters post openings and manage company profiles, and admins moderate the platform.

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI library |
| Next.js 16 (App Router) | Framework, SSR, server components |
| Tailwind v4 | Utility-first CSS |
| HeroUI (`@heroui/react`) | UI component library |
| better-auth | Authentication (email/password + Google OAuth) |
| Stripe | Subscription payments |
| ImgBB | Image uploads (company logos) |
| MongoDB (driver v7) | Database access via better-auth adapter |

## Features

- **Authentication** — Email/password signup & login, Google OAuth, role-based access (seeker / recruiter / admin)
- **Job Browsing** — Browse all jobs, filter by type (full-time, part-time, contract, internship) and category (tech, design, marketing), search by keyword
- **Job Applications** — Apply to jobs with resume link and cover letter, plan-based monthly application limits, application tracking dashboard
- **Company Profiles** — Recruiters register and manage companies with logo upload, admin approval workflow
- **Pricing & Subscriptions** — Stripe-powered checkout for Pro/Premium (seeker) and Growth/Enterprise (recruiter) plans
- **Role-Based Dashboards** — Separate dashboard layouts for seekers, recruiters, and admins with role-enforced access

## Getting Started

### Prerequisites

- Node.js 18+
- A running MongoDB instance (local or Atlas)
- A running Express backend (see `hirejobs-server/`)

### Install Dependencies

```bash
cd hirejobs-client
npm install
```

### Environment Variables

Create a `.env` file in `hirejobs-client/`:

| Variable | Description |
|---|---|
| `BETTER_AUTH_SECRET` | Secret key for better-auth session encryption |
| `BETTER_AUTH_URL` | Base URL of this Next.js app (e.g., `http://localhost:3000`) |
| `MONGODB_URI` | MongoDB connection string (used by better-auth) |
| `USER_DB_NAME` | MongoDB database name for user data |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `NEXT_PUBLIC_SERVER_URL` | Express backend URL (default: `http://localhost:7000`) |
| `NEXT_PUBLIC_IMAGE_API` | ImgBB API key for image uploads |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `STRIPE_SECRET_KEY` | Stripe secret key |

### Run Development Server

```bash
npm run dev
```

The app starts at `http://localhost:3000`.

## Project Structure

```
src/
  app/
    auth/               — Login and signup pages
    alljobs/            — Job listing, job detail, and apply pages
    planes/             — Pricing page and Stripe success callback
    dashboard/          — Role-based dashboards (admin, recruiter, seeker)
    api/
      auth/[...all]/    — better-auth catch-all route
      checkout_sessions/ — Stripe checkout session creation
  components/
    Navbar.jsx          — Floating pill-style navigation bar
    Footer.jsx          — Site footer
    Hero.jsx            — Hero search section
    Stats.jsx           — Landing page stats section
    JobCard.jsx         — Individual job card component
    JobsFilter.jsx      — Client-side job filtering panel
    ProfileDropdown.jsx — Avatar dropdown menu
    dashboard/
      DashboardSidebar.jsx  — Role-aware sidebar navigation
      DashboardStats.jsx    — Reusable stat card grid
  lib/
    auth.js             — better-auth server config (MongoDB adapter)
    auth-client.js      — better-auth React client
    stripe.js           — Stripe instance and plan price ID map
    core/
      server.js         — serverFetch / serverMutation (HTTP client to Express)
      session.js        — getUserSession / requireRole (server-side auth helpers)
    api/                — Data-fetching functions (jobs, applications, companies, plans)
    actions/            — Next.js Server Actions (createJob, submitApplication, etc.)
```

## How It Works

### Authentication

`better-auth` handles all auth on the client side. The server config (`lib/auth.js`) connects to MongoDB via `mongodbAdapter` and defines custom user fields: `role` (default: `seeker`) and `plan` (default: `seeker-free`). Dashboard pages are protected by `requireRole()` in each role's layout file — it redirects unauthenticated users to login and wrong-role users to `/unauthorized`.

### Client-Server Communication

The Next.js frontend talks to the Express backend via `serverFetch` and `serverMutation` in `lib/core/server.js`. These are thin wrappers around `fetch()` that prepend `NEXT_PUBLIC_SERVER_URL`. Server Actions in `lib/actions/` use these utilities to create jobs, submit applications, manage companies, and handle subscriptions.

### Stripe Checkout Flow

1. User selects a plan on `/planes` and submits a form to `/api/checkout_sessions`
2. The API route looks up the Stripe price ID from the `PLANE_PRICE_ID` map and creates a Stripe Checkout Session
3. User is redirected to Stripe's hosted checkout page
4. On success, `/planes/success` retrieves the session, extracts the plan ID from metadata, and calls `submitSubscription()` to update the user's plan in the database

### Role-Based Access

Three roles exist: `seeker`, `recruiter`, and `admin`. Each dashboard section has a layout file that calls `requireRole("rolename")` as a server component. The `DashboardSidebar` reads the user's session and renders the appropriate navigation items based on role.
