# TRANG: Thông Báo Admin

## 1. ĐỊNH TUYẾN
| Mục | Giá Trị |
|-----|---------|
| URL | `/admin/notifications` |
| Vai Trò | Admin |

## 2. CHỨC NĂNG
- **Feed Thông Báo Admin**: Cảnh báo hệ thống, chuyển cấp CS, vấn đề quyết toán
- **Đã Đọc/Chưa Đọc**: Chuyển đổi trạng thái đọc
- **Loại Thông Báo**: cs_escalation, settlement_failed, partner_application, system_alert

## 3. BẢNG CSDL
| Bảng | Cột | Thao Tác |
|------|-----|----------|
| `notifications` | `id, type, title, body, is_read, profile_id, created_at` | SELECT + UPDATE (lọc theo profile admin) |
