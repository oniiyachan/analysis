# PAGE: Audit Log

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/admin/audit` |
| Source File | `src/app/(admin)/admin/audit/page.tsx` |
| Auth | Admin (Super preferred) |

## 2. FEATURES & FUNCTIONALITY
- **Audit Log Table**: All admin actions (who, what, when, affected entity)
- **Filter Bar** (`AuditFilterBar`): Date range, action type, actor
- **Audit Row** (`AuditRow`): Action, actor name, entity type, timestamp
- **Pagination**: Cursor-based for large datasets

## 3. COMPONENT TREE
```
AuditPage (Server)
├── AuditFilterBar (Client) — filters
└── AuditRow (Server) × N — log entries
```

## 4. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `audit_logs` | `id, action, actor_id, entity_type, entity_id, metadata, created_at` | SELECT (with filters, cursor pagination) |
