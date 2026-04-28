# BUSINESS WORKFLOW: MONITORING, CUSTOMER SERVICE & DISPUTES

## 1. Customer Service Tickets (`cs_tickets`)
In the cleaning industry, incidents are common — furniture damage, incomplete cleaning, scheduling disputes.
- **Ticket Submission**: Both customers and partners can file complaints against a booking. Data is stored in the `cs_tickets` table. Evidence photos (scratches, stains, damage) can be attached as proof.
- **Admin Resolution Flow**: The CS team accesses the Admin Dashboard, reviews the chat history between both parties in the `chat_messages` table, then renders a judgment:
  - **If the partner is at fault**: Admin triggers a `refund_partial` Server Action — extracting the refund amount from the partner's unsettled funds and returning it to the customer's card. The partner's `warning_count` is incremented (strike system).
  - **If the customer is at fault**: The settlement proceeds normally, and the partner receives their full payout.

## 2. Reviews & Competitive Rating System
- After service completion, the customer receives an email requesting feedback.
- The `reviews` table is activated. Cross-evaluation across 4 criteria: Cleanliness, Punctuality, Courtesy, Value-for-Money.
- Supabase has a SQL Trigger (`update_partner_rating`): Every time a new review is inserted, the database **automatically** executes a stored procedure that recalculates the partner's average rating and updates `partners.rating` — no application code sweep required.

## 3. Audit Trail & Anomaly Detection
- **Audit Logs**: Every admin action (edit, delete, status change) is recorded with the actor's IP address and user agent into the `audit_logs` table for forensic inspection.
- **Hourly CRON Anomaly Check**: Every 60 minutes, the server scans for:
  - Customer posted a request but received 0 bids in 24 hours (market starvation).
  - Customer received bids but hasn't selected a partner in 48 hours (decision paralysis).
  - Partner started cleaning but hasn't reported completion in 2x the estimated duration (service delay).
  → All anomalies are surfaced as alerts on the Admin Dashboard for human intervention (emergency phone calls, manual dispatch coordination).