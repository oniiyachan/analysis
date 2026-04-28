# PAGE: Transaction History

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/admin/transactions` |
| Source File | `src/app/(admin)/admin/transactions/page.tsx` |
| Auth | Admin |

## 2. FEATURES & FUNCTIONALITY
- **Payment Transaction Table**: All payments with status, amount, method, user, partner
- **Refund Management**: Initiate refunds for disputed transactions
- **Status Badges**: completed (green), pending (amber), refunded (blue), failed (red)

## 3. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `payments` | `id, amount, method, status, pg_tid, created_at, booking_id, profile_id` | SELECT |
| `bookings` | `id, partner_id` | JOIN |
| `profiles` | `name, email` | JOIN (customer info) |
| `partners` | `business_name` | JOIN (partner info) |
