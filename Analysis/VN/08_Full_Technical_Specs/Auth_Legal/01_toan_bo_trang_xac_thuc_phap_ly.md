# TRANG: Đăng Nhập

## 1. ĐỊNH TUYẾN & QUYỀN TRUY CẬP
| Mục | Giá Trị |
|-----|---------|
| URL | `/login` (hỗ trợ `?next=` chuyển hướng) |
| File Mã Nguồn | `src/app/(auth)/login/page.tsx` (113 dòng) |
| Vai Trò | Công khai (chưa đăng nhập) |
| Yêu Cầu Đăng Nhập | Không |
| Layout | `(auth)/layout.tsx` — thẻ căn giữa với logo thương hiệu |
| Kiểu Render | Client Component (`"use client"`) |

## 2. CHỨC NĂNG & TÍNH NĂNG
- **Đăng Nhập Email + Mật Khẩu**: `signInWithPassword` qua Supabase Auth
- **React 19 useActionState**: Form nâng cao với `loginAction`
- **Chuyển Hướng Tiếp**: `?next=` được giữ trong hidden input → redirect sau thành công
- **Lỗi Từng Trường**: Zod validation hiển thị lỗi theo field
- **Banner Lỗi Form**: Thông báo lỗi xác thực chung
- **Liên Kết Điều Hướng**: "Quên mật khẩu" → `/reset-password`, "Đăng ký" → `/signup`
- **Suspense Boundary**: `useSearchParams()` bọc trong `<Suspense>` theo yêu cầu Next.js 16

## 3. CÂY COMPONENT
```
LoginPage (Client)
└── Suspense
    └── LoginForm (Client)
        ├── Input (email)
        ├── Input (mật khẩu)
        ├── Button (gửi)
        └── Link (đăng ký, quên mật khẩu)
```

## 4. SERVER ACTIONS
| Hàm | File | Mô Tả |
|-----|------|-------|
| `loginAction` | `src/lib/integrations/supabase/auth-actions.ts` | `signInWithPassword` → redirect đến `next` hoặc `/` |

## 5. BIẾN MÔI TRƯỜNG
| Biến | Bắt Buộc | Mục Đích |
|------|----------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Có | URL dự án Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Có | Khóa ẩn danh Supabase |

---

# TRANG: Đăng Ký Tài Khoản

## 1. ĐỊNH TUYẾN
| Mục | Giá Trị |
|-----|---------|
| URL | `/signup` (hỗ trợ `?next=`) |
| File Mã Nguồn | `src/app/(auth)/signup/page.tsx` (214 dòng) |
| Kiểu Render | Client Component (`"use client"`) |

## 2. CHỨC NĂNG
- **Trường Đăng Ký**: Email, Mật khẩu, Xác nhận mật khẩu, Tên, Số điện thoại
- **Checkbox Đồng Ý** (ADR 0002):
  - ✅ Điều khoản dịch vụ (bắt buộc) → link đến `/legal/terms`
  - ✅ Chính sách bảo mật (bắt buộc) → link đến `/legal/privacy`
  - ☐ Nhận thông tin marketing (tùy chọn) — coupon & sự kiện
- **Zod Validation Server-Side**: Tất cả trường xác thực phía server
- **Quy Tắc Mật Khẩu**: Chữ+số, tối thiểu 8 ký tự
- **Lưu Bằng Chứng Đồng Ý** (Migration 24): `terms_accepted_at`, `privacy_accepted_at`, `marketing_accepted_at` lưu timestamp trong `profiles`

## 3. SERVER ACTIONS
| Hàm | File | Mô Tả |
|-----|------|-------|
| `signupAction` | `src/lib/integrations/supabase/auth-actions.ts` | `signUp` → INSERT `profiles` → redirect |

## 4. BẢNG CSDL
| Bảng | Cột | Thao Tác |
|------|-----|----------|
| `auth.users` | `email, encrypted_password` | INSERT (Supabase Auth) |
| `profiles` | `id, email, name, phone, role='customer', terms_accepted_at, privacy_accepted_at, marketing_accepted_at` | INSERT |

---

# TRANG: Quên Mật Khẩu (Yêu Cầu Link Reset)

## 1. ĐỊNH TUYẾN
| Mục | Giá Trị |
|-----|---------|
| URL | `/reset-password` |
| File Mã Nguồn | `src/app/(auth)/reset-password/page.tsx` (74 dòng) |

## 2. CHỨC NĂNG
- **Chỉ Nhập Email**: Người dùng nhập email đã đăng ký
- **Bảo Mật**: Luôn hiện cùng thông báo bất kể email có tồn tại (chống enumeration)
- **Supabase `resetPasswordForEmail`**: Gửi email magic link chứa token reset
- **Hiển Thị Kết Quả**: Banner xanh thành công hoặc đỏ lỗi

## 3. SERVER ACTIONS: `resetPasswordAction` → `resetPasswordForEmail` → gửi email

---

# TRANG: Đặt Mật Khẩu Mới

## 1. ĐỊNH TUYẾN
| Mục | Giá Trị |
|-----|---------|
| URL | `/update-password` |
| File Mã Nguồn | `src/app/(auth)/update-password/page.tsx` (71 dòng) |
| Vai Trò | Đã đăng nhập (qua magic link token từ email reset) |

## 2. CHỨC NĂNG
- **Điểm Vào**: Người dùng đến qua magic link → Supabase session tự động tiêm
- **Hai Trường**: Mật khẩu mới + Xác nhận mật khẩu mới
- **Supabase `updateUser`**: Cập nhật mật khẩu trong `auth.users`
- **Redirect Thành Công**: → `/` (trang chủ)

## 3. SERVER ACTIONS: `updatePasswordAction` → `updateUser({ password })` → redirect `/`

---

# TRANG: Điều Khoản Dịch Vụ (Pháp Lý)

## 1. ĐỊNH TUYẾN
| Mục | Giá Trị |
|-----|---------|
| URL | `/legal/terms` |
| File Mã Nguồn | `src/app/legal/terms/page.tsx` (159 dòng) |
| Vai Trò | Công khai |
| Kiểu Render | Server Component (tĩnh) |

## 2. CHỨC NĂNG
- **11 Điều Khoản Pháp Lý** (tuân thủ luật thương mại điện tử Hàn Quốc):
  1. Mục đích
  2. Định nghĩa (Người dùng, Đối tác, Đấu giá ngược, Phí nền tảng 15%)
  3. Hiệu lực & sửa đổi điều khoản (thông báo 7/30 ngày)
  4. Đăng ký thành viên & hợp đồng
  5. Cung cấp dịch vụ
  6. Thanh toán & Hoàn tiền (24h hoàn toàn, sau đó 10% phí)
  7. Nghĩa vụ đối tác (cảnh cáo → đình chỉ 3 ngày → chấm dứt tại 3 lần)
  8. Quyết toán (D+1 ngày làm việc tiếp)
  9. Giải quyết tranh chấp (khung 48h, bảo hiểm tối đa ₩100M)
  10. Miễn trừ trách nhiệm (bất khả kháng, giao dịch ngoài)
  11. Luật áp dụng (Tòa án Quận Trung tâm Seoul, luật Hàn Quốc)
- **Footer Phiên Bản**: v1 MVP (2026-04-21), chờ review pháp lý Phase 3
- **SEO Metadata**: Tiêu đề + mô tả

## 3. THAM CHIẾU CSDL: `profiles.terms_accepted_at` — timestamp khi user đồng ý phiên bản này

---

# TRANG: Chính Sách Bảo Mật (Pháp Lý)

## 1. ĐỊNH TUYẾN
| Mục | Giá Trị |
|-----|---------|
| URL | `/legal/privacy` |
| File Mã Nguồn | `src/app/legal/privacy/page.tsx` (136 dòng) |
| Vai Trò | Công khai |
| Kiểu Render | Server Component (tĩnh) |

## 2. CHỨC NĂNG
- **9 Phần Bảo Mật** (tuân thủ Luật Bảo Vệ Thông Tin Cá Nhân Hàn Quốc):
  1. Tổng quan
  2. Mục thu thập: Bắt buộc (email, hash mật khẩu, tên, SĐT) / Dịch vụ (địa chỉ, ảnh, thanh toán) / Tự động (IP, cookie, log) / Tùy chọn (marketing)
  3. Mục đích thu thập & sử dụng
  4. Thời gian lưu giữ: Hợp đồng 5 năm / Thanh toán 5 năm / Khiếu nại 3 năm / IP đăng nhập 3 tháng
  5. Cung cấp cho bên thứ ba
  6. Đơn vị xử lý ủy thác:
     - **Supabase Inc.** — DB/Auth/Storage (vùng Tokyo)
     - **Vercel Inc.** — Hosting web (vùng Seoul)
     - **NicePay** — Xử lý thanh toán
     - **Resend Inc.** — Email giao dịch
  7. Quyền người dùng (truy cập, sửa, xóa, tạm dừng xử lý)
  8. Cookie & thu thập tự động
  9. Người phụ trách: Công ty Higher Inc. (주식회사 하여)
- **Footer Phiên Bản**: v1 MVP (2026-04-21), chờ review pháp lý Phase 3

## 3. THAM CHIẾU CSDL: `profiles.privacy_accepted_at` — timestamp khi user đồng ý phiên bản này
