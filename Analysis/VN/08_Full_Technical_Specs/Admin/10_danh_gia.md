# TRANG: Quản Lý Đánh Giá (Admin)

## 1. ĐỊNH TUYẾN
| Mục | Giá Trị |
|-----|---------|
| URL | `/admin/reviews` |
| Vai Trò | Admin |

## 2. CHỨC NĂNG
- **Bảng Đánh Giá**: Tất cả đánh giá với thanh lọc (khoảng ngày, xếp hạng, đối tác)
- **Thanh Lọc** (`ReviewFilterBar`): Khoảng ngày, min/max rating, tìm đối tác
- **Chuyển Đổi Hiển Thị**: Ẩn/hiện đánh giá (kiểm duyệt)

## 3. SERVER ACTIONS
| Hàm | File | Mô Tả |
|-----|------|-------|
| `setVisibility` | `admin/reviews/_actions/set-visibility.ts` | UPDATE `reviews.is_visible` |

## 4. BẢNG CSDL
| Bảng | Cột | Thao Tác |
|------|-----|----------|
| `reviews` | `id, booking_id, rating, text, partner_reply, is_visible, created_at` | SELECT + UPDATE is_visible |
