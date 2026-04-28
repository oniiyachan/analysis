# PAGE: Admin Settlement Management

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/admin/settlement` |
| Source File | `src/app/(admin)/admin/settlement/page.tsx` (170 lines) |
| Auth | Admin |

## 2. FEATURES & FUNCTIONALITY
- **4 Status KPI Cards**: Pending / Processing / Completed / Failed (net_amount sum each)
- **Tax Invoice Batch Issue** (`IssueTaxInvoicesForm`): Monthly commission invoice generation
- **Settlement History Table**: Date / Partner / Gross / Fee / Net / Status (50 recent)

## 3. SERVER ACTIONS
| Action | File | Description |
|--------|------|-------------|
| `issueTaxInvoices` | `admin/settlement/_actions/issue-tax-invoices.ts` | Batch generate monthly tax invoices |

## 4. DATABASE TABLES
| Table | Columns | Operation |
|-------|---------|-----------|
| `settlements` | `id, partner_id, booking_id, gross_amount, platform_fee, net_amount, status, scheduled_date, completed_at` | SELECT |
| `partners` | `business_name` | JOIN |
| `tax_invoices` | `partner_id, period_ym, commission, net_payout` | INSERT (batch) |
