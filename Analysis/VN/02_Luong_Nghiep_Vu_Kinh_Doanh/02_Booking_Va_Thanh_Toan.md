# Chức Năng 2: Đặt Lịch & Thanh Toán & Đối Soát

Đây là chuỗi giá trị Cốt lõi tạo ra Dòng Tiền (Cashflow) cho ứng dụng.

## 1. Chốt Báo Giá & Đặt Lịch (`bookings`)
- Khách kiểm tra các Object `quotes`, chọn ra 1 báo giá của thợ ưng ý nhất và bấm Chấp Nhận. 
- Ngay lập tức, Server tạo Record bên bảng `bookings` kèm deadline phải thanh toán trong vòng N phút, nếu không giao dịch rụng. Trạng thái Booking = `pending_payment`.
- Thợ (Lead/Owner) có thể dùng hệ thống Partner Portal chia cái booking này cho cái Team (nhóm) cụ thể nào đi dọn dẹp.

## 2. Thanh Toán (Payment Gateway)
- **NicePayments 2.0**: Form thanh toán bằng thẻ nội địa / thẻ quốc tế hiện lên.
- **Idempotency (Tính Lặp An Toàn - Track A1)**: Backend xử lý việc gọi API xác nhận `nicepay/confirm`. File code xử lý cực chặt chẽ: `payments.pg_tx_id` phải là Unique (độc nhất), để tránh khách click thanh toán đúp bị trừ thẻ 2 lần.
- Cập nhật Data: Thanh toán xong, bảng `payments` lên status `paid`, bảng `bookings` chuyển status thành `confirmed` (Đã xác nhận). Gửi Zalo AlimTalk báo cho đối tác dọn dẹp chuẩn bị đồ nghề lên đường.

## 3. Vận Hành Thi Công Dọn Dẹp
- Partner Portal: Khi tới nơi, thợ ấn "Bắt đầu làm" (`in_progress`), khi ra về thợ ấn "Hoàn thành" (`completed`).
- Khách ở nhà lấy máy ra có thể thấy Push Notification tiến độ thay đổi Real-Time.

## 4. Quyết Toán Khấu Trừ Hoa Hồng (`settlements`)
- **CRON Job**: Mỗi nửa đêm (00:00 KST), Vercel Cron sẽ chạy quét toàn bộ dịch vụ đã chuyển trạng thái `completed` quá 24h.
- **Công thức**: Lấy tiền thanh toán trừ Cước nền tảng 15% (Platform Fee `0.15`) => Số tiền thực lãnh (`net_amount`).
- Server tự động sinh ra sao kê tại bảng `settlements`, báo Partner "Tiền sẽ ting ting về tài khoản ngân hàng của anh vào ngày D+1".
- Xử lý hoàn trả: Nếu có khiếu nại chưa xử lý ở CS, settlement sẽ vào trạng thái `held` (Giữ tiền).
