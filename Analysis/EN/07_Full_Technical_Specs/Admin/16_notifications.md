# PAGE: Admin Notifications

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/admin/notifications` |
| Source File | `src/app/(admin)/admin/notifications/page.tsx` |
| Auth | Admin |

## 2. FEATURES & FUNCTIONALITY
- **Admin Notification Feed**: System alerts, CS escalations, settlement issues
- **Read/Unread Toggle**: Mark notifications as read/unread
- **Notification Types**: cs_escalation, settlement_failed, partner_application, system_alert

## 3. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `notifications` | `id, type, title, body, is_read, profile_id, created_at` | SELECT + UPDATE (filtered by admin profile) |
