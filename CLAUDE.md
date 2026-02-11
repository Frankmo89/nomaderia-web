# CLAUDE.md - Nomaderia Web

## Project Overview

Nomaderia ("Tu Arquitecto de Aventuras") is a Spanish-language adventure travel planning web application. It provides trip planning tools, a smart quoter/calculator, lead capture, admin dashboard, blog, and integrations with Calendly, Stripe, and Mailchimp. The backend is Supabase (Postgres).

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build:** Vite 7 with SWC (via `@vitejs/plugin-react-swc`)
- **Styling:** Tailwind CSS 3.4 with CSS custom properties for theming
- **UI Components:** shadcn/ui (43 components built on Radix UI primitives)
- **Forms:** React Hook Form + Zod validation
- **Routing:** React Router v6 with lazy-loaded routes
- **Backend:** Supabase (auth, database, real-time)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Package Manager:** pnpm 10.29.2 (enforced via `packageManager` field)
- **Deployment:** Vercel (SPA rewrites configured)

## Quick Reference Commands

```bash
pnpm install          # Install dependencies
pnpm dev              # Start dev server (Vite)
pnpm build            # TypeScript check + Vite production build
pnpm lint             # ESLint (zero warnings allowed: --max-warnings 0)
pnpm preview          # Preview production build locally
pnpm test:db          # Test Supabase database connection
pnpm types:supabase   # Regenerate Supabase TypeScript types
```

## Project Structure

```
src/
├── main.tsx                  # Entry point (BrowserRouter wraps App)
├── App.tsx                   # Route definitions with React.lazy()
├── index.css                 # Global styles (Tailwind directives + custom CSS vars)
├── components/
│   ├── ui/                   # shadcn/ui primitives (button, card, dialog, etc.)
│   ├── landing/              # Landing page sections (Hero, Expeditions, FAQ, etc.)
│   ├── admin/                # Admin dashboard components (Leads, Itineraries, Resources)
│   ├── AdventureForm.tsx     # Multi-step trip planning form (large, ~53KB)
│   ├── SmartQuoter.tsx       # Trip cost calculator
│   ├── Navigation.tsx        # Nav bar
│   ├── Footer.tsx            # Footer
│   ├── BlogPost.tsx          # Blog post renderer (markdown)
│   ├── TravelBlog.tsx        # Blog listing
│   ├── AdminLogin.tsx        # Admin auth (localStorage token)
│   └── AdminDashboard.tsx    # Admin panel shell
├── pages/
│   └── LandingPage.tsx       # Main landing page (composes landing/ components)
├── lib/
│   ├── supabase.ts           # Supabase client init (falls back to mock if no env vars)
│   ├── submitLead.ts         # Lead submission with input validation & sanitization
│   ├── utils.ts              # cn() helper (clsx + tailwind-merge)
│   ├── logger.ts             # Dev-only logging utility
│   └── performance.ts        # Debounce, throttle, viewport detection utilities
├── hooks/
│   ├── index.ts              # Barrel export
│   └── useTracking.ts        # Event tracking hook (page views, interactions)
├── types/
│   └── supabase.ts           # Supabase schema types (auto-generated + manual)
├── data/
│   ├── blogPosts.ts          # Blog metadata
│   ├── blogContent.ts        # Blog article content
│   └── landing/              # Landing page static data (expeditions, testimonials, FAQs)
├── articles/                 # Markdown blog articles (Spanish)
└── scripts/                  # Utility scripts (DB test, image conversion)
```

## Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `LandingPage` | Main landing page |
| `/old-home` | `Home` | Legacy home page |
| `/servicios` | `ServiciosPage` | Services page |
| `/admin` | `AdminPage` | Admin dashboard (auth-guarded via localStorage) |
| `/blog/:slug` | `BlogPost` | Individual blog post |

All routes use `React.lazy()` with a `<Suspense>` fallback for code splitting.

## Architecture & Patterns

### Path Alias
All imports use `@/` mapped to `./src/` (configured in both `tsconfig.json` and `vite.config.ts`).

### State Management
- React hooks only (useState, useContext, useCallback, useEffect). No external state library.
- `localStorage` for admin auth token (`nomaderia_admin_token`).
- `sessionStorage` for tracking session IDs.

### Supabase Client
- Defined in `src/lib/supabase.ts`.
- Uses `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` env vars.
- Falls back to a mock client returning empty data when credentials are missing, so the app runs without a Supabase instance.

### Forms & Validation
- React Hook Form for form state, Zod for schema validation.
- Lead submission (`src/lib/submitLead.ts`) includes server-side-style sanitization: regex validation for email/phone/name, max-length enforcement, UTM parameter capture.

### Tracking
- `useTracking` hook (`src/hooks/useTracking.ts`) logs events to the `interactions` Supabase table.
- Automatically tracks page views on mount. Captures device type, referrer, UTM params.

### Component Library
- 43 shadcn/ui components in `src/components/ui/`. These are Radix UI primitives styled with Tailwind.
- Use `cn()` from `src/lib/utils.ts` to merge class names.

### Code Splitting
Manual Vite chunks in `vite.config.ts`:
- `react-vendor`: react, react-dom, react-router-dom
- `ui-vendor`: framer-motion, lucide-react
- `form-vendor`: react-hook-form, @hookform/resolvers, zod

## Environment Variables

All client-exposed variables use the `VITE_` prefix and are accessed via `import.meta.env`. See `.env.example` for the full list:

| Variable | Required | Purpose |
|----------|----------|---------|
| `VITE_SUPABASE_URL` | No* | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | No* | Supabase anonymous key |
| `VITE_CALENDLY_URL` | No | Calendly booking link |
| `VITE_MAILCHIMP_FORM_URL` | No | Mailchimp subscribe endpoint |
| `VITE_STRIPE_PAYMENT_LINK` | No | Stripe payment link |

*App runs with mock data if Supabase vars are missing.

## TypeScript Configuration

- **Strict mode:** OFF (`"strict": false` in tsconfig.json)
- **Target:** ES2020
- **noEmitOnError:** false (build continues despite type errors)
- The `tsc` step in the build script runs as a check but does not block Vite bundling.

## Linting Rules

ESLint 9 flat config (`eslint.config.js`):
- `react-hooks/rules-of-hooks`: **error**
- `react-hooks/exhaustive-deps`: warn
- `@typescript-eslint/no-explicit-any`: warn
- `@typescript-eslint/no-unused-vars`: warn (underscore-prefixed vars ignored)
- `no-console`: warn (except `console.warn` and `console.error`)
- `react-refresh/only-export-components`: warn
- Build enforces zero warnings: `--max-warnings 0`

## Styling Conventions

### Tailwind Theme
Custom brand colors are defined in `tailwind.config.js`:
- `ocean-blue` (#0A2540), `forest-green` (#2D5F3F), `burnt-orange` (#E8744F)
- `neutral-base` (#F8F6F3), `neutral-dark` (#2C3E50)

Custom font families:
- `font-display`: Fraunces (serif, for display text)
- `font-heading`: Space Grotesk (sans-serif, for headings)
- `font-mono`: JetBrains Mono

shadcn/ui semantic tokens (CSS variables): `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`, etc.

### Dark Mode
Configured as class-based (`darkMode: ["class"]`) but not actively used in the current UI.

## Database Schema (Supabase)

Key tables: `articles`, `leads`, `destinations`, `interactions`, `chat_sessions`, `chat_messages`, `newsletter_subscribers`.

Migrations are in `supabase/migrations/`. Seed data in `supabase/seed_smart_travel.sql` (US national parks destinations).

## Language

The application UI and most documentation are in **Spanish**. Code identifiers (variable names, function names) are in English. Comments mix Spanish and English.

## Common Tasks for AI Assistants

### Adding a new page
1. Create component in `src/components/` or `src/pages/`.
2. Add a lazy import and `<Route>` in `src/App.tsx`.
3. Use the `@/` import alias for all internal imports.

### Adding a new UI component
Use shadcn/ui conventions: place in `src/components/ui/`, export with `cn()` for className merging, follow Radix UI patterns.

### Modifying the landing page
Sections are in `src/components/landing/`. Static data (expeditions, testimonials, FAQs) lives in `src/data/landing/`.

### Working with forms
Use React Hook Form + Zod. Follow the validation/sanitization patterns in `src/lib/submitLead.ts`.

### Adding a blog article
Add a markdown file in `src/articles/`, register metadata in `src/data/blogPosts.ts` and content in `src/data/blogContent.ts`.

### Before submitting changes
1. Run `pnpm lint` and fix all warnings (zero-warning policy).
2. Run `pnpm build` to verify TypeScript compilation and Vite bundling succeed.
