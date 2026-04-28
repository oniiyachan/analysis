# SPRINT 1: MÓC NỐI MẠCH MÁU & PHỦ NHỰA BẢO VỆ
*(Thời gian dự kiến: Tuần 1 - Tuần 2 | Ngày 1 đến Ngày 14)*

> **Nhiệm vụ trọng tâm**: Phá đập ảo, xả nước thật. Bơm toàn bộ API Key thật của đối tác vào hệ thống, sau đó thả Bot tự lượn quét kiểm thử cào rách mọi Use-Case.

---

## 🎯 MỤC 1: Đồng Bộ Hóa Thanh Toán (NicePay Live)

**File liên quan**: `src/app/api/nicepay/confirm/route.ts`, `src/lib/integrations/nicepay/client.ts`

| Task | Mô Tả Chi Tiết | Ước Lượng |
|------|----------------|-----------|
| 1.1 | Lắp mã Vercel Env: `NICEPAY_MID`, `NICEPAY_MERCHANT_KEY`, `NICEPAY_SECRET_KEY`, `NICEPAY_WEBHOOK_SECRET` | 0.5 ngày |
| 1.2 | Phá cơ chế Sandbox: gỡ `NICEPAY_ENV=sandbox`, chuyển sang `production` | 0.5 ngày |
| 1.3 | Giả lập thanh toán thẻ thật 100,000₩ → Xác nhận `payments.status='paid'` trong DB | 1 ngày |
| 1.4 | Gọi Hotline NicePay 1661-0808 refund → Xác nhận pipeline refund hoạt động | 0.5 ngày |
| 1.5 | Kiểm tra `payment_reconciliation_queue` trống (không orphan) | 0.5 ngày |
| 1.6 | Đăng ký Webhook URL `cleanhi.vercel.app/api/nicepay/webhook` trên NicePay Console | 0.5 ngày |

---

## 🎯 MỤC 2: Thông Suốt Đường Ống Thông Báo (Kakao Alimtalk & Resend Email)

**File liên quan**: `src/lib/integrations/solapi/`, `src/lib/integrations/resend/`, `src/lib/domain/broadcast/deliver.ts`

| Task | Mô Tả Chi Tiết | Ước Lượng |
|------|----------------|-----------|
| 2.1 | Gỡ bỏ `status='skipped'` trong `broadcast/deliver.ts` | 0.5 ngày |
| 2.2 | Đẩy 5 Template Kakao Alimtalk lên Solapi chờ duyệt (bidding alert, booking confirm, D-1 reminder, review nudge, refund notice) | 1 ngày |
| 2.3 | Thiết lập Fallback: Kakao rớt → SMS Solapi Local | 0.5 ngày |
| 2.4 | Bơm Design React-Email cho biên lai thanh toán Guest (`guest_bid_arrived`) | 1 ngày |
| 2.5 | Bật `marketing_consent` gate: Chỉ gửi broadcast cho user đã đồng ý nhận tin | 0.5 ngày |
| 2.6 | Test end-to-end: Tạo đơn → Thợ bid → Khách nhận Kakao + Email thật | 1 ngày |

---

## 🎯 MỤC 3: Phủ Cát Chống Lún E2E Tests (Playwright)

**File liên quan**: `tests/e2e/` (tạo mới)

| Task | Mô Tả Chi Tiết | Ước Lượng |
|------|----------------|-----------|
| 3.1 | **Case Bom Hàng**: Đặt hàng → Bidding → NicePay confirm → Rút cắn cáp → Kiểm Idempotency | 1 ngày |
| 3.2 | **Case Cướp Đơn**: 3 tài khoản Thợ đồng loạt bấm "Nhận thầu" cùng 1 giây (Race condition) | 1 ngày |
| 3.3 | **Case Bảo Vệ Admin**: Cấm thợ/khách truy cập `/admin/*`. Kiểm RLS + middleware guard | 0.5 ngày |
| 3.4 | **Case Guest Flow**: Khách vãng lai báo giá → nhận email → đăng ký → claim request | 1 ngày |
| 3.5 | Tích hợp Playwright vào GitHub Actions CI (job riêng) | 0.5 ngày |

---

> 💡 **Cách ra lệnh**: Sếp nhắn *"Tiến hành Sprint 1 - Mục 1"* hoặc *"Sprint 1 - Mục 2"*, tôi sẽ tự bóc Code đè vào hệ thống theo đúng Task list!
