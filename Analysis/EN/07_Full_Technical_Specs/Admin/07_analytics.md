# PAGE: Analytics Dashboard

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/admin/analytics` |
| Source File | `src/app/(admin)/admin/analytics/page.tsx` |
| Auth | Admin |

## 2. FEATURES & FUNCTIONALITY
- **Analytics Charts** (`AnalyticsCharts`): Revenue, bookings, conversion rate over time
- **Region Tab** (`RegionTab`): Geographic performance analysis
- **Region Bar Chart** (`RegionBarChart`): By-district booking volume
- **Region Coverage Table** (`RegionCoverageTable`): Partner coverage ratio per district

## 3. COMPONENT TREE
```
AnalyticsPage (Server)
├── AnalyticsCharts (Client) — Recharts
├── RegionTab (Client)
│   ├── RegionBarChart (Client)
│   └── RegionCoverageTable (Server)
```

## 4. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `bookings` | `id, status, scheduled_date, partner_id` | SELECT (aggregate) |
| `cleaning_requests` | `id, status, district, created_at` | SELECT (aggregate) |
| `partners` | `id, service_areas` | SELECT (coverage calc) |
| `payments` | `amount, created_at` | SELECT (revenue) |
