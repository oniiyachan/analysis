# BACKGROUND PROCESSES & CRON JOBS

> **Overview**: Automated recurring tasks executing without human intervention.

## 1. EXECUTION ENGINE
Deployed via Vercel Cron executing secure HTTP requests toward `api/cron/...` endpoints. Authenticated exclusively via internal `CRON_SECRET` headers.

## 2. THE 5 CORE MANIFESTOS
1. **No-Show Detection**: Flags `assigned` requests missing check-in timestamps after scheduled start limits.
2. **Orphan Payments**: Automatically voids `pending` rows idling beyond 10 hours.
3. **Abandoned Quotes**: Cancels empty bidding rooms exceeding the 24h limit, triggering apology SMS flows.
4. **Critical Refund Alarms**: Alerts ops if a partner's refund tally breaches the 15% threshold.
5. **Settlement Reminders**: Flags pending finalized jobs missing accounting payouts from the prior week.