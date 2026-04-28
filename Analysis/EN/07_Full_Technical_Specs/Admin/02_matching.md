# PAGE: Matching Management (Kanban Pipeline)

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/admin/matching` |
| Source File | `src/app/(admin)/admin/matching/page.tsx` (115 lines) |
| Auth | Admin |
| Rendering | `force-dynamic` Server → Client `MatchingRealtimeBoundary` |

## 2. FEATURES & FUNCTIONALITY
- **6-Column Kanban Board**: bidding / bids_received / pending_payment / confirmed / in_progress / completed
- **Request Cards**: Category, area (pyeong), district, bid count, AI estimate
- **Real-time Updates**: `MatchingRealtimeBoundary` wrapper with live pulse indicator
- **Top 10 per Column**: Most recent 10 requests per status

## 3. COMPONENT TREE
```
MatchingPage (Server)
└── MatchingRealtimeBoundary (Client "use client")
    └── 6-column Kanban Grid (Server children)
```

## 4. DATABASE TABLES
| Table | Columns | Operation |
|-------|---------|-----------|
| `cleaning_requests` | `id, status, category_id, area_pyeong, district, bid_count, ai_estimate_avg, created_at` | SELECT (limit 200, grouped by status) |

## 5. REALTIME
| Component | Channel | Event | Table |
|-----------|---------|-------|-------|
| `MatchingRealtimeBoundary` | `cleaning_requests:all` | `UPDATE` | `cleaning_requests` |
