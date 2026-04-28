# TRANG: Bảng Điều Khiển Quản Trị

## 1. ĐỊNH TUYẾN & QUYỀN TRUY CẬP
| Mục | Giá Trị |
|-----|---------|
| URL | `/admin` |
| File Mã Nguồn | `src/app/(admin)/admin/page.tsx` (261 dòng) |
| Vai Trò | Admin / Super Admin |
| Yêu Cầu Đăng Nhập | Có (kiểm tra role admin trong layout) |
| Layout | `(admin)/admin/layout.tsx` (sidebar điều hướng) |
| Kiểu Render | `force-dynamic` Server Component |

## 2. CHỨC NĂNG & TÍNH NĂNG
- **6 KPI Hôm Nay** (`DashboardKpiGrid`): Các chỉ số chính (yêu cầu, booking, doanh thu, CS, chuyển đổi, rời bỏ)
- **8 Nút Hành Động Nhanh** (`DashboardQuickActions`): Phím tắt tới các tác vụ phổ biến
- **Biểu Đồ Xu Hướng Doanh Thu** (`DashboardRevenueTrend`): Recharts line chart 3 tab (Ngày 14d / Tuần 8w / Tháng 6m)
- **4 Thẻ KPI Vận Hành**: Yêu cầu mới hôm nay, Booking đang hoạt động, Quyết toán hôm nay, CS chờ xử lý
- **Pipeline Matching**: Kanban 7 cột (bidding → bids_received → pending_payment → confirmed → assigned → in_progress → completed)
- **Widget Việc Cần Làm** (`DashboardTodoWidget`): Tổng hợp từ 4 nguồn
- **Thống Kê Thành Viên**: Số đối tác hoạt động + Tổng user đã đăng ký
- **Phát Hiện Bất Thường**: Cảnh báo yêu cầu hết hạn với 0 bid

## 3. CÂY COMPONENT
```
AdminDashboard (Server)
├── DashboardKpiGrid (Client) — 6 KPI animation
├── DashboardQuickActions (Client) — 8 nút
├── DashboardRevenueTrend (Client) — Recharts
├── Thẻ KPI (Server) × 4
├── Pipeline Kanban (Server) — 7 cột
├── DashboardTodoWidget (Client)
├── Thống Kê Đối Tác/User (Server)
└── Phát Hiện Bất Thường (Server)
```

## 4. BẢNG CƠ SỞ DỮ LIỆU
| Bảng | Cột Sử Dụng | Thao Tác |
|------|-------------|----------|
| `cleaning_requests` | `id, status, created_at` | SELECT (đếm theo trạng thái, lọc hôm nay) |
| `settlements` | `net_amount, status, scheduled_date` | SELECT (tổng hôm nay) |
| `cs_tickets` | `id, status` | SELECT (đếm open) |
| `partners` | `id, status='active'` | SELECT (đếm) |
| `profiles` | `id, role='customer'` | SELECT (đếm) |
| `payments` | `amount, created_at` | SELECT (xu hướng doanh thu) |

## 5. BIẾN MÔI TRƯỜNG
| Biến | Bắt Buộc | Mục Đích |
|------|----------|----------|
| `SUPABASE_SERVICE_ROLE_KEY` | Có | Truy vấn doanh thu qua service client |
