# PAGE: Admin Dashboard

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/admin` |
| Source File | `src/app/(admin)/admin/page.tsx` (261 lines) |
| Allowed Roles | Admin / Super Admin |
| Auth Required | Yes (admin role check in layout) |
| Layout | `(admin)/admin/layout.tsx` (sidebar with navigation) |
| Rendering | `force-dynamic` Server Component |

## 2. FEATURES & FUNCTIONALITY
- **6 Today KPI Grid** (`DashboardKpiGrid`): Today's key metrics (requests, active bookings, revenue, CS queue, conversion, churn)
- **8 Quick Actions Hub** (`DashboardQuickActions`): Shortcut buttons to common admin tasks
- **Revenue Trend Chart** (`DashboardRevenueTrend`): Recharts line chart with 3 period tabs (Daily 14d / Weekly 8w / Monthly 6m)
- **4 Operation KPI Cards**: Today new requests, Active bookings, Today settlement, CS queue
- **Matching Pipeline**: 7-column kanban (bidding → bids_received → pending_payment → confirmed → assigned → in_progress → completed)
- **Todo Widget** (`DashboardTodoWidget`): Aggregated action items from 4 sources
- **Member Stats**: Active partners count + Cumulative users count
- **Anomaly Detection**: Expired requests with 0 bids warning

## 3. COMPONENT TREE
```
AdminDashboard (Server)
├── DashboardKpiGrid (Client) — 6 animated KPI
├── DashboardQuickActions (Client) — 8 action buttons
├── DashboardRevenueTrend (Client) — Recharts chart
├── KPI Cards (Server) × 4
├── Pipeline Kanban (Server) — 7 columns
├── DashboardTodoWidget (Client) — aggregated todos
├── Partner/User Stats (Server)
└── Anomaly Detection (Server)
```

## 4. SERVER ACTIONS & API
| Action | File | Description |
|--------|------|-------------|
| `revenueTrend()` | `src/lib/domain/analytics/revenue-trend.ts` | Compute daily/weekly/monthly revenue from `payments` |

## 5. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `cleaning_requests` | `id, status, created_at` | SELECT (count by status, today filter) |
| `settlements` | `net_amount, status, scheduled_date` | SELECT (today sum) |
| `cs_tickets` | `id, status` | SELECT (open count) |
| `partners` | `id, status='active'` | SELECT (count) |
| `profiles` | `id, role='customer'` | SELECT (count) |
| `payments` | `amount, created_at` | SELECT (revenue trend) |

## 6. REALTIME SUBSCRIPTIONS
None on dashboard (Matching page has realtime).

## 7. ENVIRONMENT VARIABLES
| Variable | Required | Purpose |
|----------|----------|---------|
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Revenue trend query via service client |
