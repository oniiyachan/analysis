# BACKEND PROGRESS & ONBOARDING ESTIMATION

## 1. What Is Already Complete? (Completion: ~90%)
Based on Commit Logs and the `@TODO.md` tracker, the previous development team has pushed the codebase to the doorstep of MVP launch:
- **Database Architecture**: Fully provisioned on Supabase. Evolved through 37 migration waves. All tables, foreign key relationships, and triggers are locked down. The RLS (Row-Level Security) matrix — preventing cross-user data leaks — has been hardened with over 57 individual policies.
- **API Layer (Server Actions)**: The frontend never calls legacy REST endpoints. All data mutations flow through React 19 Server Actions (executed silently on Vercel Edge servers).
- **Core Heavy-Lifting Completed**: 3-Role partner organization permissions system. Guest/anonymous quote flow. Full UI screens for all 3 independent portals (Customer, Partner, Admin).
- **Payment Security**: Idempotency protection against double-charging credit cards via a dedicated `payment_reconciliation_queue` (orphan payment recovery pipeline).

## 2. What Remains? (~10% — Phase 0 Launch Prep)
These are the final mile items required for real-world deployment:
- **Live API Credentials**: CleanHi has not yet injected production API keys for NicePay or Kakao Alimtalk (still running on Sandbox test keys). Vercel emits yellow warning logs on startup.
- **Bot Protection (BotID)**: Attempted Vercel BotID integration but reverted due to Hobby plan conflict. Needs Pro plan confirmation or Turnstile/hCaptcha fallback.
- **DevOps Cleanup**: Full Lint/Typecheck pass required (~251 auto-fixable + ~72 manual warnings). Lock file cleanup and CI/CD automation hardening.
- **E2E Test Coverage**: Playwright tests needed for payment flow, concurrent bid race conditions, and admin route guards.

---

## 3. Onboarding Time Estimate for a New Backend Developer

**Scenario A: Rebuilding from scratch with a different stack (Spring, Express, Redis, MySQL...)**
- An O2O marketplace with real-time price matching, tiered RBAC, payment escrow, and chat/push infrastructure is extremely heavy. Minimum **1.5 to 2 months** for a senior backend team.

**Scenario B: Onboarding onto this existing codebase to push to Production**
- The business logic is already written. A new developer joining would need:
  - **Week 1 (Days 1–5)**: Review directory structure, explore Supabase tables/policies, read Server Actions. Write draft E2E tests for critical flows.
  - **Week 2 (Days 6–12)**: Inject live API keys (NicePay/Alimtalk). Monitor logs, run a real ₩20,000 test charge and verify bank statement. Configure Security HTTP Headers and rate-limiting on Vercel Firewall.
  - **Total Estimated Time**: Approximately **10 to 15 working days** to achieve full backend mastery and confidently press the `Release v1.0` button.