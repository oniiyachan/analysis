# Tiến Độ Hiện Tại & Ước Lượng Backend (Backend Estimations)

## 1. Đã Xong Những Gì? (Hoàn Thành: 90%)
Nhìn vào Commit Logs và file `@TODO.md`, đội ngũ phát triển trước đã thực sự đi đến cuối chặng đường vòng MVP:
- **Database Architecture**: Đã setup toàn vẹn trên Supabase. Đi qua 37 đợt Migrate. Bảng biểu, quan hệ FK, Trigger đã khóa kín. Đặc biệt, bộ RLS (Row-Level Security) chống hack chéo user đã được bảo hiểm đến hơn 57 rules riêng biệt.
- **API (Server Actions)**: Luồng code Front-End vĩnh viễn không gọi thẳng Backend cũ kỹ. Mọi giao tiếp đi qua React 19 Server Actions (chạy ẩn ngầm trên server Vercel Edge).
- **Phân Khúc Core Nặng Đã Giải Quyết**: Xong hệ thống phân quyền 3-Role cho Đối tác. Xong tính năng khách vãng lai (Guest). Xong màn hình UI cho 3 app độc lập (Client, Partner, Admin).
- **Thanh toán bảo mật**: Đã xử lý Idempotency chống Charge đôi tiền thẻ bằng logic hàng đợi khẩn cấp (`payment_reconciliation_queue`).

## 2. Chưa Xong Những Gì? (Chưa xong: 10% - Chờ Launching Phase 0)
Đây là các mục tiêu nhỏ để sẵn sàng đi vào đời thực:
- **Giấy phép API Môi Trường Thật**: CleanHi chưa điền API Key thật của NicePay, Kakao AlimTalk (Vẫn đang xài Sandbox test Key). Vercel báo Log vàng khi khởi động.
- **Anti Spam xịn BotID**: Có test thử cơ chế Vercel BotID Pro nhưng hiện đang revert vì xung đột gói Hobby của Vercel. 
- **Quy trình DevOps**: Tối ưu Codebase Lint/Typecheck tổng, làm sạch Lock file và CI/CD Automation.
- **Viết thêm Test E2E**: Chạy Playwright test auto cho luồng 결제 (Thanh toán).

==================================================

## 3. Nếu là Bạn Đóng Vai Trò Backend, Sẽ Mất Bao Lâu Để Hoàn Thành?
Với thực trạng hạ tầng Backend của CleanHi (phụ thuộc vào Supabase và Next.js API Routes):

**1. Nếu đập đi đập lại từ đầu bằng System Khác (Spring, Node Express, Redis, MySQL...):**
- Thể loại O2O có Matching giá, Phân quyền nấc thang, Tracking ví tiền và xử lý Chat/Push cực kỳ nặng hạ tầng. Khối lượng này tốn tổi thiểu **1.5 tháng – 2 tháng** cho team Backend cứng.

**2. Nếu Bạn "On-boarding" Nối Tiếp Vào Mã Source Này Để Đưa Lên Production:**
Mã nguồn đã viết xong logic Business, do đó nếu bạn nhận việc:
- **Tuần 1 (1 - 5 ngày)**: Rà soát cấu trúc thư mục, mò mẫm Supabase Tables, Policy và Đọc hiểu Server Actions. Viết nháp E2E thử luồng.
- **Tuần 2 (3 - 7 ngày)**: Cắm chìa khóa API Thật từ NicePay/Alimtalk. Bật màn hình theo dõi log, chạy thẻ thật 20.000 VNĐ xem tiền nhảy sao kê. Góp ý cấu hình Security HTTP Headers, rate-limiting chặn DDOS trên Vercel Firewall.
- **Tổng Thời gian ước tính**: Chỉ mất khoảng **10 đến 15 ngày làm việc** để trở thành Master nắm trùm Backend của CleanHi và chính thức nhấn nút `Release v1.0` hoàn hảo ra thị trường.
