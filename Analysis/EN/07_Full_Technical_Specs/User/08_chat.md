# PAGE: Booking Chat

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/bookings/[id]/chat` |
| Source File | `src/app/(user)/bookings/[id]/chat/page.tsx` |
| Allowed Roles | Booking participant (Customer or Partner) |
| Auth Required | Yes |
| Rendering | Server → Client (Realtime chat) |

## 2. FEATURES & FUNCTIONALITY
- **Real-time Messaging**: Instant text exchange between Customer and Partner
- **Message History**: Loads previous messages from `chat_messages` table
- **Auto-scroll**: New messages appear at bottom without scroll jump
- **0ms Latency**: Uses State Append strategy (no `router.refresh()`)

## 3. COMPONENT TREE
```
ChatPage (Server) — loads initial messages
└── ChatClient (Client "use client")
    ├── Message List (scrollable)
    ├── Message Input (textarea + send button)
    └── useChatRealtime Hook
```

## 4. SERVER ACTIONS & API
| Action | File | Description |
|--------|------|-------------|
| `sendChatMessage` | `bookings/[id]/chat/_actions/send-chat-message.ts` | INSERT into `chat_messages` |

## 5. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `chat_rooms` | `id, booking_id` | SELECT (find or create room) |
| `chat_messages` | `id, room_id, sender_id, content, created_at` | SELECT + INSERT + Realtime |
| `bookings` | `id, user_id, partner_id` | JOIN (participant verification) |

## 6. REALTIME SUBSCRIPTIONS
| Hook | Channel | Event | Table | Filter |
|------|---------|-------|-------|--------|
| `useChatRealtime` | `chat:{roomId}` | `INSERT` | `chat_messages` | `room_id=eq.{roomId}` |

**Strategy**: Direct State Append (0ms latency, no router refresh)

## 7. RLS POLICIES
- `chat_messages_participant_all`: Only room participants can read/write
- `chat_rooms_participant_select`: Only booking parties can access room
