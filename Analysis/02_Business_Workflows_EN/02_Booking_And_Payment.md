# BUSINESS WORKFLOW: BOOKING, PAYMENT & SETTLEMENT

This is the core value chain generating **Cashflow** for the platform.

## 1. Accepting a Bid & Creating a Booking (`bookings`)
- The customer reviews the array of `quotes` objects, selects their preferred cleaner's bid, and presses "Accept."
- Immediately, the server creates a record in the `bookings` table with a payment deadline (N minutes). If the customer fails to pay within this window, the transaction expires. Booking status is set to `pending_payment`.
- The partner (Lead/Owner) can use the Partner Portal to assign this booking to a specific team within their organization for field dispatch.

## 2. Payment Gateway (NicePayments 2.0)
- **Checkout UI**: An embedded NicePay payment form appears supporting domestic cards and international credit cards.
- **Idempotency Guard (Track A1)**: The backend's `nicepay/confirm` handler is engineered with extreme precision. The `payments.pg_tx_id` column has a `UNIQUE` constraint, preventing duplicate charges if a customer accidentally double-clicks the pay button.
- **Post-payment State Update**: Upon successful payment, `payments.status` transitions to `paid`, `bookings.status` transitions to `confirmed`. The system fires a Kakao Alimtalk message notifying the assigned cleaning partner to prepare equipment and head to the job site.

## 3. Service Execution (Field Operations)
- **Partner Portal Workflow**: When the cleaner arrives on-site, they tap "Start Cleaning" (`in_progress`). Upon completion, they tap "Complete" (`completed`).
- The customer at home receives real-time Push Notifications as the booking status changes — powered by Supabase Realtime WebSockets.

## 4. Commission Settlement (`settlements`)
- **Nightly CRON Job**: Every midnight (00:00 KST), a Vercel Cron job sweeps the database for all bookings that transitioned to `completed` status more than 24 hours ago.
- **Settlement Formula**: Payment amount minus Platform Fee of 15% (`platform_fee_rate = 0.150`) = Net payout (`net_amount`).
- The server automatically generates a settlement record in the `settlements` table and notifies the partner: "Your earnings will be deposited to your registered bank account on D+1."
- **Dispute Hold**: If an unresolved CS ticket is linked to a booking, the settlement status is set to `held` (funds frozen) until the dispute is resolved.