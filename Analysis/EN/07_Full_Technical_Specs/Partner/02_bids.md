# PAGE: Bid Management (`/p/bids`)

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/p/bids?tab=new\|pending\|won\|lost\|templates` |
| Source File | `src/app/(partner)/p/bids/page.tsx` (591 lines) |
| Allowed Roles | Owner / Lead (Worker → redirect to `/p`) |
| Auth Required | Yes |

## 2. FEATURES & FUNCTIONALITY
- **5-Tab Interface**: New Quotes / Pending / Won / Lost / Templates
- **4 Desktop KPI Cards**: New count, Pending count, Win Rate %, Average Bid Price
- **New Tab**: Geo-filtered open requests (district IN service_areas), exclude already-bid
- **History Tabs**: Filter own quotes by status (submitted / selected / not_selected / expired)
- **Responsive**: Mobile card list / Desktop data table (`BidsTable` components)
- **Template Tab**: Saved bid templates (Phase 2 placeholder)

## 3. COMPONENT TREE
```
BidsPage (Server)
├── KPI Cards (Server, desktop only)
├── Tab Navigation (5 tabs with badge counts)
├── NewTab → NewBidsTable (Client)
├── HistoryTab → MyBidsTable (Client)
└── TemplatesTab (Server placeholder)
```

## 4. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `cleaning_requests` | `id, district, dong, category_id, sub_category_id, area_pyeong, bid_count, ai_estimate_avg, bid_deadline, created_at` | SELECT (status=bidding, area filter) |
| `quotes` | `id, status, request_id, total_price, partner_id, created_at` | SELECT |
| `partners` | `id, service_areas, status` | SELECT |
