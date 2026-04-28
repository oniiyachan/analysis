# TRANG: Chi Tiết Công Việc (`/p/schedule/[bookingId]`)
## 1. URL: `/p/schedule/[bookingId]`
## 2. CHỨC NĂNG: Chi tiết booking, nút "Bắt đầu" (→ in_progress) / "Hoàn thành" (→ completed), link chat
## 3. SERVER ACTIONS: `updateBookingStatus` → UPDATE `bookings.status`
## 4. BẢNG: `bookings` (SELECT + UPDATE), `cleaning_requests` (JOIN)
