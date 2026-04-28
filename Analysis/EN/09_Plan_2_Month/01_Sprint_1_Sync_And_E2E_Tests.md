# SPRINT 1: WIRING THE BLOODLINES & LAYING THE ASPHALT
*(Estimated Timeline: Week 1 – Week 2 | Day 1 to Day 14)*

> **Core Mission**: Break the sandbox dam, release real water. Pump all real 3rd-party API Keys into the system, then unleash automated bots to stress-test every single use-case.

---

## 🎯 OBJECTIVE 1: Payment Synchronization (NicePay Live)

**Related Files**: `src/app/api/nicepay/confirm/route.ts`, `src/lib/integrations/nicepay/client.ts`

| Task | Detailed Description | Estimate |
|------|---------------------|----------|
| 1.1 | Set Vercel Env: `NICEPAY_MID`, `NICEPAY_MERCHANT_KEY`, `NICEPAY_SECRET_KEY`, `NICEPAY_WEBHOOK_SECRET` | 0.5 day |
| 1.2 | Disable Sandbox mechanism: remove `NICEPAY_ENV=sandbox`, switch to `production` | 0.5 day |
| 1.3 | Simulate real card payment ₩100,000 → Verify `payments.status='paid'` in DB | 1 day |
| 1.4 | Call NicePay Hotline 1661-0808 for refund → Verify refund pipeline works | 0.5 day |
| 1.5 | Check `payment_reconciliation_queue` is empty (no orphans) | 0.5 day |
| 1.6 | Register Webhook URL `cleanhi.vercel.app/api/nicepay/webhook` on NicePay Console | 0.5 day |

---

## 🎯 OBJECTIVE 2: Notification Pipeline (Kakao Alimtalk & Resend Email)

**Related Files**: `src/lib/integrations/solapi/`, `src/lib/integrations/resend/`, `src/lib/domain/broadcast/deliver.ts`

| Task | Detailed Description | Estimate |
|------|---------------------|----------|
| 2.1 | Remove `status='skipped'` in `broadcast/deliver.ts` | 0.5 day |
| 2.2 | Submit 5 Kakao Alimtalk Templates to Solapi for approval (bidding alert, booking confirm, D-1 reminder, review nudge, refund notice) | 1 day |
| 2.3 | Set up Fallback: Kakao fails → Solapi Local SMS | 0.5 day |
| 2.4 | Build React-Email design for guest payment receipt (`guest_bid_arrived`) | 1 day |
| 2.5 | Enable `marketing_consent` gate: Only send broadcasts to users who opted in | 0.5 day |
| 2.6 | Full end-to-end test: Create request → Partner bids → Customer receives real Kakao + Email | 1 day |

---

## 🎯 OBJECTIVE 3: E2E Test Safety Net (Playwright)

**Related Files**: `tests/e2e/` (new)

| Task | Detailed Description | Estimate |
|------|---------------------|----------|
| 3.1 | **Bomb Order Case**: Place order → Bidding → NicePay confirm → Disconnect mid-flow → Verify Idempotency | 1 day |
| 3.2 | **Race Condition Case**: 3 Partner accounts simultaneously hit "Submit Bid" on same request | 1 day |
| 3.3 | **Admin Guard Case**: Block partner/customer from accessing `/admin/*`. Verify RLS + middleware guard | 0.5 day |
| 3.4 | **Guest Flow Case**: Guest submits quote → receives email → registers → claims request | 1 day |
| 3.5 | Integrate Playwright into GitHub Actions CI (separate job) | 0.5 day |

---

> 💡 **How to execute**: Boss says *"Execute Sprint 1 - Objective 1"* or *"Sprint 1 - Objective 2"*, and I'll auto-apply code changes to the system following the exact task list!
