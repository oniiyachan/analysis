# HỆ THỐNG EMAIL GIAO DỊCH — RESEND INTEGRATION

> **Thư mục mã nguồn**: `src/lib/integrations/resend/`

---

## 1. TỔNG QUAN CÔNG NGHỆ
CleanHi sử dụng **Resend** (resend.com) làm dịch vụ gửi Email giao dịch (Transactional Email). Resend là thế hệ email API hiện đại thay thế SendGrid/Mailgun, hỗ trợ React-Email template rendering phía server.

**Kiến trúc gửi mail**:
- `client.ts`: Khởi tạo Resend SDK client từ env `RESEND_API_KEY`. Nếu thiếu key → no-op (không crash app).
- `send-email.ts`: Hub trung tâm phân phối. Nhận Union Type input, route tới đúng template builder.
- `send-with-attachment.ts`: Gửi email kèm file đính kèm (Biên lai PDF, Hóa đơn thuế).

---

## 2. DANH MỤC 9 TEMPLATE EMAIL

| # | Template ID | Người Nhận | Mục đích | Kích hoạt bởi |
|---|-------------|-----------|----------|---------------|
| 1 | `payment_confirmed` | Khách hàng | Xác nhận đã thanh toán thành công | NicePay confirm callback |
| 2 | `service_completed` | Khách hàng | Dọn xong, mời viết Review + cộng 500P | Partner bấm "Hoàn thành" |
| 3 | `settlement_completed` | Đối tác | Thông báo tiền đã chuyển về tài khoản ngân hàng | CRON settlement-batch |
| 4 | `partner_invitation` | Lính mới | Mời gia nhập team (tạo tài khoản) | Admin duyệt member application |
| 5 | `application_rejected` | Lính xin việc | Thông báo đơn xin bị từ chối | Admin reject |
| 6 | `guest_bid_arrived` | Khách vãng lai | "Có báo giá đầu tiên! Đăng ký để xem" kèm link claim | Thợ bid lần đầu cho đơn Guest |
| 7 | `d1_reminder_user` | Khách hàng | Nhắc nhở D-1: "Ngày mai có lịch dọn dẹp" | CRON d1-reminder |
| 8 | `d1_reminder_partner` | Đối tác | Nhắc nhở D-1: "Ngày mai 10:00 đến nhà khách Kim" | CRON d1-reminder |
| 9 | `broadcast` | Tất cả/Nhóm | Gửi marketing hàng loạt (khuyến mãi, thông báo) | Admin `/admin/broadcast` |

---

## 3. CƠ CHẾ AN TOÀN
- **Fail-Safe**: Mọi lỗi gửi mail đều bị `try/catch` nuốt trọn. App **không bao giờ crash** vì email thất bại.
- **No-Op Mode**: Nếu `RESEND_API_KEY` chưa được cấu hình, hệ thống chỉ in log cảnh báo và bỏ qua (phục vụ môi trường Dev/Preview).
- **Wrapper Template**: File `_wrapper.ts` cung cấp khung HTML responsive với header logo + footer công ty, đảm bảo nhất quán thương hiệu.
