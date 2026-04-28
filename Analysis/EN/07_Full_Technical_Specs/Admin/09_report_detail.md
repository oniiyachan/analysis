# PAGE: Report Detail

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/admin/reports/[id]` |
| Source File | `src/app/(admin)/admin/reports/[id]/page.tsx` |
| Auth | Admin |

## 2. FEATURES & FUNCTIONALITY
- **Report Detail View** (`ReportDetailView`): Full rendered report with charts and data tables
- **CSV Download**: Export specific report data as CSV file

## 3. COMPONENT TREE
```
ReportDetailPage (Server)
└── ReportDetailView (Client) — charts + tables
```

## 4. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `reports` | full row | SELECT (single by id) |
