# PAGE: Service Schedule (`/p/schedule`)

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/p/schedule?view=month\|week\|day\|list` |
| Source File | `src/app/(partner)/p/schedule/page.tsx` (391 lines) |
| Allowed Roles | All Partner Members (scope filtered by role) |
| Auth Required | Yes |

## 2. FEATURES & FUNCTIONALITY
- **4 Calendar Views**: Month (shadcn Calendar + mini panel) / Week (7-day list) / Day (today only) / List (all, default)
- **Role-Based Scope**: Owner = all bookings; Lead/Worker = team_id filtered only
- **Booking Cards**: Time, status badge (confirmed/assigned/in_progress/completed), district, area
- **Status Color Map**: 5 states with Korean labels

## 3. COMPONENT TREE
```
SchedulePage (Server)
├── View Tab Navigation
├── MonthCalendarView (Client "use client") — shadcn calendar
├── WeekView (Server)
├── DayView (Server)
└── ListView (Server) — grouped by date
```

## 4. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `bookings` | `id, scheduled_date, scheduled_time, status, partner_id, team_id` | SELECT |
| `cleaning_requests` | `district, dong, area_pyeong, category_id` | JOIN |
