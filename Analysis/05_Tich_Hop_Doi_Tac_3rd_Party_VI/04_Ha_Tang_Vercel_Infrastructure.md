# HẠ TẦNG VERCEL & HỆ THỐNG TRIỂN KHAI

> **Nền tảng vận hành**: Vercel (Edge Network) — Toàn bộ dự án CleanHi được host và deploy tự động trên Vercel.

---

## 1. MÔ HÌNH TRIỂN KHAI (DEPLOYMENT MODEL)

| Thành phần | Công nghệ | Vai trò |
|-----------|-----------|---------|
| **Build Engine** | Next.js 16 (App Router) | Biên dịch Server Components + Client bundles |
| **Runtime** | Vercel Edge Functions | Chạy Server Actions + API Routes trên mạng CDN phân tán |
| **Cron Scheduler** | Vercel Cron | Gọi HTTP tự động vào `api/cron/*` theo lịch đặt trước |
| **Preview Deployments** | Vercel Git Integration | Mỗi Pull Request tự động tạo URL preview riêng biệt |
| **Domain** | Custom Domain (cleanhi.kr) | Binding DNS + SSL tự động qua Vercel |

---

## 2. VERCEL CRON JOBS (ĐÃ CẤU HÌNH)

| Đường dẫn API | Tần suất | Mô tả |
|--------------|---------|-------|
| `/api/cron/check-deadlines` | Mỗi 5 phút | Quét hết hạn đấu giá, hết hạn thanh toán |
| `/api/cron/settlement-batch` | 00:00 KST hàng ngày | Quyết toán hoa hồng D+1 cho Thợ |
| `/api/cron/d1-reminder` | 09:00 KST hàng ngày | Nhắc nhở Khách + Thợ trước 1 ngày |
| `/api/cron/anomaly-check` | Mỗi 1 giờ | Quét bất thường (0 bids 24h, ngâm đơn 48h) |
| `/api/cron/deliver-broadcasts` | Mỗi 5 phút | Phát hành Broadcast email/kakao đã lên lịch |
| `/api/cron/recalc-partner-customer-stats` | 03:00 KST hàng ngày | Tính toán CRM khách ruột cho Thợ |

---

## 3. BIẾN MÔI TRƯỜNG QUAN TRỌNG (ENV VARIABLES)

| Biến | Mô tả | Trạng thái |
|------|-------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL dự án Supabase | ✅ Đã cấu hình |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Khóa công khai Supabase | ✅ Đã cấu hình |
| `SUPABASE_SERVICE_ROLE_KEY` | Khóa admin vượt RLS | ✅ Đã cấu hình |
| `NICEPAY_MID` | Mã định danh cổng thanh toán | ⏳ Chờ MID thật |
| `NICEPAY_MERCHANT_KEY` | Khóa xác thực NicePay | ⏳ Chờ MID thật |
| `RESEND_API_KEY` | Khóa API gửi email | ✅ Đã cấu hình |
| `SOLAPI_API_KEY` + `SECRET` | Khóa gửi SMS/Kakao | ✅ Đã cấu hình |
| `CRON_SECRET` | Bảo vệ endpoint Cron | ✅ Đã cấu hình |
| `SUPER_ADMIN_EMAIL` | Email tài khoản Super Admin | ✅ `admin@sharefriends.kr` |

---

## 4. CI/CD PIPELINE (GITHUB ACTIONS)
- **Typecheck**: `pnpm typecheck` kiểm tra TypeScript lỗi biên dịch
- **Lint**: `pnpm lint` (Biome) kiểm tra code style
- **Unit Test**: `pnpm vitest run` — hiện đạt **169/169 test cases pass**
- **E2E Test**: Playwright (đang xây dựng thêm)
- **Auto Deploy**: Push `main` → Vercel tự động build + deploy Production
