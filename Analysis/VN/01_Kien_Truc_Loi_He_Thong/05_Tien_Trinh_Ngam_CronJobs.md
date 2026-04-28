# KIẾN TRÚC NGẦM TIẾN TRÌNH TỰ ĐỘNG (CRON JOBS & BACKGROUND TASKS)

> **Mô Tả**: Bộ phân luồng hệ thống Chạy Tự Động Định Kỳ, vắt sổ hệ thống mà không cần con người ngồi canh. Trái tim của Hệ Thống Anomaly (Bất thường).

---

## 1. CÁC NỀN TẢNG THỰC THI (THE RUNNER ENGINES)
Mã nguồn này được nhúng trên cấu trúc Vercel Cron. Chúng ta đẩy file thiết lập (Cấu hình Cron) trong `vercel.json` khai báo Giờ và Phút sẽ gõ lệnh HTTP ẩn vào các đường dẫn `api/cron/...`.
Tại Vercel, Cron chạy mốc giờ UTC. Được tinh chỉnh tương đương chạy lúc giữa đêm (00:00 KST Hàn Quốc).

## 2. CHUỖI 5 NHIỆM VỤ CỐT TỦY (THE SCAN MANIFESTO)
Cron chạy hằng giờ / hằng ngày (Tùy API thiết lập) làm nhiệm vụ truy thu 5 vấn đề:
1. **Tìm Kẻ Bỏ Trốn (Partner No-show)**: Quét Bảng `cleaning_requests`. Những đơn nào thuộc Trạng thái `assigned` mà Thời Gian Giờ Cạo nhà (Cleaning Time) đã quá 1 tiếng mà không ai ấn Nút Đang Dọn Dẹp. -> Bắn vào Bảng Bất Thường (`alerts`).
2. **Kẹt Chuỗi Tiền Đứt Đoạn (Orphan Payment Track)**: Quét Bảng `payments` với biến Trạng thái "Đang Pending". Quá 10 tiếng chưa thanh toán, Hủy đơn rác cho dọn Database.
3. **Ế Ẩm Chậm Đơn**: Nếu Đơn Khách xin báo giá lọt vào Bảng `cleaning_requests` quá 24h đếm ngược. Nếu số lượng `bid_count = 0`. Hủy đơn, gửi SMS thả trái tim vỗ về Khách xin lỗi.
4. **Đòi Lại Tiền Thanh Toán (Refund Rate Sweep)**: Quét thuật toán tỷ lệ Hoàn Tiền. Nếu một Partner có lượng Chê Trách Hoàn Tiền (Refund Count) vượt 15% tổng đơn, Nhồi Cờ Đỏ (Critical Alert severity) lên màn hình Ops Admin (Giao diện `/admin/alerts`).
5. **Giam Lương Mồ Côi**: Quét bảng `settlement` (Đối soát hoa hồng). Đơn đã chạy tuần trước nhưng chưa kết sổ cho Thầu. Nhồi cảnh báo Tím cho sếp Mở Kho bạc.

---

## 3. MỨC ĐỘ BẢO MẬT API CRON
Phần đường dẫn `api/cron/[xxx]` không rào bằng Token (Authentication) vì Server Vercel gọi chay HTTP không cần Đăng Nhập.
- Cách chống Hacker tự gọi Cron API bậy bạ làm treo Server DB: Bắt buộc ở hàm Mạng nhận, Check mã Header bảo mật truyền vào `CRON_SECRET`. Nếu Không khớp Key, đánh 401 Unauthorized văng ra đường.
