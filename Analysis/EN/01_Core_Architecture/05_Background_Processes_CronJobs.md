# BACKGROUND AUTOMATION ARCHITECTURE (CRON JOBS & SCHEDULED TASKS)

> **Purpose**: The automated sweep-and-purge engines that run silently in the background, maintaining system hygiene without human intervention. The heartbeat of the Anomaly Detection System.

---

## 1. Execution Platform (The Runner Engines)
All background tasks are deployed as **Vercel Cron Jobs**. The schedule configuration lives in `vercel.json`, declaring the hour/minute at which Vercel's infrastructure will fire hidden HTTP requests to the `api/cron/...` endpoints.
Vercel Cron operates on UTC time, calibrated to align with midnight KST (Korean Standard Time, UTC+9).

## 2. The 5 Core Sweep Missions (Scan Manifesto)
Cron jobs run hourly or daily (depending on API configuration) to hunt down 5 categories of system anomalies:

1. **Partner No-show Detection**: Scans the `cleaning_requests` table. Any order in `assigned` status where the scheduled cleaning time has elapsed by 1+ hour without the partner pressing "Start Cleaning" → triggers an anomaly alert row in the `alerts` pipeline.

2. **Orphan Payment Tracking**: Scans the `payments` table for records stuck in `pending` status. Payments exceeding 10 hours without completion → auto-cancel the dead order to keep the database clean.

3. **Zero-Bid Starvation**: If a customer's cleaning request (`cleaning_requests`) has been live for the full 24-hour countdown timer and `bid_count = 0` (no partner submitted a bid) → expire the request, send a sympathetic SMS apologizing to the customer.

4. **Refund Rate Red Flag Sweep**: Algorithmic scan of partner refund ratios. If any Partner has a cumulative refund count exceeding 15% of their total completed orders → inject a Critical Alert (severity: red) onto the Ops Admin dashboard (`/admin/alerts`).

5. **Orphan Settlement Audit**: Scans the `settlements` table. Completed bookings from the prior week that haven't been financially reconciled → push a purple-severity alert to the finance manager to open the treasury and approve disbursement.

---

## 3. Cron API Security
The `api/cron/[xxx]` routes do not use token-based authentication (since Vercel's internal scheduler calls them machine-to-machine).
- **Anti-tampering mechanism**: Every cron handler function validates the `CRON_SECRET` header passed by Vercel's scheduler. If the key doesn't match → immediate `401 Unauthorized` rejection. This prevents external hackers from manually invoking cron URLs to flood-trigger database sweeps.