# TRANG: Chat Đối Tác (`/p/schedule/[bookingId]/chat`)
## 1. URL: `/p/schedule/[bookingId]/chat`
## 2. CHỨC NĂNG: Nhắn tin thời gian thực với khách, chiến lược State Append (0ms)
## 3. SERVER ACTIONS: `sendChatMessage` → INSERT `chat_messages`
## 4. REALTIME: `useChatRealtime` channel `chat:{roomId}` | INSERT | `chat_messages`
## 5. BẢNG: `chat_messages` (SELECT + INSERT), `chat_rooms` (SELECT)
