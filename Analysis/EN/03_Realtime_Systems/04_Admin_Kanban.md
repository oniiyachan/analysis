# REALTIME ANALYSIS: ADMIN KANBAN BOARD (use-matching-realtime.ts)

## 1. Who Uses This & What Does It Do?
This feature is exclusively for the Admin Operations staff on the Matching Management screen (`/admin/matching`).
It renders a drag-and-drop column board (similar to Trello). Customer orders appear as sticky cards. Thanks to realtime technology, the operations manager can sit back and watch: when a customer creates a new request, a card automatically spawns; when a partner submits a bid, the card automatically slides to the "Bids Received" column. Everything happens live without manual page reloads.

## 2. How Does It Work?
This hook simultaneously listens to **2 database tables at once**:
1. **`cleaning_requests` table**: Monitors new order creation (INSERT) and status transitions (UPDATE) — e.g. `bidding` → `bids_received` → `confirmed`.
2. **`quotes` table**: Monitors bid submissions (INSERT). Every time a partner submits a price, the Kanban board's bid counter automatically increments: "+1 bid received."

## 3. How Does It Handle High Volume?
Since this is the Admin dashboard, administrators must see **ALL orders across the entire system** (there is no room-ID filter like Chat).
Therefore, every time a change event fires, the admin client issues a `router.refresh()` command — forcing the server to reload the complete Kanban card dataset with fresh sorting, counting, and RLS-enforced data. No visible flicker or delay.

Any non-admin employee who attempts to connect to this channel will be immediately rejected by the RLS policy matrix — the Admin-only gate `app.has_admin_role()` ensures unauthorized sessions receive zero events.