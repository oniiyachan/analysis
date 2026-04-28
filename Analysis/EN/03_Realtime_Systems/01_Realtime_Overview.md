# REALTIME SYSTEM ARCHITECTURE OVERVIEW

*Core technical analysis of the WebSocket-driven live-connection technology powering CleanHi's zero-latency web updates without page reloads.*

## 1. Core Engine Technology
CleanHi does **not** use legacy libraries like `Socket.io` or maintain expensive stateful Node.js servers.
The entire project is built on **Supabase Realtime** — capturing data change events directly from the PostgreSQL database layer (`postgres_changes`).

Whenever an `INSERT`, `UPDATE`, or `DELETE` succeeds in the Database, PostgreSQL broadcasts the event payload down to connected clients via WebSocket channels.

> **Example**: When a new row is inserted into the `chat_messages` table, both users in the conversation instantly receive the JSON payload without refreshing the page.

---

## 2. The Two Parallel Architectural Strategies
Thanks to Next.js 16 (App Router), the CleanHi development team intelligently split the Realtime mechanism into 2 distinct frontlines to optimize client CPU usage:

### Strategy A: Direct Client State Injection (State Append — 0ms Latency)
- **Used for**: **Live Chat** (`useChatRealtime` hook).
- **Mechanism**: When a `postgres_changes` signal arrives, the app does NOT bother the Next.js Server. Instead, it takes the data payload and directly appends/pushes it into the on-screen display list (React State).
- **Rationale**: In the chat interface, the user is actively scrolling. This design keeps UI jank at absolute 0ms. The scrollbar never jumps back to a previous position.

### Strategy B: Server Tree Re-render (Next.js Router Refresh)
- **Used for**: **Admin Kanban**, **Notification Management**, **Customer Bid Waiting Room**.
- **Mechanism**: When a Realtime signal is captured, the client ignores the payload data entirely. It uses the event purely as a TRIGGER to invoke `router.refresh()`. This forces Next.js to re-execute the Server Component tree, fetching the latest data with full RLS enforcement, then streaming the updated HTML back to the client.
- **Rationale**: DRY Code. Complex Kanban column sorting, bid counting, and settlement calculations stay locked inside the Server. The client simply listens for "something changed" → forces reload. The Server hides all sensitive business logic from the browser.

---

## 3. Dual-Layer Security Gates

Realtime systems are inherently vulnerable to data leaks (Listener Spying) if not properly shielded. CleanHi applies 2 layers of armor:

1. **Row Level Security (RLS) at Database**: If a malicious partner opens an anonymous WebSocket to eavesdrop on another partner's chat room, the RLS policy `chat_messages_participant_all` freezes the signal at the PostgreSQL gateway. Data dies at the server door.
2. **Channel Filter Scoping**: Instead of listening to the entire global event stream, the code hard-codes channel parameters: `.channel("chat:${roomId}")` with a mandatory filter `room_id=eq.${roomId}`. This narrows millions of events into a precise drip-feed. The cleanup hook `supabase.removeChannel(channel)` ensures RAM on the client device stays under 20MB.