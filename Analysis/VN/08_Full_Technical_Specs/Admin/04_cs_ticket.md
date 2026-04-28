# TRANG: Quản Lý CS (Danh Sách Ticket)

## 1. ĐỊNH TUYẾN
| Mục | Giá Trị |
|-----|---------|
| URL | `/admin/cs` |
| File Mã Nguồn | `src/app/(admin)/admin/cs/page.tsx` |
| Vai Trò | Admin |

## 2. CHỨC NĂNG
- **Danh Sách Ticket**: Tab Open / In Progress / Resolved với danh mục, khách hàng, booking
- **Badge Trạng Thái**: open (đỏ), in_progress (cam), resolved (xanh), closed (xám)
- **Chỉ Báo Ưu Tiên**: Khẩn cấp (hư hại), Bình thường

## 3. BẢNG CSDL
| Bảng | Cột | Thao Tác |
|------|-----|----------|
| `cs_tickets` | `id, status, category, priority, booking_id, profile_id, created_at` | SELECT |
| `profiles` | `name, email` | JOIN (tên khách) |
| `bookings` | `id, scheduled_date` | JOIN (tham chiếu booking) |
