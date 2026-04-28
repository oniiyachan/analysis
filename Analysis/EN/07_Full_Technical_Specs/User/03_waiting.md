# PAGE: Waiting Room (Bid Countdown)

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/waiting/[id]` (accepts `?t=<guest_session_token>` magic link) |
| Source File | `src/app/(user)/waiting/[id]/page.tsx` (218 lines) |
| Allowed Roles | Request Owner (Customer or Guest with valid cookie) |
| Auth Required | No (Guest with `guest_session_token` cookie supported) |
| Rendering | `force-dynamic` Server → Client `WaitingClient` |

## 2. FEATURES & FUNCTIONALITY
- **24-Hour Countdown Timer**: `setInterval(tick, 1000)` decrementing to `bid_deadline`
- **Live Bid Cards**: Realtime `INSERT` on `quotes` → cards appear instantly with animation
- **Auto JOIN Fetch**: When new quote arrives via WebSocket, silently fetches `partners` data (name, rating, avatar)
- **Magic Link Entry**: Guest email CTA includes `?t=<token>` → verifies → sets httpOnly cookie → redirects (strips token from URL for security)
- **Extend Bidding**: "Open to 5 more" button → `extendBidsAction` → updates `is_extended=true`, `bid_extend_max`
- **Status Auto-Routing**: `pending_payment+` → redirect `/bookings`; `expired` → sad face apology UI
- **AI Estimate Display**: Shows server-calculated average estimate for context

## 3. COMPONENT TREE
```
WaitingPage (Server)
└── WaitingClient (Client "use client")
    ├── Countdown Timer (setInterval)
    ├── Quote Card List (dynamic)
    └── Extend Button (conditional)
```

## 4. SERVER ACTIONS & API
| Action | File | Description |
|--------|------|-------------|
| `extendBidsAction` | `waiting/[id]/_actions/extend-bids.ts` | SET `is_extended=true`, increase `bid_extend_max` |
| `getCurrentUser()` | `src/lib/auth/current-user.ts` | Auth session check |
| `getGuestToken()` | `src/lib/auth/guest-session.ts` | Read `guest_session_token` from cookie |
| `setGuestCookie()` | `src/lib/auth/guest-session.ts` | Set httpOnly cookie on magic link entry |

## 5. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `cleaning_requests` | `id, status, bid_count, bid_base_max, bid_extend_max, bid_deadline, is_extended, ai_estimate_avg, guest_session_token` | SELECT |
| `quotes` | `id, total_price, estimated_hours, worker_count, included_services, message, created_at` | SELECT + Realtime INSERT listener |
| `partners` | `id, business_name, rating, review_count, total_completed, certifications` | JOIN via quotes foreign key |

## 6. REALTIME SUBSCRIPTIONS
| Hook/Component | Channel | Event | Table | Filter |
|---------------|---------|-------|-------|--------|
| `WaitingClient` | `quotes:request:{id}` | `INSERT` | `quotes` | `request_id=eq.{id}` |

**Strategy**: Direct State Append (NOT `router.refresh()`). New quote card is pushed into React State array for 0ms latency.

## 7. ENVIRONMENT VARIABLES
| Variable | Required | Purpose |
|----------|----------|---------|
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Guest flow bypasses RLS with service client |

## 8. RLS POLICIES
- `quotes_user_read`: Authenticated customer reads quotes for their own request
- Guest path: `createServiceClient()` after verifying `guest_session_token` matches request

## 9. EXTERNAL INTEGRATIONS
None.
