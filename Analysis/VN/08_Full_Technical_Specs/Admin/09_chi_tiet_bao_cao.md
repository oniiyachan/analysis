# TRANG: Chi Tiết Báo Cáo

## 1. ĐỊNH TUYẾN
| Mục | Giá Trị |
|-----|---------|
| URL | `/admin/reports/[id]` |
| Vai Trò | Admin |

## 2. CHỨC NĂNG
- **Xem Chi Tiết Báo Cáo** (`ReportDetailView`): Báo cáo render đầy đủ với biểu đồ và bảng dữ liệu
- **Tải CSV**: Xuất dữ liệu báo cáo cụ thể dạng CSV

## 3. BẢNG CSDL
| Bảng | Cột | Thao Tác |
|------|-----|----------|
| `reports` | toàn bộ dòng | SELECT (theo id) |
