# BÁO CÁO TOÀN KIỂM SOURCE CODE CLEANHI
*Tiến hành vào ngày 28 Tháng 04 Năm 2026*

Thông qua việc đánh giá hai lõi tài liệu kỹ thuật là `@TODO.md` và `SPEC.md`, bức tranh toàn cảnh của hệ thống hiện tại được thể hiện như sau:

---

## 1. NHỮNG MẠCH MÁU ĐÃ CHẠY HOÀN HẢO (100% DONE)
Đây là các cục xương sống đã được nhóm Dev đóng băng, chống chịu tốt và **không cần** mất thời gian chắp vá trong 60 Ngày tới:

| STT | Module | Chi Tiết Hoàn Thành | Commit / Mốc |
|-----|--------|---------------------|---------------|
| 1 | **Customer Wizard 8 Bước** | Form báo giá động, tọa độ Kakao Daum, lưu phiên Non-member (Guest Cookie), AI ước giá | Sprint 2 Day 5 |
| 2 | **Realtime Bidding Engine** | Supabase `postgres_changes` WebSocket, đếm bid live, chờ thợ kéo giá | Sprint 2 hoàn tất |
| 3 | **Database Fortress (23 bảng)** | RLS cấp hàng, Admin RBAC Option C (`admin_role` super/ops/cs/marketing), Rate-limit IP/email | Mig 01→19 |
| 4 | **Partner CRM & 3-Role** | Owner/Lead/Worker, quản lý đội thợ, hồ sơ doanh nghiệp, CRM khách ruột | Phase 7 A+B+C |
| 5 | **Admin Command Center** | KanBan Drag-Drop matching, CS Ticket, Analytics 2 chart, Audit Logs, Broadcast | Phase 2 sprint |
| 6 | **NicePay SDK (Skeleton)** | Prepare → Confirm → Idempotency gate → Compensating cancel. Webhook orphan queue | Track A PR#7 |
| 7 | **Chat Realtime** | `useChatRealtime` hook, State Append 0ms, RLS participant filter | Đã deploy |
| 8 | **Review Flow** | Viết đánh giá 5 sao, Thợ phản hồi, Admin ẩn/hiện, tự động cập nhật rating | Phase 2 stream A |
| 9 | **Auth & Security** | Email/Password login, Guest session claim, safe-redirect, rate-limit DB | Phase 1 hoàn tất |
| 10 | **Legal Pages** | `/terms`, `/privacy`, consent gate | Phase 2 stream D |

---

## 2. NHỮNG MẢNG TỐI ĐANG BỊ BYPASS (NỢ KỸ THUẬT)
Lý do dự án cần thêm **1.5 đến 2 tháng** nữa xuất phát từ việc các Dev chưa nối điện thực tế vào API của bên thứ 3, hoặc bỏ dở các tính năng rườm rà:

| STT | Hạng Mục Nợ | Mô Tả Vấn Đề | Mức Độ |
|-----|-------------|---------------|--------|
| 1 | **NicePay MID Thật** | SDK đã gắn nhưng chạy Sandbox. Cần MID/Key thật + test thẻ thật + refund hotline | 🔴 Chặn Launch |
| 2 | **Kakao Alimtalk (Solapi)** | Template đã code nhưng `status='skipped'`. Chờ duyệt template Kakao + `marketing_consent` gate | 🔴 Chặn Launch |
| 3 | **Email Resend Live** | Template React-Email đã design, logic bắn đã code. Thiếu env thật + biên lai PDF | 🟠 Quan trọng |
| 4 | **Vercel CronJobs** | `check-deadlines`, `anomaly-check`, `settlement-batch` có route nhưng body rỗng/thiếu | 🟠 Quan trọng |
| 5 | **E2E Playwright Tests** | Chỉ có Vitest unit 169 case. Chưa có E2E cho payment flow, bid race, admin guard | 🟠 Quan trọng |
| 6 | **Recurring Bookings** | Trang `/mypage/recurring` có UI shell, chưa có backend spawn logic + auto-charge | 🟡 P2 |
| 7 | **OpenBanking Escrow** | Tính tiền thợ vẫn CSV thủ công. Chưa có API FirmBanking tự động D+1 | 🟡 P2 |
| 8 | **Heatmap Analytics** | Recharts có 2 chart cơ bản. Thiếu Kakao Maps 25 quận overlay | 🟡 P2 |
| 9 | **Security Headers** | CSP report-only chưa enforce. HSTS/X-Frame chưa bật | 🟡 Track B |
| 10 | **Sentry / Error Tracking** | Chưa tích hợp bất kỳ dịch vụ monitoring nào | 🟡 Track B |
| 11 | **BotID / CAPTCHA** | Thử rồi rollback (`4c667a5` → revert). Cần xác nhận Vercel Pro plan | 🟡 Chờ quyết định |
| 12 | **Coupon Checkout Gate** | Mã giảm giá đã có DB nhưng chưa có Server Action apply vào giỏ hàng | 🟠 Quan trọng |

---

## 3. KẾT LUẬN CHIẾN LƯỢC

> **Dự án Đã Xong Khung Nhà (MVP Core ~75%)**. Phần 2 tháng tới là:
> - Tuần 1-2: Trát vôi vữa (Đi điện thật NicePay + Kakao)
> - Tuần 3-4: Đi đường ống nước (CronJobs + CS refund + Coupon)
> - Tuần 5-6: Lắp nội thất cao cấp (Recurring + OpenBanking + Heatmap)
> - Tuần 7-8: Nghiệm thu chịu tải + Mở cửa hàng (Security + Sentry + Go-Live)
