# SPRINT 3: GÓI NÂNG CẤP XA XỈ & SIÊU KẾ TOÁN
*(Thời gian dự kiến: Tuần 5 - Tuần 6 | Ngày 29 đến Ngày 42)*

> **Nhiệm vụ trọng tâm**: Khai mở các gói Thuốc kích thích Tăng Doanh thu (Gói tuần, Gói tháng) và thay thế bà Tạp vụ Kế toán bằng API của Ngân Hàng Mở.

---

## 🎯 MỤC 1: Chuỗi Chu Kỳ Ác Mộng (Recurring Bookings)

**File liên quan**: `src/app/(user)/mypage/recurring/`, `src/app/api/cron/`

| Task | Mô Tả Chi Tiết | Ước Lượng |
|------|----------------|-----------|
| 1.1 | Backend: Migration tạo bảng `recurring_subscriptions` (user_id, frequency, preferred_day, status) | 0.5 ngày |
| 1.2 | UI `/mypage/recurring-new`: Form đăng ký gói (tuần/2tuần/tháng) + chọn thợ yêu thích | 1 ngày |
| 1.3 | Cron `spawn-recurring`: Mỗi Chủ Nhật → tự đẻ `cleaning_requests` mới cho tuần tới | 1 ngày |
| 1.4 | Auto-charge: Tích hợp NicePay Billing Key → trừ thẻ tự động hoặc nhắc thanh toán | 1.5 ngày |
| 1.5 | UI quản lý: Tạm dừng / Hủy gói / Đổi lịch | 1 ngày |

---

## 🎯 MỤC 2: Thuật Toán Phân Công Đội Thợ (Team Roster Sync)

**File liên quan**: `src/app/(partner)/p/schedule/`, `src/app/(partner)/p/team/`

| Task | Mô Tả Chi Tiết | Ước Lượng |
|------|----------------|-----------|
| 2.1 | Leader gán Worker vào Booking: UI dropdown chọn thợ + `bookings.assigned_worker` update | 1 ngày |
| 2.2 | Worker Check-in: Bấm xác nhận đến nơi + Geolocation API báo tọa độ | 1 ngày |
| 2.3 | Checklist thi công: Lau bếp ✓, Cọ toilet ✓ → chụp ảnh bằng chứng lên Storage | 1 ngày |
| 2.4 | Progress tracking: Worker cập nhật % → Khách thấy tiến độ realtime qua `bookings.progress_percent` | 0.5 ngày |

---

## 🎯 MỤC 3: Hắc Kế Toán (Automated Escrow & OpenBanking)

**File liên quan**: `src/app/api/cron/settlement-batch/`, `src/lib/integrations/openbanking/` (tạo mới)

| Task | Mô Tả Chi Tiết | Ước Lượng |
|------|----------------|-----------|
| 3.1 | Nghiên cứu + đăng ký API FirmBanking (hoặc Toss Payments Transfer) | 1 ngày |
| 3.2 | Tự động D+1: Settlement `status='pending'` → gọi API chuyển khoản → `status='completed'` | 1.5 ngày |
| 3.3 | Platform Fee 15% tách riêng: Gross → Fee → Net → VAT invoice | 0.5 ngày |
| 3.4 | Admin Settlement Dashboard: Bảng duyệt chuyển khoản hàng loạt + export CSV backup | 1 ngày |

---

## 🎯 MỤC 4: Mảnh Đất Đốt Tiền (Analytics Heatmaps)

**File liên quan**: `src/app/(admin)/admin/analytics/`

| Task | Mô Tả Chi Tiết | Ước Lượng |
|------|----------------|-----------|
| 4.1 | Tích hợp Kakao Maps SDK vào trang Analytics | 0.5 ngày |
| 4.2 | Overlay Heatmap: Tô màu 25 quận Seoul theo density đơn hoàn thành | 1 ngày |
| 4.3 | Filter theo khoảng thời gian (7d / 30d / 90d) + category | 0.5 ngày |
| 4.4 | Export báo cáo PDF cho ban lãnh đạo | 1 ngày |

---

> 💡 **Cách ra lệnh**: Sếp nhắn *"Tiến hành Sprint 3 - Mục 1"* hoặc *"Sprint 3 - Mục 3"*, tôi sẽ tự bóc Code đè vào hệ thống theo đúng Task list!
