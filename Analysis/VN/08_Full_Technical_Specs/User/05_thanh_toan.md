# TRANG: Thanh Toán (Checkout)
## 1. URL: `/payment/[id]` (id = quoteId) | Vai trò: Khách (chủ yêu cầu)
## 2. CHỨC NĂNG: Tóm tắt booking, nhập coupon, dùng điểm (min ₩100), phân tích giá, NicePay SDK
## 3. SERVER ACTIONS: `applyCoupon`, `applyPoints`, `initPayment`, `/api/nicepay/confirm`
## 4. BẢNG: `quotes`, `partners`, `cleaning_requests`, `coupons`, `profiles`, `loyalty_events`, `payments`, `bookings`
## 5. ENV: `NICEPAY_MID`, `NICEPAY_MERCHANT_KEY`, `NICEPAY_CLIENT_ID`, `NEXT_PUBLIC_APP_URL`
## 6. TÍCH HỢP: **NicePay SDK 2.0** — thẻ, chuyển khoản, Kakao/Naver/Samsung Pay
