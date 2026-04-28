# KIẾN TRÚC MŨI NHỌN CƠ SỞ DỮ LIỆU & BẢO MẬT (SUPABASE RLS)

> **Mô tả**: Tài liệu giải phẫu cách dữ liệu được kết nối với nhau (ERD) và kỹ thuật bảo vệ tường lửa cấp Dòng (Row-Level Security - RLS) trên nền tảng Supabase PostgresSQL.

---

## 1. BẢNG MỐI QUAN HỆ CỐT LÕI (ERD TOPOLOGY)
Hệ thống xoay quanh một lõi "Matching" (Khớp Nối). Dưới đây là 5 Bảng Huyết Mạch tương tác với nhau:

1. **`users` (Hoặc bảng giả `profiles`)**: Ràng buộc vật lý (Foreign Key) trực tiếp với `auth.users` của Auth Supabase. Đại diện cho Khách vãng lai và Khách có tài khoản.
2. **`cleaning_requests` (Yêu cầu Dọn Dẹp)**: Trái tim của mảng Dịch vụ.
   - Liên kết khóa ngoại: `user_id` -> `users.id`.
   - Trạng thái chốt (Status Enum): *pending, bidding, assigned, in_progress, completed, cancelled*.
3. **`quotes` (Báo Giá Đấu Thầu)**: Các miếng thẻ giá thợ thả vào đơn khách.
   - Liên kết 2 đầu: `request_id` -> `cleaning_requests.id`, và `partner_id` -> `partners.id`.
4. **`partners` (Công ty Đối tác)**: Doanh nghiệp thầu. 1 partner có 3 Role (Owner, Lead, Worker).
5. **`payments` (Phiếu Giao Dịch)**: Liên kết `quote_id` và `request_id`. Quản lý luồng tiền thật (Real-Money) từ NicePay.

---

## 2. ROW LEVEL SECURITY (TƯỜNG LỬA CHỈ ĐỊNH DÒNG)
Thay vì code quyền Backend kiểm tra (if/else), bộ SQL nội tại sẽ Cấm/Mở Cổng tự động dựa vào Session JWT. 
*(Trong dự án này, RLS được viết trong các File Migration tại mốc `supabase/migrations/`)*

### 🛡️ Chiến Thuật Cấp Khách Hàng (Customer)
- Bảng `cleaning_requests`: `SELECT` & `INSERT` nếu `auth.uid() = user_auth_id`. Tức là Khách A cấm tuyệt đối lén xem nhà Khách B dơ bẩn cỡ nào. (Khách B là ngoại tuyến).
- **Trường Hợp Ngoại Lệ (Guest Token)**: Đối với khách chưa tạo tài khoản mà vẫn dùng Tool báo giá. Supabase Auth cấp mượn tạm một mã Token 1-lần gọi là `guest_session`. Dòng RLS Mở cửa phụ: `OR user_auth_id IS NULL AND session_id matches`.

### 🛡️ Chiến Thuật Cấp Đối Tác (Partner)
- Bảng `quotes`: Thợ chỉ được nhét giá thầu (INSERT) và sửa (UPDATE) nếu chuỗi mã Công ty `auth.jwt() -> app_metadata -> partner_id` trùng khớp. Công ty A không thể sửa hay xóa Báo giá của Công ty B được thả vào cùng một đơn.

### 🛡️ Lỗ Hổng Kỹ Thuật Dành Tặng Riêng Admin (Service Role Bypass)
- Bảng Quản trị viên (Dashboards) sẽ sụp đổ dữ liệu nếu phải tuân theo RLS trên (Admin sẽ thấy 0 Rows vì Admin không phải người tạo đơn). 
- **Cách phá rào RLS**: Lập trình viên gọi mã hàm Backend `createServiceClient()`. Hàm này mang theo thẻ Service\_Key chọc thẳng thủng lưới RLS để lấy toàn bộ dữ liệu 63 tỉnh thành. Lệnh này bị nghiêm cấm dùng ở phần Frontend giao diện.
