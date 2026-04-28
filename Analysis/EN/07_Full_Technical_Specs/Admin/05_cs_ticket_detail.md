# PAGE: CS Ticket Detail

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/admin/cs/[id]` |
| Source File | `src/app/(admin)/admin/cs/[id]/page.tsx` |
| Auth | Admin |

## 2. FEATURES & FUNCTIONALITY
- **Ticket Detail View**: Description, photos, customer info, booking reference
- **Reply Form**: Admin writes response, changes status
- **Resolution Actions**: Mark as resolved, escalate

## 3. SERVER ACTIONS
| Action | File | Description |
|--------|------|-------------|
| `replyAction` | `admin/cs/[id]/_actions/reply-action.ts` | INSERT reply + UPDATE ticket status |

## 4. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `cs_tickets` | `id, status, description, photos, profile_id, booking_id` | SELECT + UPDATE |
| `cs_ticket_replies` | `ticket_id, author_id, body, created_at` | INSERT |
