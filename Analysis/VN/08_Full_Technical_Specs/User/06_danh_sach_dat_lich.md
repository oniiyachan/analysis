# TRANG: Danh Sách Đặt Lịch (My Bookings)
## 1. URL: `/bookings` | Vai trò: Khách đăng ký
## 2. CHỨC NĂNG: 3 thẻ thống kê, 5 tab lọc, thẻ booking màu theo trạng thái, routing thông minh, trạng thái trống
## 3. BẢNG: `cleaning_requests` (SELECT lọc user_id), `bookings` (LEFT JOIN)
## 4. RLS: `cleaning_requests_user_select`, `bookings_user_select`
