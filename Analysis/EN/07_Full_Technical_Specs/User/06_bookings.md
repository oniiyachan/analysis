# PAGE: Bookings List (My Bookings)

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/bookings` |
| Source File | `src/app/(user)/bookings/page.tsx` (249 lines) |
| Allowed Roles | Registered Customer |
| Auth Required | Yes → redirect `/login?next=/bookings` |
| Rendering | `force-dynamic` Server Component (no client JS) |

## 2. FEATURES & FUNCTIONALITY
- **Summary Stats**: 3 cards — Active bookings count / Total completed / Cumulative spend (만원)
- **Filter Tabs**: 전체 / 견적 진행중 / 서비스 예정 / 진행중 / 지난 내역 (static UI, client filter Phase 2)
- **Booking Cards**: Color-coded status badge, category+area label, district, bid count, price
- **Smart Routing**: Card tap → `/waiting/{id}` if still bidding; `/bookings/{bookingId}` if booking exists
- **Empty State**: Friendly 🧹 emoji + CTA "무료 견적 받기" → `/quote`
- **Status Badge Map**: 10 states (bidding → bids_received → pending_payment → confirmed → assigned → in_progress → completed → cancelled → expired → disputed)

## 3. COMPONENT TREE
```
BookingsPage (Server) — single file, no child components
├── Summary Stats Section (3 cards)
├── Filter Tabs (5 buttons)
└── Card List (map) or Empty State
```

## 4. SERVER ACTIONS & API
| Action | File | Description |
|--------|------|-------------|
| `getCurrentUser()` | `src/lib/auth/current-user.ts` | Auth + cache() sharing |

## 5. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `cleaning_requests` | `id, status, category_id, sub_category_id, area_pyeong, region, district, ai_estimate_avg, bid_count, created_at, bid_deadline, user_id` | SELECT (filtered by `user_id`) |
| `bookings` | `id, status, total_amount` | LEFT JOIN via cleaning_requests |

## 6. REALTIME SUBSCRIPTIONS
None.

## 7. RLS POLICIES
- `cleaning_requests_user_select`: User reads only own requests
- `bookings_user_select`: User reads only own bookings

## 8. EXTERNAL INTEGRATIONS
None.
