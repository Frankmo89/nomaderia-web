# Test Coverage Analysis - Nomadería Web

## Current State

**Test coverage: 0%.** The project has no testing framework installed and no test files.

### What exists today

| Quality tool | Status |
|---|---|
| Unit/integration tests | None |
| Component tests | None |
| E2E tests | None |
| TypeScript type checking | `tsc` (strict mode disabled) |
| ESLint linting | Configured |
| Storybook stories | 39 stories (visual docs, not automated) |
| DB connectivity script | `npm run test:db` (manual, not CI-ready) |

---

## Recommended Testing Stack

Given the project uses **Vite + React + TypeScript**, the natural fit is:

- **Vitest** - Unit and integration test runner (native Vite integration, same config)
- **React Testing Library** - Component testing (user-centric, lightweight)
- **jsdom** - Browser environment simulation for tests
- **MSW (Mock Service Worker)** - Supabase API mocking without coupling to implementation

Install command:
```bash
pnpm add -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom msw
```

---

## Priority Areas for Testing

### Priority 1 — Critical Business Logic (Pure Functions)

These are the highest-value, lowest-effort tests. Pure functions with no UI dependencies.

#### 1.1 `src/lib/submitLead.ts` — Lead Validation & Sanitization

This module is the gateway for all lead data entering the system. It validates emails, phones, names, and sanitizes strings to prevent injection. A bug here means either lost leads or security vulnerabilities.

**Functions to test:**

| Function | What to test |
|---|---|
| `sanitizeString()` | Strips `<>"'\`` characters, respects max length, trims whitespace, returns `undefined` for empty input |
| `validateEmail()` | Accepts valid emails, rejects malformed ones, lowercases, respects max length |
| `validatePhone()` | Accepts valid phone formats (international, dashes, parens), rejects invalid |
| `validateName()` | Accepts Spanish characters (áéíóúñ), rejects strings with special chars, respects length limits |
| `mapAccommodation()` | Maps `"camping"/"hoteles"/"rv"/"mixto"/"lodges"` to the correct enum values |
| `submitLeadToSupabase()` | Throws on invalid email, constructs correct `NewLead` object, calls Supabase insert |

**Example test cases for `validateEmail`:**
- `"user@example.com"` → `"user@example.com"`
- `"USER@EXAMPLE.COM"` → `"user@example.com"` (lowercased)
- `"not-an-email"` → `undefined`
- `""` → `undefined`
- `undefined` → `undefined`
- Very long email (>120 chars) → truncated then validated

**Estimated: ~25-30 test cases**

#### 1.2 `src/lib/performance.ts` — Debounce, Throttle, Viewport

Utility functions used across components. Bugs here cause subtle, hard-to-diagnose UX issues.

| Function | What to test |
|---|---|
| `debounce()` | Only fires after wait period, resets timer on repeated calls, passes arguments correctly |
| `throttle()` | Fires immediately on first call, blocks subsequent calls within limit, fires again after limit |
| `isInViewport()` | Returns `true`/`false` for elements at various positions, respects threshold parameter, handles edge cases (threshold=0 vs threshold>0) |

**Estimated: ~15 test cases**

#### 1.3 `src/data/landing/expeditions.ts` — Data Query Functions

Pure filter/find functions over the expeditions dataset. Easy to test, important for the landing page.

| Function | What to test |
|---|---|
| `getExpeditionById()` | Returns correct expedition for valid ID, returns `undefined` for unknown ID |
| `getExpeditionsByDifficulty()` | Returns correct subset for each difficulty level |
| `getExpeditionsByPriceRange()` | Handles inclusive bounds, empty results, full range |

**Estimated: ~10 test cases**

---

### Priority 2 — Component Calculation Logic

#### 2.1 `src/components/TripCalculator.tsx` — Cost Calculation

The `calculateCosts()` function inside this component computes trip estimates based on destination, days, people, accommodation type, comfort level, and Green Card status. This is business-critical and customer-facing.

**Recommendation:** Extract `calculateCosts` into a standalone pure function in `src/lib/tripCalculator.ts` so it can be unit tested independently.

**What to test:**
- Accommodation cost = `accommodationCosts[type][comfort] * days`
- Food cost = `foodCosts[comfort] * days * people`
- Gas cost = `round((distance * 2) / 12 * 1.2)` for each destination
- Park entry = `$100 * people` for expensive parks when no Green Card, `$0` with Green Card
- Permits = `$50` for camping, `$30` otherwise
- Total is the correct sum

**Estimated: ~15 test cases**

#### 2.2 `src/components/SmartQuoter.tsx` — Budget Filtering

The filtering logic `destinations.filter(dest => dest.difficulty_tier === difficulty && totalCost <= budget)` should be extracted and tested.

**Estimated: ~8 test cases**

---

### Priority 3 — Custom Hooks

#### 3.1 `src/hooks/useTracking.ts` — Analytics Tracking

| Function | What to test |
|---|---|
| `getSessionId()` | Generates a session ID, persists it in sessionStorage, returns same ID on subsequent calls, handles SSR (`window === undefined`) |
| `getDeviceType()` | Returns `"mobile"` for width < 768, `"tablet"` for 768-1023, `"desktop"` for >= 1024 |
| `getUtmParams()` | Extracts UTM params from URL, returns empty object when none present |
| `useTracking()` hook | Tracks page view on mount (once), `trackEvent` sends correct data to Supabase |

**Estimated: ~12 test cases**

---

### Priority 4 — Component Integration Tests

These use React Testing Library to render components and verify user interactions.

#### 4.1 `src/components/AdventureForm.tsx`
- Renders all form sections
- Validates required fields before submission
- Calls `submitLeadToSupabase` with correct data on submit
- Shows error/success states

#### 4.2 `src/components/landing/EmailCaptureModal.tsx`
- Opens/closes correctly
- Validates required fields (shows toast on empty submit)
- Submits to Mailchimp and Supabase
- Shows success toast and clears form on success
- Shows error toast on failure

#### 4.3 `src/components/AdminLogin.tsx`
- Renders login form
- Handles authentication flow

#### 4.4 `src/components/landing/ExpeditionsSection.tsx`
- Renders expedition cards
- Filters by difficulty
- Opens detail modal on card click

**Estimated: ~30-40 test cases across all components**

---

### Priority 5 — End-to-End Tests (Future)

Once unit and component tests are solid, add E2E tests with Playwright for critical user journeys:

1. **Landing page → CTA → Calendly modal** — Primary conversion path
2. **Trip Calculator → Email capture** — Lead generation flow
3. **Adventure Form → Submission** — Full form completion
4. **Admin login → Dashboard → Lead management** — Admin workflow
5. **Blog navigation → Article reading** — Content consumption

---

## Suggested File Structure

```
src/
├── __tests__/                    # or colocate with source files
│   ├── lib/
│   │   ├── submitLead.test.ts
│   │   ├── performance.test.ts
│   │   └── tripCalculator.test.ts
│   ├── data/
│   │   └── expeditions.test.ts
│   ├── hooks/
│   │   └── useTracking.test.ts
│   └── components/
│       ├── AdventureForm.test.tsx
│       ├── EmailCaptureModal.test.tsx
│       ├── TripCalculator.test.tsx
│       ├── SmartQuoter.test.tsx
│       └── AdminLogin.test.tsx
├── test/
│   └── setup.ts                  # Vitest setup (jsdom, testing-library matchers)
```

## Vitest Configuration

Add to `vite.config.ts`:

```ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vite';

export default defineConfig({
  // ... existing config
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    include: ['src/**/*.test.{ts,tsx}'],
  },
});
```

## Package.json Scripts

```json
{
  "test": "vitest",
  "test:run": "vitest run",
  "test:coverage": "vitest run --coverage"
}
```

---

## Impact Summary

| Priority | Area | Files | Est. Test Cases | Risk Mitigated |
|---|---|---|---|---|
| P1 | Lead validation/sanitization | `submitLead.ts` | ~25-30 | Lost leads, XSS/injection |
| P1 | Performance utilities | `performance.ts` | ~15 | Subtle UX bugs |
| P1 | Expedition data queries | `expeditions.ts` | ~10 | Broken landing page filters |
| P2 | Trip cost calculation | `TripCalculator.tsx` | ~15 | Incorrect price estimates |
| P2 | Smart quoter filtering | `SmartQuoter.tsx` | ~8 | Wrong destination matches |
| P3 | Analytics tracking | `useTracking.ts` | ~12 | Lost analytics data |
| P4 | Component interactions | Multiple | ~30-40 | Broken user flows |
| P5 | E2E critical paths | Full app | ~10-15 | Regression in key journeys |
| | **Total** | | **~125-145** | |

Starting with P1 alone covers the most critical business logic with pure-function tests that are fast to write, fast to run, and require no mocking of the DOM or browser APIs.
