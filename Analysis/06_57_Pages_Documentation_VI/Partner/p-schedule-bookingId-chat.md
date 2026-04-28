# TÀI LIỆU TRANG: MÁY BỘ ĐÀM CẦM TAY (P-SCHEDULE-BOOKINGID-CHAT)

> **Lời ngỏ**: Tài liệu dịch thuật bình dân, nhắm tới việc giải thích mạch máu kinh doanh mộc mạc nhất cho Sếp và Đội Vận Hành.

---

## 1. THÔNG TIN CHUNG 
- **Tên màn hình**: Máy Bộ Đàm Cầm Tay
- **Thư mục Code**: `src/app/(partner)/p/schedule-bookingId-chat/page.tsx`

---

## 2. TRANG NÀY SINH RA ĐỂ LÀM GÌ?
Hãy hình dung màn hình này chính là **Phần mềm Zalo nội bộ của riêng Đơn hàng này. Cãi nhau, báo khách trễ giờ, gửi hình nhà dơ bẩn qua đây hết.**

- Nó là lưỡi đao giải quyết đứt điểm một luồng hành vi của người dùng trực tiếp sinh ra lợi nhuận hoặc tạo độ bám dính dịch vụ.

---

## 3. LUẬT RÀNG BUỘC KÉP CỦA HỆ THỐNG
- **Dữ liệu**: Gắn thẻ Realtime `chat_messages` và bảo mật 2 lớp RLS chỉ cho phép Thợ được phân công và Khách của nhà đó đọc tin.
- Áp lực được luân chuyển bởi máy chủ Edge Network, không giật lag ngay cả ở băng thông yếu.