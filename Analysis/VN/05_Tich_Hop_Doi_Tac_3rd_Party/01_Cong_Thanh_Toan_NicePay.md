# TÍCH HỢP CỔNG THANH TOÁN QUỐC GIA (NICEPAY 2.0)

> **Mô Tả**: Đây là cỗ máy kéo tiền về Server. NicePay là Payment Gateway chính thức kết nối hệ thống dự án tại khu vực máy chủ Hàn Quốc.

---

## 1. KIẾN TRÚC GỌI API (FLOW)
**Sơ đồ 3 Bước chuẩn:**
1. Khách hàng Bấm Nút Thanh Toán: Server Next.js sinh ra 1 Mã Hóa Đơn (`order_id`) dạng cấu trúc `ORD-[UID]-[TIMESTAMP]`.
2. UI Máy Khách ngả về iFrame Web-bắt của NicePay (Client SDK). Nhập thông tin thẻ và Mật khẩu. Hãng thẻ gửi Tín Niệm Rác (Token Approval) nhả ngược về Server URL: `/api/payments/nicepay/callback`.
3. Server nhận Tín Niệm rác -> Đắp mã Key riêng (MID Secret) -> Bắn chìm (S2S API) sang máy chủ Máy Quẹt Thẻ NicePay. NicePay trừ tiền Khách, trả về 1 Biến Object `{"status": "PAID"}`.
4. Server Update trạng thái đơn `cleaning_requests` -> `assigned`, chốt trạng thái `payments` -> `completed`.

---

## 2. LUẬT IDEMPOTENCY (CHỐNG TRỪ TIỀN KÉP - DOUBLE CHARGE)
Một rủi ro cực rát ở cổng thanh toán là Hành Động Click Spam (Bấm nút Mua nhiều lần).
- **Khóa cửa Database**: Bảng `payments` áp dụng khóa Unique lên `order_id` hoặc cột `transaction_id`.
- Khi NicePay đập Callback về Server báo tin. Trong Vercel Server Function có gài mìn check State `if (payment.status === 'completed') return false`. Nếu ngân hàng có nhỡ đập cửa Server 2, 3 luồng vì lag, Máy chủ đều làm ngơ luồng số 2, số 3 lại. Đảm bảo tiền chỉ vô 1 lần và đơn chỉ đẻ 1 lần.

---

## 3. NGOẠI LỆ NGHIỆP VỤ & LƯU Ý
- **Cơ chế Tiền KRW**: Giao dịch thấp nhất là `100 KRW` (Won Hàn Quốc). Nếu phí dọn dẹp bằng Coupon trừ sạch thành 0 đồng, Server bỏ qua NicePay và tự xử lý Full Auto (Miễn Phí) không móc cổng ngoài.
- **Rẽ nhánh Mobile vs Desktop**: Môi trường Web di động trên App (Mobile) bắt buộc phải trả qua URL Redirect Context (Trang chuyển trang tải lại tab do Ngân hàng cấm popup). Desktop thì là iFrame hộp nhỏ giữa màn hình (Pop-up iframe). Quá trình này được nhúng tay ở thẻ UI.
