# PAGE: CS Complaint Form

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/cs/new` |
| Source File | `src/app/(user)/cs/new/page.tsx` |
| Auth Required | Yes |

## 2. FEATURES & FUNCTIONALITY
- **Ticket Form**: Select booking → describe issue → upload evidence photos → submit
- **Category Selection**: Damage / Incomplete / Late / Other
- **Photo Evidence**: Up to 5 photos attached

## 3. SERVER ACTIONS
| Action | File | Description |
|--------|------|-------------|
| `submitTicket` | `cs/new/_actions/submit-ticket.ts` | INSERT `cs_tickets` |

## 4. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `cs_tickets` | `id, booking_id, user_id, category, description, status='open', created_at` | INSERT |
