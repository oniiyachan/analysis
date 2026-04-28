# TRANG: Chat Đặt Lịch
## 1. URL: `/bookings/[id]/chat` | Vai trò: Bên tham gia booking
## 2. CHỨC NĂNG: Nhắn tin thời gian thực, lịch sử tin nhắn, tự cuộn, State Append 0ms
## 3. SERVER ACTIONS: `sendChatMessage` → INSERT `chat_messages`
## 4. REALTIME: `useChatRealtime` channel `chat:{roomId}` | INSERT
## 5. BẢNG: `chat_rooms`, `chat_messages`, `bookings`
## 6. RLS: `chat_messages_participant_all`, `chat_rooms_participant_select`
