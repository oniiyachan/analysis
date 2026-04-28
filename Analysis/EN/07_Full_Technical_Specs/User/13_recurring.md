# PAGE: Recurring Subscriptions

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/mypage/recurring` |
| Source File | `src/app/(user)/mypage/recurring/page.tsx` |
| Auth Required | Yes |

## 2. FEATURES & FUNCTIONALITY
- **Subscription Card List**: Active recurring schedules (frequency, preferred day, partner)
- **Toggle Pause/Resume**: Temporarily pause subscription without cancelling
- **Status Badges**: active / paused / cancelled

## 3. SERVER ACTIONS
| Action | File | Description |
|--------|------|-------------|
| `toggleRecurring` | `mypage/recurring/_actions/toggle-recurring.ts` | UPDATE `recurring_subscriptions.status` (active↔paused) |

## 4. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `recurring_subscriptions` | `id, user_id, frequency, preferred_day, preferred_time, partner_id, status, created_at` | SELECT + UPDATE |
