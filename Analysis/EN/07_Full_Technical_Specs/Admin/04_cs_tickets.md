# PAGE: CS Ticket Management

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/admin/cs` |
| Source File | `src/app/(admin)/admin/cs/page.tsx` |
| Auth | Admin |

## 2. FEATURES & FUNCTIONALITY
- **Ticket List**: Open / In Progress / Resolved tabs with category, customer, booking reference
- **Status Badges**: open (red), in_progress (amber), resolved (green), closed (gray)
- **Priority Indicators**: Urgent (damage), Normal

## 3. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `cs_tickets` | `id, status, category, priority, booking_id, profile_id, created_at` | SELECT |
| `profiles` | `name, email` | JOIN (customer name) |
| `bookings` | `id, scheduled_date` | JOIN (booking reference) |
