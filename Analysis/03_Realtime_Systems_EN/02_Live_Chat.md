# REALTIME ANALYSIS: IN-APP CHAT

> **Core Engine**: `use-chat-realtime.ts`

## EXECUTION MODEL
- Subscribes to `postgres_changes` specifically for `INSERT` events on the `chat_messages` table.
- **Traffic Optimization**: Employs rigorous `filter=room_id=eq.[ID]` arguments ensuring mobile clients do not download extraneous data streams.
- **Render Paradigm**: Directly pushes incoming payloads into the Client State array to bypass UI freezing, guaranteeing 0ms latency perception.