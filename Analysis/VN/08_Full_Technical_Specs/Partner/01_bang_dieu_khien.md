# TRANG: Bảng Điều Khiển Đối Tác

## 1. ĐỊNH TUYẾN & QUYỀN TRUY CẬP
| Mục | Giá Trị |
|-----|---------|
| URL | `/p` |
| File Mã Nguồn | `src/app/(partner)/p/page.tsx` (507 dòng) |
| Vai Trò Được Phép | Thành viên Đối Tác (Chủ / Trưởng Nhóm / Lính) |
| Yêu Cầu Đăng Nhập | Có → redirect `/login?next=/p` |
| Layout | `(partner)/p/layout.tsx` (thanh điều hướng bên) |
| Kiểu Render | `force-dynamic` Server Component |

## 2. CHỨC NĂNG & TÍNH NĂNG
- **4 Thẻ KPI** (lọc theo vai trò):
  - Cơ hội đấu thầu hôm nay — Chỉ Chủ/Trưởng nhóm
  - Lịch hôm nay — Tất cả vai trò
  - Quyết toán tuần này — Chỉ Chủ
  - Đánh giá (trung bình 30 ngày) — Tất cả
- **Thẻ Hành Động Hôm Nay**: Top 3 booking + Top 3 cơ hội đấu thầu
- **Widget Tiến Trình Xếp Hạng**: Bronze/Silver/Gold — Chủ/Trưởng
- **Ma Trận Hiển Thị Theo Vai Trò**: `hasPartnerPermission()` điều khiển hiển thị
- **Bảo Vệ Trạng Thái**: `pending` → "Đang chờ duyệt"; `suspended` → "Tài khoản bị đình chỉ"
- **Chế Độ Xem Trước Super Admin**: `readPreviewMode() === "partner"` tiêm dữ liệu fixture

## 3. CÂY COMPONENT
```
PartnerDashboard (Server)
├── TierProgressWidget (Client) — animation thanh tiến trình
├── Thẻ KPI (Server, map lọc theo vai trò)
├── Phần Lịch Hôm Nay (Server)
└── Phần Cơ Hội Đấu Thầu Mới (Server, Chủ/Trưởng)
```

## 4. SERVER ACTIONS & API
| Hàm | File | Mô Tả |
|-----|------|-------|
| `getCurrentUser()` | `src/lib/auth/current-user.ts` | Kiểm tra đăng nhập |
| `getCurrentPartnerMember()` | `src/lib/auth/partner-permissions.ts` | Lấy vai trò + partner_id |
| `hasPartnerPermission()` | `src/lib/auth/partner-permissions.ts` | Kiểm tra RBAC |
| `readPreviewMode()` | `src/lib/preview/preview-cookie.ts` | Cờ chế độ xem trước |

## 5. BẢNG CSDL
| Bảng | Cột | Thao Tác |
|------|-----|----------|
| `partners` | `id, business_name, rating, review_count, total_completed, service_areas, status, tier` | SELECT |
| `partner_members` | `partner_id, profile_id, member_role, team_id` | SELECT |
| `cleaning_requests` | `id, district, category_id, area_pyeong, bid_count, bid_deadline, status='bidding'` | SELECT |
| `quotes` | `request_id, partner_id` | SELECT (loại trừ đã bid) |
| `bookings` | `id, scheduled_date, scheduled_time, status, partner_id, team_id` | SELECT (hôm nay) |
| `settlements` | `net_amount, status, scheduled_date, partner_id` | SELECT (tổng tuần) |
