# PAGE: Submit Bid Form (`/p/bids/[requestId]`)

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/p/bids/[requestId]` |
| Source File | `src/app/(partner)/p/bids/[requestId]/page.tsx` |
| Allowed Roles | Owner / Lead |
| Auth Required | Yes |

## 2. FEATURES & FUNCTIONALITY
- **Two-Pane Layout** (`TwoPane`): Left = request details (photos, area, location); Right = bid form
- **Bid Form** (`BidForm`): Total price, estimated hours, worker count, included services, message
- **Request Photos**: Display contamination photos from `quote-photos` Storage
- **Bid Templates**: Pre-fill from saved templates

## 3. SERVER ACTIONS
| Action | File | Description |
|--------|------|-------------|
| `submitBid` | `p/bids/[requestId]/_actions/submit-bid.ts` | INSERT into `quotes` table |

## 4. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `cleaning_requests` | full row | SELECT (request details) |
| `quotes` | `request_id, partner_id, total_price, estimated_hours, worker_count, included_services, message, status='submitted'` | INSERT |
