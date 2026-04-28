# PAGE: New Recurring Subscription

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/mypage/recurring/new` |
| Source File | `src/app/(user)/mypage/recurring/new/page.tsx` |
| Auth Required | Yes |

## 2. FEATURES & FUNCTIONALITY
- **Schedule Form**: Select frequency (weekly/biweekly/monthly), preferred day, preferred time
- **Partner Selection**: Optional preferred partner from favorites
- **Address Pre-fill**: Uses last booking address

## 3. SERVER ACTIONS
| Action | File | Description |
|--------|------|-------------|
| `createRecurring` | `mypage/recurring/_actions/create-recurring.ts` | INSERT `recurring_subscriptions` |

## 4. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `recurring_subscriptions` | `user_id, frequency, preferred_day, preferred_time, partner_id, address_*, status='active'` | INSERT |
