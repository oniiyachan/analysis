# VERCEL INFRASTRUCTURE & DEPLOYMENT SYSTEM

> **Hosting Platform**: Vercel (Edge Network) — The entire CleanHi project is hosted and auto-deployed on Vercel.

---

## 1. DEPLOYMENT MODEL

| Component | Technology | Role |
|-----------|-----------|------|
| **Build Engine** | Next.js 16 (App Router) | Compiles Server Components + Client bundles |
| **Runtime** | Vercel Edge Functions | Executes Server Actions + API Routes on distributed CDN |
| **Cron Scheduler** | Vercel Cron | Fires automated HTTP requests to `api/cron/*` on schedule |
| **Preview Deployments** | Vercel Git Integration | Every Pull Request auto-generates a unique preview URL |
| **Domain** | Custom Domain (cleanhi.kr) | DNS binding + auto-provisioned SSL via Vercel |

---

## 2. VERCEL CRON JOBS (CONFIGURED)

| API Endpoint | Frequency | Description |
|-------------|-----------|-------------|
| `/api/cron/check-deadlines` | Every 5 minutes | Sweep expired bids & payment deadlines |
| `/api/cron/settlement-batch` | Daily 00:00 KST | D+1 partner commission settlement |
| `/api/cron/d1-reminder` | Daily 09:00 KST | D-1 reminder to Customer + Partner |
| `/api/cron/anomaly-check` | Every 1 hour | Detect anomalies (0 bids 24h, stale orders 48h) |
| `/api/cron/deliver-broadcasts` | Every 5 minutes | Deliver scheduled broadcast email/kakao |
| `/api/cron/recalc-partner-customer-stats` | Daily 03:00 KST | Recalculate partner CRM customer stats |

---

## 3. CRITICAL ENVIRONMENT VARIABLES

| Variable | Description | Status |
|----------|-------------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | ✅ Configured |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public anon key | ✅ Configured |
| `SUPABASE_SERVICE_ROLE_KEY` | Admin key bypassing RLS | ✅ Configured |
| `NICEPAY_MID` | Payment gateway merchant ID | ⏳ Awaiting production MID |
| `NICEPAY_MERCHANT_KEY` | NicePay authentication key | ⏳ Awaiting production MID |
| `RESEND_API_KEY` | Email delivery API key | ✅ Configured |
| `SOLAPI_API_KEY` + `SECRET` | SMS/Kakao messaging keys | ✅ Configured |
| `CRON_SECRET` | Cron endpoint protection | ✅ Configured |
| `SUPER_ADMIN_EMAIL` | Super admin account | ✅ `admin@sharefriends.kr` |

---

## 4. CI/CD PIPELINE (GITHUB ACTIONS)
- **Typecheck**: `pnpm typecheck` validates TypeScript compilation
- **Lint**: `pnpm lint` (Biome) enforces code style standards
- **Unit Tests**: `pnpm vitest run` — currently achieving **169/169 test cases passing**
- **E2E Tests**: Playwright (additional coverage under construction)
- **Auto Deploy**: Push to `main` → Vercel auto-builds + deploys to Production
