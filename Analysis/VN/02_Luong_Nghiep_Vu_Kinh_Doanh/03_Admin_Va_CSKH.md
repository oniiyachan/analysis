# Chức Năng 3: Theo Dõi, CSKH Và Tranh Chấp

## 1. Chăm Sóc Khách Hàng (Customer Service Tickets)
Trong dịch vụ dọn dẹp thường xuyên xảy ra sự cố (hỏng hóc bàn ghế, dọn bẩn...).
- **Submit Ticket**: Khách hoặc thợ đều có quyền bấm khiếu nại đơn hàng. Data lưu vào bảng `cs_tickets`. Đính kèm ảnh bằng chứng vỡ vệt.
- **Admin Resolve**: Đội ngũ CS truy cập Admin Dashboard, xem lịch sử chat của 2 bên trong bảng `chat_messages`, đưa ra phán quyết:
  - Nếu thợ lỗi: Admin dùng Server Action `refund_partial` (Hoàn tiền 1 phần chích từ dòng tiền chưa Settlement của thợ trả về thẻ KH). Đánh điểm trừ (`warning_count`) vào Partner.
  - Nếu khách lỗi: Giải ngân thanh toán tiếp cho thợ.

## 2. Review và Chấm Điểm Năng Lực Cạnh Tranh
- Dọn xong, Khách nhận Email xin Feedback.
- Bảng `reviews` được kích hoạt. Chấm chéo 4 tiêu chí: Độ Sạch Lẽ, Độ Đúng Giờ, Lịch Sự, Đáng Tiền.
- Supabase có Trigger SQL: Mỗi khi có 1 Review mới, Server không cần hàm quét mà tự động chạy Stored Procedure Cập Nhật điểm Rating TB của công ty lên bảng `partners.rating`.

## 3. Log An Toàn & Đánh Chặn Trục Trặc (Anomaly Alerts)
- **Audit Logs**: Quản trị viên nào vào Sửa Xoá đơn hàng đều bị ghi IP và nhật ký vào `audit_logs` để thanh tra.
- **CRON Anomaly Check**: Cứ 1 tiếng server sẽ check nếu:
  - Khách đăng mà 24h không có ai thèm đấu giá (0 bids).
  - Khách có báo giá mà 48h không thèm chọn.
  - Thợ đi dọn quá thời gian gấp đôi mà chưa báo xong.
  => Báo rớt ra Dashboard của Admin để người vào gọi điện cấp cứu điều phối.
