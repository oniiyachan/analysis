# PHÂN TÍCH REALTIME: CHAT TRỰC TUYẾN (use-chat-realtime.ts)

## 1. CHỨC NĂNG ĐỂ LÀM GÌ?
Cung cấp khả năng nhắn tin sống (Live Chat) giữa Thợ Dọn Dẹp và Khách Hàng. Giống hệt như Zalo hay Messenger. Người này gõ xong ấn gửi là máy người kia lập tức hiện tin nhắn lên luôn.

## 2. NÓ HOẠT ĐỘNG THẾ NÀO?
- **Đầu não ẩn**: File `use-chat-realtime.ts`.
- Hành vi này luôn dỏng tai lên nghe ngóng bảng `chat_messages` (Bảng tin nhắn).
- Máy tính chỉ bắt những cái tin nhắn nào có gắn từ khóa là `room_id = [Mã phòng của bạn]`. Những tin nhắn của phòng khác đăng chém gió sẽ bị làm lơ đi để tiết kiệm mạng điện thoại tải.

## 3. LÀM SAO ĐỂ GIỮ APP MƯỢT?
- Ngay khi máy bắt được biến số "Có người vừa nhả tin nhắn" (Lệnh `INSERT`), hệ thống sẽ lấy nguyên cục tin nhắn đó ép thẳng vào màn hình người dùng qua lệnh `onMessage(row)`.
- Nhờ cách này, lúc người dùng đang vuốt danh sách đọc tin nhắn cũ... màn hình không hề bị giật hoặc văng lên đầu, đảm bảo Trải nghiệm ngời dùng (UX) cực tốt.

## 4. CHẶN HACKER NHÌN TRỘM LÀM SAO?
- Thuật toán RLS của Database khóa cổng `chat_messages_participant_all`.
- Có nghĩa là dù một tên Hacker có biết Mã số Phòng Chat của bạn, nhưng nếu Nick name của hắn không phải là "Khách hàng mua" hoặc "Thợ dọn dẹp" của chính cái đơn đặt hàng đấy, tín hiệu kết nối WebSocket lập tức bị chém đứt. Không ai có khả năng nghe trộm.
