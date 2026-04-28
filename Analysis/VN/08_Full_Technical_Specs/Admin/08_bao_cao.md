# TRANG: Quản Lý Báo Cáo

## 1. ĐỊNH TUYẾN
| Mục | Giá Trị |
|-----|---------|
| URL | `/admin/reports` |
| Vai Trò | Admin |

## 2. CHỨC NĂNG
- **Danh Sách Báo Cáo**: Mẫu báo cáo định sẵn (ngày, tuần, tháng)
- **Nút Xuất CSV** (`ReportCsvButton`): Tải báo cáo dạng CSV
- **Ghi Nhật Ký Kiểm Toán**: Theo dõi lượt xem báo cáo

## 3. BẢNG CSDL
| Bảng | Cột | Thao Tác |
|------|-----|----------|
| `reports` | `id, title, type, period, created_at` | SELECT |
| `audit_logs` | `action, entity_id, actor_id` | INSERT (khi xem) |
