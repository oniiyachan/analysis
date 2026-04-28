# PAGE: Quote Wizard (8-Step Estimate Request)

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/quote` (accepts `?category=home\|moving\|movein\|special\|regular`) |
| Source File | `src/app/(user)/quote/page.tsx` (34 lines) |
| Allowed Roles | Public (Guest + Registered Customer) |
| Auth Required | No — Guest flow with `guest_session_token` cookie |
| Layout | `(user)/layout.tsx` |
| Rendering | Server shell → Client `QuoteWizard` |

## 2. FEATURES & FUNCTIONALITY
- **8-Step Wizard**: Category → Sub-category → Area (pyeong) → Address (Kakao Daum) → Schedule (max 3 slots) → Condition level + Photo upload → Summary + AI Estimate → Submit
- **Guest Flow**: Non-members complete entire wizard. Email + phone collected at Step 7. `guest_session_token` cookie issued on submit.
- **AI Price Estimate**: Rendered from `service_categories.base_price_per_pyeong × area`
- **Photo Upload**: Drag-drop contamination photos → Supabase Storage `quote-photos` bucket
- **Preset Category**: `?category=home` pre-selects Step 1 choice
- **Form State**: React Hook Form + Zod validation. Multi-step state in memory, single DB INSERT at end.

## 3. COMPONENT TREE
```
QuotePage (Server)
└── QuoteWizard (Client "use client")
    ├── QuoteSidebar (Client) — desktop step indicator
    ├── QuoteMobileProgress (Client) — mobile step bar
    ├── Step1Category (Client)
    ├── Step2SubCategory (Client)
    ├── Step3Area (Client)
    ├── Step4Address (Client) — Kakao Daum postcode
    ├── Step5Schedule (Client) — date/time picker
    ├── Step6Options (Client) — condition + photo upload
    ├── Step7Summary (Client) — AI estimate + submit
    └── QuoteActions (Client) — prev/next buttons
```

## 4. SERVER ACTIONS & API
| Action | File | Description |
|--------|------|-------------|
| `submitQuoteAction` | `quote/_actions/submit-quote.ts` | Logged-in user → INSERT `cleaning_requests` with `user_id=auth.uid()` |
| `submitGuestQuoteAction` | `quote/_actions/submit-guest-quote.ts` | Guest → INSERT with `guest_session_token` + set httpOnly cookie |
| `getCurrentUser()` | `src/lib/auth/current-user.ts` | Determine guest vs member |

## 5. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `cleaning_requests` | `id, user_id, guest_session_token, category_id, sub_category_id, area_pyeong, address_road, address_detail, region, district, dong, latitude, longitude, preferred_schedule, condition_level, memo, status, ai_estimate_avg, bid_base_max, bid_deadline` | INSERT |
| `service_categories` | `id, name, base_price_per_pyeong` | SELECT (AI estimate calc) |
| `service_sub_categories` | `id, category_id, name` | SELECT (Step 2 dropdown) |
| Storage: `quote-photos` | blob files | UPLOAD |

## 6. REALTIME SUBSCRIPTIONS
None on this page.

## 7. ENVIRONMENT VARIABLES
| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase client init |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase client auth |

## 8. RLS POLICIES
- `cleaning_requests_user_insert`: Authenticated users insert own requests
- `quote_photos_user_upload`: Upload to `quote-photos/{requestId}/*` path
- Guest path: `createServiceClient()` bypasses RLS after validation

## 9. EXTERNAL INTEGRATIONS
| Service | Purpose |
|---------|---------|
| **Kakao Daum Postcode API** | Address auto-complete + geocoding in Step 4 |
