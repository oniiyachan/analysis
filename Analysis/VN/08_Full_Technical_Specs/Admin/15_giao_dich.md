# TRANG: Lịch Sử Giao Dịch

## 1. ĐỊNH TUYẾN
| Mục | Giá Trị |
|-----|---------|
| URL | `/admin/transactions` |
| Vai Trò | Admin |

## 2. CHỨC NĂNG
- **Bảng Giao Dịch Thanh Toán**: Tất cả thanh toán với trạng thái, số tiền, phương thức, user, đối tác
- **Quản Lý Hoàn Tiền**: Khởi tạo hoàn tiền cho giao dịch tranh chấp
- **Badge Trạng Thái**: completed (xanh), pending (cam), refunded (xanh dương), failed (đỏ)

## 3. BẢNG CSDL
| Bảng | Cột | Thao Tác |
|------|-----|----------|
| `payments` | `id, amount, method, status, pg_tid, created_at, booking_id, profile_id` | SELECT |
| `bookings` | `id, partner_id` | JOIN |
| `profiles` | `name, email` | JOIN (thông tin khách) |
| `partners` | `business_name` | JOIN (thông tin đối tác) |
