# PAGE: Report Management

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/admin/reports` |
| Source File | `src/app/(admin)/admin/reports/page.tsx` |
| Auth | Admin |

## 2. FEATURES & FUNCTIONALITY
- **Report List**: Pre-defined report templates (daily, weekly, monthly)
- **CSV Export Button** (`ReportCsvButton`): Download report as CSV
- **Client Audit Recording**: Track report views via `record-client-audit.ts`

## 3. COMPONENT TREE
```
ReportsPage (Server)
├── ReportListItem (Server) × N
└── ReportCsvButton (Client)
```

## 4. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `reports` | `id, title, type, period, created_at` | SELECT |
| `audit_logs` | `action, entity_id, actor_id` | INSERT (on view) |
