# SPRINT 2: THE HIDDEN CHEF & THE UNDERGROUND CRON ENGINE
*(Estimated Timeline: Week 3 – Week 4 | Day 15 to Day 28)*

> **Core Mission**: Activate the Autonomous Brain. Transform the system from passive (wait for clicks) to Self-Patrolling (auto-decides to clean stale data, flag risks).

---

## 🎯 OBJECTIVE 1: Unleash the Time Machine (Vercel Cron Jobs)

**Related Files**: `src/app/api/cron/`

| Task | Detailed Description | Estimate |
|------|---------------------|----------|
| 1.1 | Write body for `check-deadlines`: Bidding time expires → `bids_received` or `expired` | 1 day |
| 1.2 | Write body for `anomaly-check` (hourly): Partner hoarding order 48h+ → Alert Admin | 1 day |
| 1.3 | Write body for `settlement-batch` (daily 00:00 KST): Completed bookings → Settlement row | 1 day |
| 1.4 | Activate `d1-reminder`: D-1 reminder to Customer + Partner via Kakao + Email | 0.5 day |
| 1.5 | Review Reminder 24H: Customer hasn't reviewed → Push "Write review +500P!" | 0.5 day |
| 1.6 | Cron `points-expiring-soon`: Scan points expiring in D-7, send warning notification | 0.5 day |

---

## 🎯 OBJECTIVE 2: CS Court & Penalty System

**Related Files**: `src/app/(admin)/admin/cs/`, `src/app/(admin)/admin/reports/`

| Task | Detailed Description | Estimate |
|------|---------------------|----------|
| 2.1 | Code `Refund Partial` feature: Admin selects refund % → calls NicePay partial refund API | 1 day |
| 2.2 | Integrate `Refund Full`: Full refund → update `payments.status='refunded'` | 0.5 day |
| 2.3 | Partner warning system: 3 strikes (warning_count >= 3) → `status='suspended'` | 0.5 day |
| 2.4 | Shadow-Ban: Admin hides bad reviews + logs to audit_log | 0.5 day |
| 2.5 | CS Ticket escalation flow: open → in_progress → resolved/closed (UI + Server Action) | 1 day |

---

## 🎯 OBJECTIVE 3: Coupon Machine & Checkout Integration

**Related Files**: `src/app/(user)/payment/`, `src/lib/domain/coupon/`

| Task | Detailed Description | Estimate |
|------|---------------------|----------|
| 3.1 | Server Action `applyCoupon`: Validate code → compute discount → return price preview | 1 day |
| 3.2 | UI coupon input field on `/payment/[id]` page | 0.5 day |
| 3.3 | Code limits enforcement: `max_uses`, `valid_until`, `min_order_amount` validation | 0.5 day |
| 3.4 | Loss-absorption logic: Coupon reduces customer price but partner receives full → Platform absorbs delta | 0.5 day |
| 3.5 | Admin creates/edits/deletes coupons from `/admin/marketing` | 1 day |

---

> 💡 **How to execute**: Boss says *"Execute Sprint 2 - Objective 1"* or *"Sprint 2 - Objective 3"*, and I'll auto-apply code changes to the system following the exact task list!
