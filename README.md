# Subhash Chandra Yadav Portfolio

A premium, database-backed civil engineering portfolio built with Next.js App Router, TypeScript, Tailwind CSS, Prisma, and PostgreSQL. It includes a protected content management dashboard at `/admin`.

## Features

- Responsive public portfolio with photo, CV content, expertise, projects, experience, education, services, and contact details
- Secure admin login through Supabase Auth with signed, HTTP-only session cookies
- Admin CRUD for profile, projects, skills, services, experience, and education
- Photo and CV replacement from the dashboard
- PostgreSQL content storage through Prisma
- Seed data extracted from the CV in `public/subhash-chandra-yadav-cv.html`

## 1. Install

Use Node.js 20 or newer.

```bash
npm install
```

## 2. Configure PostgreSQL and Supabase Auth

Create a PostgreSQL database locally, or create a Supabase project and copy its PostgreSQL connection string. For admin login, create or use the same Supabase project for Auth. Copy `.env.example` to `.env` and update the values:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/subhash_portfolio?schema=public"
AUTH_SECRET="a-long-random-secret-of-at-least-32-characters"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"
SUPABASE_STORAGE_BUCKET="portfolio-assets"
```

Generate an `AUTH_SECRET` with:

```bash
openssl rand -base64 32
```

On Windows without OpenSSL, use a password manager to generate a 32+ character random value.

## 3. Create Database Tables

```bash
npx prisma generate
npx prisma migrate dev
```

The initial migration is already included under `prisma/migrations`.

## 4. Seed CV Content

The seed command adds the CV-derived profile, roles, degree, certification, skills, services, and starter project entries.

```bash
npm run prisma:seed
```

## 5. Create Admin Login

Create the admin in Supabase Auth from the Supabase dashboard, or use the helper script. The script uses `ADMIN_EMAIL` and `ADMIN_PASSWORD` from `.env` only to create or reset the Supabase Auth user:

```bash
npm run admin:create
```

## 6. Run Locally

```bash
npm run dev
```

Open:

- Portfolio: `http://localhost:3000`
- Admin login: `http://localhost:3000/admin/login`

For a production check:

```bash
npm run build
npm start
```

## Project Structure

```text
app/                 Public and admin App Router pages
components/          Reusable public and admin UI
lib/                 Prisma, authentication, and content helpers
prisma/              Schema, migration, and CV-based seed
public/              Portrait, CV, and local uploads
scripts/             Admin creation utility
```

## Deployment Notes

- Use Supabase, Neon, Railway, or another managed PostgreSQL provider for `DATABASE_URL`.
- Local admin uploads are saved to `public/uploads`. This works on a persistent Node server. For Vercel or another serverless host, replace `uploadAsset` in `app/admin/actions.ts` with Supabase Storage or S3 because serverless filesystems are not persistent.
- Never commit `.env` or real admin credentials.
- The public site falls back to the CV seed content if the database is temporarily unavailable. The admin requires a working database.

## Content Note

The source CV does not list named construction projects. The seeded project cards are therefore labeled as representative work based on documented responsibilities. Replace them with project names, photos, scopes, and outcomes from the admin dashboard when available.
