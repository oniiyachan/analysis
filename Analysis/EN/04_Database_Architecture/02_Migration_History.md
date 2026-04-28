# 37-WAVE DATABASE MIGRATION HISTORY

> **Source Directory**: `supabase/migrations/` — Each `.sql` file represents one evolutionary wave of the database schema.

---

## EVOLUTION SUMMARY (37 Migration Waves)

| Wave | Migration File | Key Changes | Date |
|------|---------------|-------------|------|
| 01 | `01_extensions_helpers_profiles` | Enable UUID extension, create `profiles` table, `handle_new_user` trigger for auto-profile creation on signup | 04/18 |
| 02 | `02_partners_and_catalog` | `partners` + `service_categories` + `service_sub_categories` tables. Seed data for 5 cleaning types | 04/18 |
| 03 | `03_cleaning_requests_and_quotes` | CORE tables: `cleaning_requests` (orders) + `quotes` (bids). Cross-linked foreign keys | 04/18 |
| 04 | `04_bookings_payments_settlements` | Payment chain: `bookings` → `payments` → `settlements`. 15% platform commission lock | 04/18 |
| 05 | `05_reviews_coupons_chat_notifications_cs_audit` | 7 auxiliary tables: `reviews`, `coupons`, `chat_rooms`, `chat_messages`, `notifications`, `cs_tickets`, `audit_logs` | 04/18 |
| 06 | `06_rls_policies` | Initial RLS policy set for all 16 tables. First cross-user access prevention | 04/18 |
| 07 | `07_realtime_and_storage` | Enable Supabase Realtime Publication + Create `quote-photos` Storage Bucket | 04/18 |
| 08–09 | `08_fix_*` / `09_fix_*` | Security patches: function search_path hardening + phone nullable fix | 04/18 |
| 10 | `10_partner_applications` | `partner_applications` table: onboarding queue for cleaning companies | 04/19 |
| 11 | `11_payment_idempotency` | **Track A1 Security**: `payments.pg_tx_id UNIQUE` anti-double-charge + `payment_reconciliation_queue` | 04/19 |
| 12 | `12_quote_photos_rls_fix` | **Track A2**: Storage RLS patch preventing cross-partner photo access | 04/19 |
| 13–14 | `13_partner_organization` / `14_*_applications` | 3-Role structure: `partner_teams` + `partner_members` (owner/lead/worker) + member application queue | 04/20 |
| 15–16 | `15_admin_role_and_audit` / `16_rls_admin_role` | Admin RBAC: `profiles.admin_role` + `app.has_admin_role()` function + RLS overhaul (Drop 13 + Create 15 policies) | 04/20 |
| 17 | `17_lead_bidding` | Lead bidding authority: `quotes.submitted_by_profile_id` + `bookings.team_id` | 04/20 |
| 18 | `18_guest_quotes` | Guest flow: `cleaning_requests.user_id` NULLABLE + `guest_sessions` table | 04/20 |
| 19 | `19_rate_limits` | `rate_limits` table: IP/email/phone spam throttling | 04/20 |
| 20–21 | `20_grant_*` / `21_fix_rls_*` | Schema grants + RLS infinite recursion fix | 04/20 |
| 22–27 | `22_review_reply` → `27_recurring_bookings` | Review replies, loyalty points, legal consent, receipts, anomaly alerts, recurring subscriptions | 04/21 |
| 28–37 | `28_broadcasts` → `37_partner_customer_stats` | Enterprise features: broadcast channels, partner/user tier ranking, CRM stats, admin reports, system settings | 04/22 |
