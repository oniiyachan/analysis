# SPRINT 3: PREMIUM UPGRADE PACKAGE & SUPER ACCOUNTANT
*(Estimated Timeline: Week 5 – Week 6 | Day 29 to Day 42)*

> **Core Mission**: Unlock Revenue-Boosting packages (Weekly, Monthly subscriptions) and replace the manual accounting clerk with Open Banking APIs.

---

## 🎯 OBJECTIVE 1: The Recurring Nightmare Chain (Recurring Bookings)

**Related Files**: `src/app/(user)/mypage/recurring/`, `src/app/api/cron/`

| Task | Detailed Description | Estimate |
|------|---------------------|----------|
| 1.1 | Backend: Migration to create `recurring_subscriptions` table (user_id, frequency, preferred_day, status) | 0.5 day |
| 1.2 | UI `/mypage/recurring-new`: Subscription signup form (weekly/biweekly/monthly) + preferred partner selection | 1 day |
| 1.3 | Cron `spawn-recurring`: Every Sunday → auto-generate new `cleaning_requests` for next week | 1 day |
| 1.4 | Auto-charge: Integrate NicePay Billing Key → auto-debit card or send payment reminder | 1.5 days |
| 1.5 | Management UI: Pause / Cancel subscription / Change schedule | 1 day |

---

## 🎯 OBJECTIVE 2: Team Roster Assignment Algorithm (Team Roster Sync)

**Related Files**: `src/app/(partner)/p/schedule/`, `src/app/(partner)/p/team/`

| Task | Detailed Description | Estimate |
|------|---------------------|----------|
| 2.1 | Leader assigns Worker to Booking: Dropdown UI to select worker + `bookings.assigned_worker` update | 1 day |
| 2.2 | Worker Check-in: Confirm arrival button + Geolocation API reports coordinates | 1 day |
| 2.3 | Service checklist: Kitchen cleaned ✓, Toilet scrubbed ✓ → Upload evidence photos to Storage | 1 day |
| 2.4 | Progress tracking: Worker updates % → Customer sees realtime progress via `bookings.progress_percent` | 0.5 day |

---

## 🎯 OBJECTIVE 3: Dark Accountant (Automated Escrow & OpenBanking)

**Related Files**: `src/app/api/cron/settlement-batch/`, `src/lib/integrations/openbanking/` (new)

| Task | Detailed Description | Estimate |
|------|---------------------|----------|
| 3.1 | Research + register FirmBanking API (or Toss Payments Transfer) | 1 day |
| 3.2 | Automatic D+1: Settlement `status='pending'` → call transfer API → `status='completed'` | 1.5 days |
| 3.3 | Platform Fee 15% split: Gross → Fee → Net → VAT invoice | 0.5 day |
| 3.4 | Admin Settlement Dashboard: Bulk transfer approval table + CSV export backup | 1 day |

---

## 🎯 OBJECTIVE 4: The Money-Burning Territory (Analytics Heatmaps)

**Related Files**: `src/app/(admin)/admin/analytics/`

| Task | Detailed Description | Estimate |
|------|---------------------|----------|
| 4.1 | Integrate Kakao Maps SDK into Analytics page | 0.5 day |
| 4.2 | Heatmap Overlay: Color-code 25 Seoul districts by completed order density | 1 day |
| 4.3 | Filter by time range (7d / 30d / 90d) + category | 0.5 day |
| 4.4 | Export PDF reports for leadership | 1 day |

---

> 💡 **How to execute**: Boss says *"Execute Sprint 3 - Objective 1"* or *"Sprint 3 - Objective 3"*, and I'll auto-apply code changes to the system following the exact task list!
