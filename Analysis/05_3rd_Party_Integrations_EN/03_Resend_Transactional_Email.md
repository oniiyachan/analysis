# TRANSACTIONAL EMAIL SYSTEM — RESEND INTEGRATION

> **Source Directory**: `src/lib/integrations/resend/`

---

## 1. TECHNOLOGY OVERVIEW
CleanHi uses **Resend** (resend.com) as its transactional email delivery service. Resend is a modern email API replacing SendGrid/Mailgun, with native support for React-Email server-side template rendering.

**Email Architecture**:
- `client.ts`: Initializes the Resend SDK client from env `RESEND_API_KEY`. If key is missing → no-op (app never crashes).
- `send-email.ts`: Central dispatch hub. Accepts a Union Type input and routes to the correct template builder function.
- `send-with-attachment.ts`: Sends emails with file attachments (PDF receipts, tax invoices).

---

## 2. COMPLETE TEMPLATE CATALOG (9 Templates)

| # | Template ID | Recipient | Purpose | Triggered By |
|---|-------------|-----------|---------|--------------|
| 1 | `payment_confirmed` | Customer | Payment success confirmation | NicePay confirm callback |
| 2 | `service_completed` | Customer | Service done, invite to write Review + earn 500P | Partner taps "Complete" |
| 3 | `settlement_completed` | Partner | Funds transferred to bank account notification | CRON settlement-batch |
| 4 | `partner_invitation` | New Member | Invitation to join team (create account link) | Admin approves member application |
| 5 | `application_rejected` | Applicant | Application rejection notice | Admin reject action |
| 6 | `guest_bid_arrived` | Guest User | "Your first bid arrived! Register to view" with claim link | First bid on Guest request |
| 7 | `d1_reminder_user` | Customer | D-1 reminder: "Your cleaning is scheduled tomorrow" | CRON d1-reminder |
| 8 | `d1_reminder_partner` | Partner | D-1 reminder: "Tomorrow 10:00 visit Mr. Kim's home" | CRON d1-reminder |
| 9 | `broadcast` | All/Segment | Mass marketing emails (promotions, announcements) | Admin `/admin/broadcast` |

---

## 3. SAFETY MECHANISMS
- **Fail-Safe**: All send errors are swallowed by `try/catch`. The app **never crashes** due to email delivery failure.
- **No-Op Mode**: If `RESEND_API_KEY` is not configured, the system logs a warning and skips silently (supports Dev/Preview environments).
- **Wrapper Template**: `_wrapper.ts` provides a responsive HTML frame with header logo + company footer, ensuring brand consistency across all emails.
