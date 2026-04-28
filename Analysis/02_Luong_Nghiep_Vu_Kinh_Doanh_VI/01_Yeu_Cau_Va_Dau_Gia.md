# Chức Năng 1: Yêu Cầu và Báo Giá (Request & Bidding)

Đây là chức năng quan trọng nhất của mô hình Reverse Auction nhằm kết nối Khách Hàng và Đối Tác Dọn Dẹp.

## 1. Tạo Yêu Cầu (Khách Hàng)
- **Wizard 8 Bước**: Khách hàng đi qua 8 bước form: Chọn Loại Dọn Dẹp (nhà ở, làm sạch sau thi công, định kỳ) -> Chọn Gói nhỏ -> Chọn Diện Tích -> Điền Địa Chỉ API -> Chọn Max 3 Mốc Thời Gian -> Tình Trạng Bẩn + Upload Ảnh -> Yêu cầu thêm (memo).
- **AI Estimate**: Trước khi ấn submit, AI dưa trên bảng giá gốc `service_categories` và diện tích sẽ đưa ra khoảng giá (Ví dụ: 800.000đ - 1.200.000đ) để khách chuẩn bị tinh thần.
- **Lưu trữ CSDL**: Data đổ vào bảng `cleaning_requests`.

## 2. Quá Trình Nhận Báo Giá (Harf-Batch Bidding)
- **Logic 5 + 5**: 
  - Khách đăng lên, báo hiệu PUSH (Real-time notification qua Supabase) cho tất cả thợ tại khu vực đó (Ví dụ quanh Ba Đình, Hà Nội).
  - Tối đa chỉ 5 thợ báo giá nhanh nhất được vào vòng đấu giá đợt 1. (Tránh khách ngập rác báo giá).
  - Khách review bảng điểm, giá cả của 5 thợ. Nếu không ưng, khách ấn nút "Mở rộng", sàn sẽ nhận thêm 5 báo giá nữa -> Tối đa 10 báo giá.

## 3. Quản Lý Báo Giá `quotes` (Phía Đối Tác)
- Thợ sẽ thấy danh sách yêu cầu quanh mình. Bấm mở hình ảnh xem mức độ bẩn.
- Thợ lập báo giá tổng (`total_price`), viết kèm tin nhắn chài khách (Dịch vụ bên anh sạch sẽ...). Thuộc tính này sẽ được Backend lưu vào bảng `quotes` liên kết FK với `cleaning_requests`.
- Khi thợ chốt giá, khách sẽ nhận được Email / Notification Push "Có 1 báo giá mới".

## 4. Bảo Vệ Hệ Thống (Rate Limiting)
- Để tránh bị các đối thủ cạnh tranh cắm Bot click rác, Server Actions kết hợp Vercel Firewall chặn tối đa 3 requests/15 phút đối với luồng Non-login Request.
