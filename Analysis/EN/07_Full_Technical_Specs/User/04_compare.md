# PAGE: Bid Comparison Matrix

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/compare/[id]` (id = cleaning_request ID) |
| Source File | `src/app/(user)/compare/[id]/page.tsx` (187 lines) |
| Allowed Roles | Registered Customer (request owner only) |
| Auth Required | Yes → redirect `/login?next=/compare/{id}` |
| Rendering | `force-dynamic` Server → Client `CompareList` |

## 2. FEATURES & FUNCTIONALITY
- **Quote Card Grid**: All submitted quotes sorted by price ascending
- **Side-by-Side Compare**: Checkbox select up to 3 → floating "Compare" modal
- **Filter Chips**: Client-side sort by price / rating / experience
- **Favorite Heart Toggle**: Tap heart → persist to `partner_favorites` table
- **Partner Stats**: Rating stars, review count, total jobs completed, certification tags
- **Header**: "고객님을 위한 최적의 파트너를 찾았습니다" + analysis completion badge

## 3. COMPONENT TREE
```
ComparePage (Server)
└── CompareList (Client "use client")
    ├── Filter Chip Row
    ├── Quote Cards (map)
    │   └── FavoriteHeart (Client)
    └── CompareModal (Client) — side-by-side overlay
```

## 4. SERVER ACTIONS & API
| Action | File | Description |
|--------|------|-------------|
| `toggleFavorite` | `partner-actions/toggle-favorite.ts` | INSERT/DELETE `partner_favorites` row |

## 5. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `cleaning_requests` | `id, user_id, status, category_id, area_pyeong, district` | SELECT (ownership check) |
| `quotes` | `id, request_id, total_price, estimated_hours, worker_count, included_services, message, selected_schedule, created_at` | SELECT |
| `partners` | `id, business_name, rating, review_count, total_completed, certifications, service_categories` | JOIN via quotes FK |
| `partner_favorites` | `user_profile_id, partner_id` | SELECT + INSERT/DELETE |

## 6. REALTIME SUBSCRIPTIONS
None.

## 7. RLS POLICIES
- `quotes_user_read`: Filter quotes to owner's request only
- `cleaning_requests_user_select`: Verify request ownership
- `partner_favorites_user_*`: User manages only own favorites

## 8. EXTERNAL INTEGRATIONS
None.
