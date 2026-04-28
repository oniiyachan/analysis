# TRANG: Quản Lý Marketing / Mã Giảm Giá

## 1. ĐỊNH TUYẾN
| Mục | Giá Trị |
|-----|---------|
| URL | `/admin/marketing` |
| Vai Trò | Admin |

## 2. CHỨC NĂNG
- **Quản Lý Coupon** (`CouponManager`): Tạo/sửa/xóa mã giảm giá
- **Trường Coupon**: Mã, số tiền/phần trăm giảm, lượt dùng tối đa, hạn dùng, đơn tối thiểu
- **Thống Kê Sử Dụng**: Số lần mỗi coupon được dùng

## 3. SERVER ACTIONS
| Hàm | File | Mô Tả |
|-----|------|-------|
| `couponActions` | `admin/marketing/_actions/coupon-actions.ts` | CRUD trên `coupons` |

## 4. BẢNG CSDL
| Bảng | Cột | Thao Tác |
|------|-----|----------|
| `coupons` | `id, code, discount_type, discount_value, max_uses, used_count, valid_until, min_order_amount, is_active` | SELECT + INSERT + UPDATE + DELETE |
