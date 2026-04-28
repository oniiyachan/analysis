# PAGE: Partner Chat (`/p/schedule/[bookingId]/chat`)

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/p/schedule/[bookingId]/chat` |
| Source File | `src/app/(partner)/p/schedule/[bookingId]/chat/page.tsx` |
| Auth Required | Yes |

## 2. FEATURES & FUNCTIONALITY
- **Real-time Messaging**: Same as user chat — instant exchange with customer
- **State Append Strategy**: 0ms latency, no router.refresh()

## 3. SERVER ACTIONS
| Action | File | Description |
|--------|------|-------------|
| `sendChatMessage` | `p/schedule/[bookingId]/chat/_actions/send-chat-message.ts` | INSERT `chat_messages` |

## 4. REALTIME
| Hook | Channel | Event | Table | Filter |
|------|---------|-------|-------|--------|
| `useChatRealtime` | `chat:{roomId}` | `INSERT` | `chat_messages` | `room_id=eq.{roomId}` |

## 5. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `chat_messages` | `id, room_id, sender_id, body, created_at` | SELECT + INSERT |
| `chat_rooms` | `id, booking_id` | SELECT |
