# PAGE: Customer CRM (`/p/customers`)

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/p/customers` |
| Source File | `src/app/(partner)/p/customers/page.tsx` |
| Allowed Roles | Owner / Lead |

## 2. FEATURES & FUNCTIONALITY
- **Repeat Customer Stats**: Customers who've booked 2+ times
- **Customer Cards**: Name, total bookings, total spend, last service date

## 3. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `partner_customer_stats` | `partner_id, profile_id, booking_count, total_spend, last_service_date` | SELECT (migration 37) |
| `profiles` | `name, email` | JOIN |
