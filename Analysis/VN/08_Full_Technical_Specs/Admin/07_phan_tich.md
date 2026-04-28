# TRANG: Bảng Phân Tích (Analytics)

## 1. ĐỊNH TUYẾN
| Mục | Giá Trị |
|-----|---------|
| URL | `/admin/analytics` |
| File Mã Nguồn | `src/app/(admin)/admin/analytics/page.tsx` |
| Vai Trò | Admin |

## 2. CHỨC NĂNG
- **Biểu Đồ Phân Tích** (`AnalyticsCharts`): Doanh thu, bookings, tỷ lệ chuyển đổi
- **Tab Khu Vực** (`RegionTab`): Phân tích hiệu suất theo địa lý
- **Biểu Đồ Cột Khu Vực** (`RegionBarChart`): Lượng booking theo quận
- **Bảng Phủ Sóng Khu Vực** (`RegionCoverageTable`): Tỷ lệ phủ sóng đối tác mỗi quận

## 3. BẢNG CSDL
| Bảng | Cột | Thao Tác |
|------|-----|----------|
| `bookings` | `id, status, scheduled_date, partner_id` | SELECT (aggregate) |
| `cleaning_requests` | `id, status, district, created_at` | SELECT (aggregate) |
| `partners` | `id, service_areas` | SELECT (tính phủ sóng) |
| `payments` | `amount, created_at` | SELECT (doanh thu) |
