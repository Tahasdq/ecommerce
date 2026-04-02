# ShopCo Ecommerce Frontend

A modern ecommerce frontend built with Next.js (App Router), TypeScript, Tailwind CSS, and Redux Toolkit.

## Live Demo

- 

## Features

- Customer-facing storefront with product discovery
- Product listing with filter support (category, size, price)
- Product details pages
- Shopping cart with quantity updates
- Checkout flow and payment initiation
- Authentication flow (register, login, email verification)
- Protected user pages
- Admin dashboard for analytics
- Admin product management (create, view, edit, delete)
- Admin order management (status updates)

## Tech Stack

- Next.js 15 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- Redux Toolkit + redux-persist
- React Hook Form + Zod
- Axios
- Radix UI + shadcn/ui-style components

## Project Structure

- `app/` - Routes and layouts (storefront, auth, admin, API proxy)
- `components/` - UI and feature components
- `services/` - API service layer
- `lib/` - shared helpers, constants, and Redux store
- `types/` - shared TypeScript types
- `assets/`, `public/` - static assets

## Getting Started

### 1) Clone and install

```bash
git clone <your-repo-url>
cd ecommerce
npm install
```

### 2) Configure environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_BACKEND_BASE_LOCAL=http://localhost:8000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Notes:

- `NEXT_PUBLIC_BACKEND_BASE_LOCAL` should point to your backend server.
- This frontend proxies API requests through `app/api/[...path]/route.ts`.

### 3) Run the app

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Scripts

```bash
npm run dev    # start dev server (Turbopack)
npm run build  # production build
npm run start  # run production server on port 3000
```

## Deployment

- This project is configured for deployment and can run on platforms like Azure App Service or Vercel.
- A GitHub Actions workflow is included at `.github/workflows/master_ecommerce.yml`.

## Backend Requirement

This repository is frontend-only and expects a compatible ecommerce backend API.

## License

No license is currently specified. Add a `LICENSE` file if you want to make usage terms explicit.
