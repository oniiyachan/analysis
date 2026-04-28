# TRANG: Gửi Báo Giá (`/p/bids/[requestId]`)
## 1. URL: `/p/bids/[requestId]` | Vai trò: Chủ/Trưởng
## 2. CHỨC NĂNG: Bố cục 2 phần (chi tiết yêu cầu + form báo giá), tổng giá, giờ, số thợ, dịch vụ
## 3. SERVER ACTIONS: `submitBid` → INSERT vào `quotes`
## 4. BẢNG: `cleaning_requests` (SELECT), `quotes` (INSERT)
