# PAGE: Broadcast Push Notifications

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/admin/broadcast` |
| Source File | `src/app/(admin)/admin/broadcast/page.tsx` |
| Auth | Admin |

## 2. FEATURES & FUNCTIONALITY
- **Broadcast Form** (`BroadcastForm`): Title, body, target audience (all/customers/partners), schedule
- **Broadcast History**: Table of sent broadcasts with delivery stats
- **Broadcast Row** (`BroadcastRow`): Status badge, sent count, scheduled time
- **Cancel Scheduled**: Cancel pending broadcast before send time

## 3. COMPONENT TREE
```
BroadcastPage (Server)
├── BroadcastForm (Client) — create new
└── BroadcastRow (Client) × N — history with cancel
```

## 4. SERVER ACTIONS
| Action | File | Description |
|--------|------|-------------|
| `createBroadcast` | `admin/broadcast/_actions/create-broadcast.ts` | INSERT `broadcasts` |
| `cancelBroadcast` | `admin/broadcast/_actions/cancel-broadcast.ts` | UPDATE `broadcasts.status='cancelled'` |

## 5. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `broadcasts` | `id, title, body, target, status, scheduled_at, sent_count, created_at` | SELECT + INSERT + UPDATE |
