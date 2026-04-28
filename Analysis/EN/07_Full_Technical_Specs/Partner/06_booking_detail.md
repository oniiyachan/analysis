# PAGE: Booking Execution (`/p/schedule/[bookingId]`)

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/p/schedule/[bookingId]` |
| Source File | `src/app/(partner)/p/schedule/[bookingId]/page.tsx` |
| Auth Required | Yes |

## 2. FEATURES & FUNCTIONALITY
- **Booking Detail**: Service info, customer address, scheduled time
- **Status Action Buttons** (`StatusActionButtons`): "Start Cleaning" (→ in_progress) / "Complete" (→ completed)
- **Chat Link**: Navigate to `/p/schedule/[bookingId]/chat`

## 3. SERVER ACTIONS
| Action | File | Description |
|--------|------|-------------|
| `updateBookingStatus` | `p/schedule/[bookingId]/_actions/update-booking-status.ts` | UPDATE `bookings.status` |

## 4. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `bookings` | `id, status, scheduled_date, scheduled_time, partner_id` | SELECT + UPDATE |
| `cleaning_requests` | `district, dong, area_pyeong, category_id` | JOIN |
