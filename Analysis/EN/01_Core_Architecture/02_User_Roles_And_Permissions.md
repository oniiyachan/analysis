# USER ROLES & ACCESS CONTROL (RBAC)

The CleanHi system implements a multi-layered Role-Based Access Control (RBAC) model, strictly enforced through Supabase RLS Policies at the database level. Users are divided into 3 primary entity groups:

## 1. Customer (End User)
- **Guest (Anonymous Visitor)**: Guests can complete the full 8-step quote wizard — including photo uploads — and submit a cleaning request **without creating an account**. The system issues a `guest_session_token` via a secure Cookie. When the first bid arrives, CleanHi sends a compelling email prompting the guest to register and "Unlock your quotes."
- **Registered Customer**: Owns `cleaning_requests` records. Only they can view their matched bid comparisons, select a cleaner, complete the NicePay payment, and leave post-service reviews.

## 2. Cleaning Partner (Subcontractor)
Designed to support the "Cleaning Company" organizational model — not just individual freelancers. A single company account can contain multiple subordinate team members. Internally split into a **3-Role Organization**:
- **Owner (Company Boss)**: Has a dedicated analytics dashboard. Can view revenue stats, win-rate metrics, profit margins, and manage team roster (add/remove workers).
- **Lead (Team Captain)**: Represents a team operating in a specific district (e.g. Gangnam-gu). Can browse new requests within their geo-zone and submit bids on behalf of the company.
- **Worker (Field Cleaner)**: Strictly limited permissions. Can only log in to view today's assigned jobs (location, time), then tap "Start" / "Complete" progress buttons. Workers are absolutely prohibited from viewing Owner revenue data.

## 3. System Administration (Admin)
Privilege separation is driven by the `admin_role` column in the `profiles` table:
- **Super**: Supreme authority. Can intervene in emergency order cancellations, reissue stuck payment codes, and modify any system state.
- **Ops (Operations)**: Handles partner onboarding — reviewing business license applications (Approve/Reject `partner_applications`). Has read access to Audit Logs (the tamper-proof record of all admin actions).
- **CS / QA (Customer Service)**: Resolves dispute tickets between cleaning partners and customers. Authorized to issue partial refunds.
- **Marketing**: Manages promotional campaigns and internal coupon distribution.