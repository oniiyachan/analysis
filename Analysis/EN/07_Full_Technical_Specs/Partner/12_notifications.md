# PAGE: Partner Notifications (`/p/notifications`)

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/p/notifications` |
| Source File | `src/app/(partner)/p/notifications/page.tsx` |
| Auth Required | Yes |

## 2. FEATURES & FUNCTIONALITY
- Same as User notifications but filtered by partner member profile
- Notification types: new_bid_request, booking_confirmed, payment_received, review_posted

## 3. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `notifications` | `id, type, title, body, is_read, profile_id, created_at` | SELECT + UPDATE is_read |
