# TRANG: Bảng Cảnh Báo Hệ Thống (Alerts)

## 1. ĐỊNH TUYẾN
| Mục | Giá Trị |
|-----|---------|
| URL | `/admin/alerts` |
| Vai Trò | Admin |

## 2. CHỨC NĂNG
- **Feed Cảnh Báo**: Bất thường hệ thống (hết hạn 0 bid, lỗi quyết toán, mẫu bất thường)
- **Xử Lý Đơn Lẻ/Hàng Loạt** (`BulkActions`): Đánh dấu đã xử lý
- **Mức Độ Nghiêm Trọng**: critical / warning / info

## 3. SERVER ACTIONS
| Hàm | File | Mô Tả |
|-----|------|-------|
| `resolveAlert` | `admin/alerts/_actions/resolve-alert.ts` | UPDATE `system_alerts.resolved_at` |
| `resolveBulk` | `admin/alerts/_actions/resolve-bulk.ts` | Xử lý hàng loạt nhiều cảnh báo |

## 4. BẢNG CSDL
| Bảng | Cột | Thao Tác |
|------|-----|----------|
| `system_alerts` | `id, type, severity, message, resolved_at, created_at` | SELECT + UPDATE |
