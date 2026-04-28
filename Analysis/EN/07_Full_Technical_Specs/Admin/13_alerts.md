# PAGE: Alerts Dashboard

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/admin/alerts` |
| Source File | `src/app/(admin)/admin/alerts/page.tsx` |
| Auth | Admin |

## 2. FEATURES & FUNCTIONALITY
- **Alert Feed**: System anomalies (expired with 0 bids, settlement failures, unusual patterns)
- **Alert Row** (`AlertRow`): Severity icon, message, timestamp, resolve button
- **Bulk Actions** (`BulkActions`): Select multiple → bulk resolve
- **Resolve Actions**: Mark individual / bulk resolve
- **Severity Levels**: critical / warning / info

## 3. COMPONENT TREE
```
AlertsPage (Server)
├── BulkActions (Client) — select all + bulk resolve
└── AlertRow (Client) × N — individual resolve
```

## 4. SERVER ACTIONS
| Action | File | Description |
|--------|------|-------------|
| `resolveAlert` | `admin/alerts/_actions/resolve-alert.ts` | UPDATE `system_alerts.resolved_at` |
| `resolveBulk` | `admin/alerts/_actions/resolve-bulk.ts` | Bulk resolve multiple alerts |

## 5. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `system_alerts` | `id, type, severity, message, resolved_at, created_at` | SELECT + UPDATE |
