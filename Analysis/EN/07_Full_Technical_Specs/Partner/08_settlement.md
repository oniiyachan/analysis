# PAGE: Settlement Ledger (`/p/settlement`)

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/p/settlement` |
| Source File | `src/app/(partner)/p/settlement/page.tsx` (386 lines) |
| Allowed Roles | **Owner only** (Lead/Worker → redirect `/p`) |
| Auth Required | Yes |

## 2. FEATURES & FUNCTIONALITY
- **4 KPI Cards**: Pending sum / Processing sum / Completed sum / This Month sum
- **Settlement History**: Card list (mobile) / Data table (desktop) with 7 columns
- **Status Badges**: pending/processing/completed/failed/held
- **Tax Invoices**: Monthly commission receipts (PDF download link)
- **D+1 Policy**: Auto-deposit next business day after service completion

## 3. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `settlements` | `id, gross_amount, platform_fee, net_amount, status, scheduled_date, completed_at, failed_reason` | SELECT |
| `tax_invoices` | `id, period_ym, commission, net_payout, issued_at, pdf_path` | SELECT (owner only) |
