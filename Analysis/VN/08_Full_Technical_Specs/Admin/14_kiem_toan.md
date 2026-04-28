# TRANG: Nhật Ký Kiểm Toán (Audit Log)

## 1. ĐỊNH TUYẾN
| Mục | Giá Trị |
|-----|---------|
| URL | `/admin/audit` |
| Vai Trò | Admin (ưu tiên Super) |

## 2. CHỨC NĂNG
- **Bảng Nhật Ký**: Tất cả hành động admin (ai, làm gì, khi nào, đối tượng bị ảnh hưởng)
- **Thanh Lọc** (`AuditFilterBar`): Khoảng thời gian, loại hành động, người thực hiện
- **Phân Trang**: Dựa trên con trỏ cho tập dữ liệu lớn

## 3. BẢNG CSDL
| Bảng | Cột | Thao Tác |
|------|-----|----------|
| `audit_logs` | `id, action, actor_id, entity_type, entity_id, metadata, created_at` | SELECT (với bộ lọc, phân trang con trỏ) |
