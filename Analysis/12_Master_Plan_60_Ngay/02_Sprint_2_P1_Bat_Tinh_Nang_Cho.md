# SPRINT 2: ĐẦU BẾP ẨN DANH & BỘ MÁY CRON NGẦM
*(Thời gian dự kiến: Tuần 3 - Tuần 4 | Ngày 15 đến Ngày 28)*

> **Nhiệm vụ trọng tâm**: Kích hoạt Bộ Não Tự Động. Biến hệ thống từ bị động (chờ bấm) sang Tự Động Rà Soát (Tự quyết định dọn Data rác, cảnh báo rủi ro).

---

## 🎯 MỤC 1: Giải Phóng Cỗ Máy Thời Gian (Vercel Cron Jobs)

**File liên quan**: `src/app/api/cron/`

| Task | Mô Tả Chi Tiết | Ước Lượng |
|------|----------------|-----------|
| 1.1 | Viết body `check-deadlines`: Hết giờ đấu thầu → `bids_received` hoặc `expired` | 1 ngày |
| 1.2 | Viết body `anomaly-check` (mỗi giờ): Thợ ngâm đơn 48h+ → Alert Admin | 1 ngày |
| 1.3 | Viết body `settlement-batch` (hàng ngày 00:00 KST): Bookings completed → Settlement row | 1 ngày |
| 1.4 | Kích hoạt `d1-reminder`: Nhắc D-1 Khách + Thợ qua Kakao + Email | 0.5 ngày |
| 1.5 | Review Reminder 24H: Khách chưa review → Push "Viết review +500P!" | 0.5 ngày |
| 1.6 | Cron `points-expiring-soon`: Quét điểm sắp hết hạn D-7, gửi cảnh báo | 0.5 ngày |

---

## 🎯 MỤC 2: Pháp Đình CS & Hệ Thống Trừng Phạt

**File liên quan**: `src/app/(admin)/admin/cs/`, `src/app/(admin)/admin/reports/`

| Task | Mô Tả Chi Tiết | Ước Lượng |
|------|----------------|-----------|
| 2.1 | Code tính năng `Refund Partial`: Admin chọn % hoàn tiền → gọi NicePay partial refund API | 1 ngày |
| 2.2 | Tích hợp `Refund Full`: Hoàn toàn bộ → cập nhật `payments.status='refunded'` | 0.5 ngày |
| 2.3 | Hệ thống cảnh cáo Partner: 3 gậy (warning_count >= 3) → `status='suspended'` | 0.5 ngày |
| 2.4 | Shadow-Ban: Admin ẩn review xấu + ghi audit_log | 0.5 ngày |
| 2.5 | CS Ticket escalation flow: open → in_progress → resolved/closed (UI + Server Action) | 1 ngày |

---

## 🎯 MỤC 3: Máy Phát Quà & Checkout Coupon

**File liên quan**: `src/app/(user)/payment/`, `src/lib/domain/coupon/`

| Task | Mô Tả Chi Tiết | Ước Lượng |
|------|----------------|-----------|
| 3.1 | Server Action `applyCoupon`: Validate mã → tính discount → trả preview giá | 1 ngày |
| 3.2 | UI ô nhập mã giảm giá trong trang `/payment/[id]` | 0.5 ngày |
| 3.3 | Giới hạn mã: `max_uses`, `valid_until`, `min_order_amount` check | 0.5 ngày |
| 3.4 | Logic bù lỗ: Coupon trừ tiền Khách nhưng Thợ vẫn nhận full → Platform gánh delta | 0.5 ngày |
| 3.5 | Admin tạo/sửa/xóa coupon từ `/admin/marketing` | 1 ngày |

---

> 💡 **Cách ra lệnh**: Sếp nhắn *"Tiến hành Sprint 2 - Mục 1"* hoặc *"Sprint 2 - Mục 3"*, tôi sẽ tự bóc Code đè vào hệ thống theo đúng Task list!
