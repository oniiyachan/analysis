# PAGE: Partner Dashboard

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/p` |
| Source File | `src/app/(partner)/p/page.tsx` (507 lines) |
| Allowed Roles | Partner Member (Owner / Lead / Worker) |
| Auth Required | Yes → redirect `/login?next=/p` |
| Layout | `(partner)/p/layout.tsx` (sidebar navigation) |
| Rendering | `force-dynamic` Server Component |

## 2. FEATURES & FUNCTIONALITY
- **4 KPI Cards** (role-filtered):
  - Today's Bid Opportunities (new requests count) — Owner/Lead only
  - Today's Schedule (booking count) — All roles
  - This Week's Settlement (net amount) — Owner only
  - Rating (30-day average + review count) — All roles
- **Today's Action Cards**: Top 3 today bookings + Top 3 new bid opportunities
- **Tier Progress Widget**: Bronze/Silver/Gold progress bar — Owner/Lead only
- **Role-based Visibility Matrix**: `hasPartnerPermission(memberRole, permission)` controls KPI/section visibility
- **Status Guards**: `pending` → "Under Review" screen; `suspended` → "Account Suspended" screen
- **Super Admin Preview Mode**: `readPreviewMode() === "partner"` injects fixture data for UX testing

## 3. COMPONENT TREE
```
PartnerDashboard (Server)
├── TierProgressWidget (Client) — progress bar animation
├── KPI Cards (Server, map filtered by role)
├── Today Schedule Section (Server)
└── New Bid Opportunities Section (Server, Owner/Lead only)
```

## 4. SERVER ACTIONS & API
| Action | File | Description |
|--------|------|-------------|
| `getCurrentUser()` | `src/lib/auth/current-user.ts` | Auth check (cache shared) |
| `getCurrentPartnerMember()` | `src/lib/auth/partner-permissions.ts` | Get member role + partner_id + team_id |
| `hasPartnerPermission()` | `src/lib/auth/partner-permissions.ts` | RBAC check (bids.read, settlement.read) |
| `readPreviewMode()` | `src/lib/preview/preview-cookie.ts` | Admin preview mode flag |

## 5. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `partners` | `id, business_name, rating, review_count, total_completed, service_areas, status, tier` | SELECT |
| `partner_members` | `partner_id, profile_id, member_role, team_id` | SELECT (via getCurrentPartnerMember) |
| `cleaning_requests` | `id, district, category_id, area_pyeong, bid_count, bid_deadline, status='bidding'` | SELECT (filtered by service_areas IN) |
| `quotes` | `request_id, partner_id` | SELECT (exclude already-bid requests) |
| `bookings` | `id, scheduled_date, scheduled_time, status, partner_id, team_id` | SELECT (today filter) |
| `settlements` | `net_amount, status, scheduled_date, partner_id` | SELECT (weekly sum) |

## 6. REALTIME SUBSCRIPTIONS
None.

## 7. RLS POLICIES
- `partners_member_select`: Member reads own partner data
- `cleaning_requests_public_bidding`: Partners read bidding-status requests in their areas
- `bookings_partner_select`: Partner reads own bookings
- `settlements_partner_select`: Owner reads own settlements
