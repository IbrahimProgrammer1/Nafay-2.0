## Overview

LUXE is a premium laptop storefront built with Next.js App Router, TypeScript, and Tailwind CSS. The app is being migrated from browser-only storage to Supabase for persistent product, wishlist, comparison, and inquiry data. This document explains how to get the project running locally as well as how to wire up Supabase.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the site.

## Environment Variables

Copy `env.example` to `.env.local` and fill in your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL="https://your-project-ref.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="public-anon-key"
SUPABASE_SERVICE_ROLE_KEY="service-role-key"
```

- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: anonymous key used by the browser client (read-only + limited writes).
- `SUPABASE_SERVICE_ROLE_KEY`: service key used **only** inside server actions/API routes for privileged operations.

Never expose the service role key to the browser bundle.

## Supabase Setup Checklist

1. Create a Supabase project.
2. Apply the SQL migrations under `/supabase/migrations` (coming soon) to create tables for products, wishlists, comparisons, recently viewed items, inquiries, and admin accounts.
3. Configure Row Level Security policies following the guidelines in `/docs/supabase.md` (coming soon).
4. Enable storage buckets for product imagery if you plan to offload assets from `public/images`.
5. Update the environment variables locally (`.env.local`) and in your hosting provider dashboard (Vercel/Netlify/etc.).
6. The middleware now issues an HttpOnly `device_id` cookie. If you migrate existing localStorage data, build an export step that POSTs the data to Supabase using the `/api/device` endpoint to associate it with the issued ID.

## Scripts

| Command        | Description                         |
| -------------- | ----------------------------------- |
| `npm run dev`  | Run the Next.js development server. |
| `npm run build`| Create an optimized production build.|
| `npm start`    | Run the production server.          |

## Deployment Notes

- Set all Supabase environment variables in your deployment provider before building.
- For production, ensure HTTPS is enabled so the HttpOnly `device_id` cookie cannot be intercepted.
- Supabase backups and monitoring should be configured from the Supabase dashboard.

## Contributing

1. Fork the repo and create a feature branch.
2. Run `npm run lint` and confirm there are no TypeScript errors.
3. Open a PR describing the changes and any Supabase migrations that were added.
