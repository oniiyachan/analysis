# TỔNG QUAN KIẾN TRÚC REALTIME (THỜI GIAN THỰC)

> **Mục đích**: Nhóm tài liệu này giải thích cách dự án CleanHi cập nhật dữ liệu tự động mà không cần khách hàng phải bấm nút f5 (Tải lại trang).
> **Công nghệ lõi**: Sử dụng `Supabase Realtime` (Giao thức WebSockets kết nối thẳng vào kệnh `postgres_changes` của máy chủ).

---

## 1. CÓ BAO NHIÊU CHỨC NĂNG REALTIME TRONG DỰ ÁN?
Sau khi quét toàn bộ mã nguồn, dự án hiện tại đang sở hữu **4 Điểm Nút Thời Gian Thực** (Vô cùng tuyệt vời và đầy đủ cho một nền tảng O2O):
1. **Chat Trực Tuyến**: Tin nhắn giữa thợ và khách hàng (Nhắn xong nhảy chữ luôn).
2. **Chuông Thông Báo (Notifications)**: Ứng dụng dội chuông báo đỏ khi có biến cố.
3. **Bảng Kanban của Admin (Matching)**: Màn hình theo dõi nội bộ của quản lý, thẻ đơn sẽ tự nhảy cột khi có sự thay đổi.
4. **Màn Hình Chờ Báo Giá (Waiting Quote)**: Khách vừa gửi yêu cầu, ngồi nhìn màn hình đếm ngược 24 tiếng và thấy các nhà cung cấp thi nhau "nhảy vào" nộp đơn báo giá.

---

## 2. TRIẾT LÝ THIẾT KẾ (DESIGN RULE)
Hành vi Thời Gian Thực trong mã nguồn CleanHi đang được chia làm 2 nhánh tư duy rất thông minh:

- **Chiến Thuật 1: Máy Chủ Tự Tính Toán Lại (`router.refresh`)**
  - *Áp dụng cho*: Đếm bảng thông báo, Chuyển cột Admin Kanban.
  - *Tại sao?*: Nếu có quá nhiều người dùng và nhiều luật An Ninh, lập trình viên không tự nhét dữ liệu vào màn hình, mà ép trình duyệt gửi tín hiệu "Xin máy chủ tính lại trang này". Nhờ thế mà dữ liệu luôn chính xác 100% về tiền bạc và chống Hack.

- **Chiến Thuật 2: Nhét Trực Tiếp Lên Màn Hình (Client Push Push)**
  - *Áp dụng cho*: Chat tin nhắn.
  - *Tại sao?*: Vì lúc Chat, chát qua chát lại cần không độ trễ (0 miligiây trễ). Nên nhận được tin nhắn là quăng ngay vào màn hình, không nhờ máy chủ tính toán lại mệt mỏi.
