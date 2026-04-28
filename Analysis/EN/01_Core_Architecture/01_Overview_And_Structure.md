# PROJECT OVERVIEW & DIRECTORY STRUCTURE

CleanHi is an O2O (Online-to-Offline) cleaning marketplace powered by a **Reverse Auction** model. Homeowners post cleaning requests with photos and dimensions; competing cleaning companies then submit bids in real-time. The platform provides AI-powered price estimates and automatically deducts a platform commission on every transaction.

## 1. Technology Stack
The project is built on a cutting-edge Vercel + Supabase ecosystem:
- **Frontend & UI Logic**: Next.js 16 (App Router), Tailwind CSS v4, shadcn/ui component library. Form state management via React Hook Form + Zod schema validation.
- **Backend & Database**: Supabase (PostgreSQL with Row-Level Security, Auth, Realtime WebSockets for chat/live bidding, Storage for photo uploads).
- **Third-Party Integrations**: NicePayments 2.0 (card payments), Resend (transactional emails), Solapi (Kakao Alimtalk SMS), Playwright (E2E automation testing).

## 2. Core Directory Architecture
The source code is decomposed into isolated, role-specific folders:

- `src/` (React/Next.js application root)
  - `src/app/(user)/`: All customer-facing screens — landing page, 8-step quote wizard, bid comparison matrix, NicePay payment checkout.
  - `src/app/(partner)/`: PWA-optimized mobile portal for cleaning subcontractors — browse nearby requests, submit competitive bids, manage team schedules.
  - `src/app/(admin)/`: Internal operations dashboard — KPI analytics, dispute resolution center, partner application review queue.
  - `src/lib/integrations/`: External service connectors packaged as isolated modules: `nicepay/` (payment gateway), `supabase/` (DB client), `solapi/` (SMS/Kakao messaging).
  - `src/schemas/`: Zod validation schemas protecting every user-facing form input. All data mutation flows are forced through this gate.
- `supabase/migrations/`: The backbone of backend integrity. Contains 37 SQL migration files defining table schemas, triggers, stored procedures, and the rigorous Row-Level Security policy matrix.
- `docs/`: Repository of business specification documents, Architecture Decision Records (ADRs), and Runbooks (operational playbooks for incident response).
- `tests/e2e/`: Playwright automation test suites simulating end-to-end user journeys (auto-fill forms, role-play as a bidding partner, etc.).