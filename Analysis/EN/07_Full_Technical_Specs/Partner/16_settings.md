# PAGE: Company Settings (`/p/settings`)

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/p/settings` |
| Source File | `src/app/(partner)/p/settings/page.tsx` |
| Allowed Roles | Owner |

## 2. FEATURES & FUNCTIONALITY
- **Company Profile Edit**: Business name, about text, service areas checklist
- **Bank Account**: Settlement account info (bank name, account number, holder name)
- **Notification Preferences**: Toggle email/push notifications

## 3. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `partners` | `id, business_name, about, service_areas, bank_name, bank_account, bank_holder` | SELECT + UPDATE |
