# REALTIME ANALYSIS: NOTIFICATION BELL

> **Core Engine**: `use-notifications-realtime.ts`

## EXECUTION MODEL
- Bound to the `notifications` table filtered by `user_id`.
- **Render Paradigm**: Unlike Chat, this triggers a `router.refresh()`. 
- **Why?**: Forces the Server to securely recalculate "Unread Counts" using pristine secure execution nodes, completely centralizing logic to avoid client-side spoofing.