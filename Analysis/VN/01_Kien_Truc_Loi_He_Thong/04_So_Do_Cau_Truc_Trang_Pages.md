# Sơ Đồ Cấu Trúc Các Trang & URL (Page Architecture)

Dự án CleanHi được chia làm 3 Portal (Cổng thông tin) ứng với 3 loại User. Dưới đây là sơ đồ chi tiết tích hợp cả các đường dẫn URL thực tế lấy từ cấu trúc của Next.js Server (`src/app`).

---

## 1. Cổng Khách Hàng (Customer Portal - Tuyến `/`)
**Mục tiêu**: Hỗ trợ khách đăng yêu cầu dọn dẹp, chọn thợ, thanh toán, tương tác CSKH (Giao diện Mobile-first).

```mermaid
graph TD
    UserRoot((Trang Chủ / Landing))
    
    UserRoot --> QuoteFlow[👉 /quote : Luồng Xin Báo Giá 8 bước]
    UserRoot --> MyPage[👉 /mypage : Trang Cá Nhân]
    
    QuoteFlow --> WaitingView[👉 /waiting/[id] : Đếm ngược chờ Báo Giá]
    WaitingView --> Compare[👉 /compare/[id] : Bảng so sánh Báo giá]
    Compare --> Payment[👉 /payment/[id] : Thanh Toán NicePay]
    
    MyPage --> BookingHistory[👉 /bookings : Lịch sử Đặt Dọn Dẹp]
    MyPage --> Points[👉 /mypage/points : Quản lý Điểm & Coupon]
    MyPage --> Recurring[👉 /mypage/recurring : Đặt làm sạch định kỳ]
    MyPage --> Favorites[👉 /mypage/favorites : Thợ dọn dẹp yêu thích]
    
    BookingHistory --> BookingDetail[👉 /bookings/[id] : Chi tiết Lịch]
    BookingDetail --> Chat[👉 /bookings/[id]/chat : Nhắn tin với Thợ]
    BookingDetail --> Review[👉 /review/[id] : Đánh giá sao]
    BookingDetail --> CS[👉 /cs/new : Khiếu Nại Bồi Thường]
    
    UserRoot --> PartnerView[👉 /partner/[id] : Xem hồ sơ công ty dọn dẹp]
    UserRoot --> Notifications[👉 /notifications : Quản lý thông báo]
```

---

## 2. Cổng Đối Tác (Partner Portal - Tuyến `/p/`)
**Mục tiêu**: Nơi dành cho công ty cấp Lead/Owner hoặc Thợ đi tìm việc, nộp báo giá, lên lịch thợ đến nhà khách.

```mermaid
graph TD
    PartnerRoot((👉 /p : Partner Dashboard))
    
    PartnerRoot --> Bids[👉 /p/bids : Tìm Việc & Đấu Giá]
    PartnerRoot --> Schedule[👉 /p/schedule : Lịch Làm Việc]
    PartnerRoot --> Team[👉 /p/team : Quản Lý Nhân Viên]
    PartnerRoot --> Settlement[👉 /p/settlement : Sao Kê Dòng Tiền]
    PartnerRoot --> CRM[👉 /p/customers : Phân Tích Khách Hàng CRM]
    PartnerRoot --> Analytics[👉 /p/analytics : Biểu Đồ Doanh Thu]
    PartnerRoot --> Settings[👉 /p/settings : Hồ Sơ Doanh Nghiệp]
    
    Bids --> MakeBid[👉 /p/bids/[requestId] : Nộp Form Chào Giá]
    Bids --> BidTemplates[👉 /p/bids/templates : Lưu Mẫu Chào Giá Lâu Dài]
    
    Schedule --> WorkAction[👉 /p/schedule/[bookingId] : Bấm Bắt Đầu Dọn]
    WorkAction --> PChat[👉 /p/schedule/[bookingId]/chat : Chat với Khách]
    
    Team -.-> |Chỉ dành cho Owner| AddStaff[👉 /p/team/add : Thêm Thợ]
    
    Settings --> Portfolio[👉 /p/portfolio : Kho Ảnh Năng Lực]
    Settings --> Ratings[👉 /p/reviews : Phản hồi Review Khách Hàng]
```

---

## 3. Cổng Quản Trị Hệ Thống (Admin Portal - Tuyến `/admin/`)
**Mục tiêu**: Bàn làm việc ngang (Desktop-first) dành cho Ops/CS/Marketing điều hành toàn bộ sàn.

```mermaid
graph TD
    AdminRoot((👉 /admin : Admin Dashboard))
    
    AdminRoot --> Matching[👉 /admin/matching : Quản Lý Luồng Đơn]
    AdminRoot --> Members[👉 /admin/members : Duyệt Công Ty Lên Sàn]
    AdminRoot --> CS[👉 /admin/cs : Trung Tâm Khiếu Nại]
    AdminRoot --> Finance[👉 /admin/settlement : Tài Chính / Rút Tiền]
    AdminRoot --> Analytics[👉 /admin/analytics : BI Báo cáo Doanh số]
    AdminRoot --> Marketing[👉 /admin/coupons : Chiến Dịch Khuyến Mãi]
    AdminRoot --> Config[👉 /admin/settings : Cấu Hình Hệ Thống]
    
    CS --> TicketList[👉 /admin/cs/[id] : Sửa Ticket Lỗi Từng Đơn]
    Config --> SysSetting[👉 /admin/settings/system : Tắt / Cài đặt Server]
    Config --> Tiers[👉 /admin/tiers : Thiết Lập Hạng VIP]
    Marketing --> Broadcast[👉 /admin/broadcast : Tool Gửi Email/Zalo]
```

---

## Danh Sách Tóm Tắt URL Tuyệt Đối (Tuyển Tập Từ Next.js App Router)
Để lập trình viên dễ hình dung cấu trúc thực tế trên máy chủ đang chạy:

### Tuyến `/` (Khách Hàng & Public)
- Khách vãng lai: `/` (Landing), `/legal/privacy`, `/legal/terms`
- Luồng Đơn: `/quote` ➡️ `/waiting/[id]` ➡️ `/compare/[id]` ➡️ `/payment/[id]`
- Quản lý Booking: `/bookings`, `/bookings/[id]`, `/bookings/[id]/chat`
- Quản lý Profile: `/mypage`, `/mypage/favorites`, `/mypage/points`, `/mypage/recurring/new`
- CSKH: `/cs/new`, `/review/[id]`, `/partner/[id]`

### Tuyến `/p/` (Đối tác Công ty Dọn Dẹp)
- Tổng quan: `/p`, `/p/analytics`, `/p/settings`
- Nhận việc: `/p/bids`, `/p/bids/[requestId]`, `/p/bids/templates`
- Lịch làm: `/p/schedule`, `/p/schedule/[bookingId]`, `/p/schedule/[bookingId]/chat`
- Doanh thu & Thợ: `/p/settlement`, `/p/team/add`, `/p/customers`, `/p/portfolio`, `/p/reviews`

### Tuyến `/admin/` (Kiểm soát Tối cao)
- Thông kê: `/admin`, `/admin/analytics`, `/admin/matching`
- Tiền & User: `/admin/settlement`, `/admin/members`
- CSKH / Tools: `/admin/cs`, `/admin/cs/[id]`, `/admin/coupons`, `/admin/broadcast`, `/admin/tiers` 
- Hệ thống: `/admin/settings`, `/admin/settings/system`, `/admin/settings/security`

*(Ghi chú: Tất cả Route `API` kết nối như gửi Zalo, Check Webhook tín dụng nằm ở tuyến `/api/...` - 12 API cron jobs tự động nằm rải rác trong thư mục `src/app/api/`)*
