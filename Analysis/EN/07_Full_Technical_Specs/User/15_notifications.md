# PAGE: Notifications Center

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/notifications` |
| Source File | `src/app/(user)/notifications/page.tsx` |
| Auth Required | Yes |

## 2. FEATURES & FUNCTIONALITY
- **Notification List**: Chronological feed (bid arrived, booking confirmed, service completed, etc.)
- **Read/Unread Markers**: Bold for unread, gray for read
- **Mark as Read**: Tap to mark individual / "Mark all" button
- **Deep Links**: Each notification links to relevant page

## 3. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `notifications` | `id, user_id, type, title, body, is_read, reference_type, reference_id, created_at` | SELECT + UPDATE |
