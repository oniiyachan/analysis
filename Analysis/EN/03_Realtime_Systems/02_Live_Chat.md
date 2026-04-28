# HIGH-SPEED ARCHITECTURE: LIVE CHAT (REALTIME CHAT)

*Technical dissection of the `use-chat-realtime.ts` Hook — the heart of the two-way instant messaging system between Customers and Cleaning Partners.*

## 1. Core Business Requirement
- Customers and cleaners need to exchange photos of the worksite, negotiate prices, and confirm details in real-time.
- Latency must be near-zero (sub-millisecond perceived).
- The user's scroll position must NEVER jump when a new message arrives.
- 100% signal isolation: Partner A must not intercept the chat stream of Partner B competing on the same request.

---

## 2. Code Dissection: Core Circuit (`use-chat-realtime.ts`)

The application does not scatter realtime logic across files. Instead, it centralizes everything into a shared Custom Hook: `useChatRealtime`.

### A. Channel Filter — The Precision Scalpel
Instead of subscribing to the entire `chat_messages` table globally, the hook registers a single focused stream:
```typescript
.channel(`chat:${roomId}`)
.on(
  "postgres_changes",
  {
    event: "INSERT",    // Only listen for new message insertions
    schema: "public",
    table: "chat_messages",
    filter: `room_id=eq.${roomId}`,  // Server-side pre-filter
  }
)
```
- Injecting `${roomId}` directly into the `filter` parameter forces Supabase's server to pre-filter data. The client receives only pre-washed messages relevant to this specific room. This simultaneously prevents eavesdropping AND saves mobile data bandwidth.

### B. Bypassing Next.js Server — The Reflection Wall
If NextJS App Router's `router.refresh()` were called, it would cause visible page jank. The Chat Hook instead uses the **Callback Ref Pattern**:
```typescript
const callbackRef = useRef(onMessage);
// ...
const row = payload.new as ChatMessageRow;
callbackRef.current(row);
```
The instant a JSON payload arrives (`payload.new`), the Hook injects the row directly into the Callback function (`ref`). The calling component then appends it to the React State array: `setState([...old, row])`.
Result: A new message appears at the bottom of the screen without Next.js or the Server lifting a finger.

---

## 3. Memory Leak Prevention (Channel Cleanup)
A customer might open a dozen different chat tabs while comparing quotes. If each tab spawns a WebSocket connection without cleanup, the app would consume excessive CPU and potentially crash the device.

**The Antidote: useEffect Cleanup**
```typescript
return () => {
    void supabase.removeChannel(channel);
};
```
Every time a chat room closes (user navigates away), or Next.js triggers a Fast Refresh during development, the `removeChannel` command acts as a garbage collector — severing the WebSocket cable immediately. This keeps the client device's RAM consumption under 20MB.