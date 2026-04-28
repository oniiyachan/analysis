# TRANG: Viết Đánh Giá
## 1. URL: `/review/[id]` (id = bookingId) | Vai trò: Khách (booking completed)
## 2. CHỨC NĂNG: 4 tiêu chí sao (Sạch/Đúng giờ/Lịch sự/Đáng tiền), văn bản, ảnh, +500P thưởng, 1 lần duy nhất
## 3. SERVER ACTIONS: `submitReview` → INSERT `reviews` + trigger tính lại rating
## 4. BẢNG: `reviews` (INSERT), `partners` (AUTO-UPDATE), `loyalty_events` (AUTO-INSERT +500), `bookings` (verify)
