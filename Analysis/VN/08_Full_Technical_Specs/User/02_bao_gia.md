# TRANG: Trình Tạo Báo Giá (Wizard 8 Bước)

## 1. ĐỊNH TUYẾN & QUYỀN TRUY CẬP
| Mục | Giá Trị |
|-----|---------|
| URL | `/quote` (nhận `?category=home\|moving\|movein\|special\|regular`) |
| File Mã Nguồn | `src/app/(user)/quote/page.tsx` (34 dòng) |
| Vai Trò Được Phép | Công khai (Khách Vãng Lai + Thành Viên) |
| Yêu Cầu Đăng Nhập | Không — Hỗ trợ luồng Khách Vãng Lai với cookie `guest_session_token` |
| Layout | `(user)/layout.tsx` |
| Kiểu Render | Server shell → Client Component `QuoteWizard` |

## 2. CHỨC NĂNG & TÍNH NĂNG
- **Wizard 8 Bước**: Danh mục → Gói phụ → Diện tích (pyeong) → Địa chỉ (Kakao Daum) → Lịch hẹn (tối đa 3 khung giờ) → Mức độ bẩn + Tải ảnh → Tổng kết + AI Ước tính giá → Gửi
- **Luồng Khách Vãng Lai**: Người chưa đăng ký hoàn thành toàn bộ wizard. Email + SĐT thu thập tại Bước 7. Cookie `guest_session_token` được cấp khi gửi.
- **AI Ước Tính Giá**: Tính từ `service_categories.base_price_per_pyeong × diện tích`
- **Tải Ảnh**: Kéo thả ảnh tình trạng bẩn → Supabase Storage bucket `quote-photos`
- **Danh Mục Mặc Định**: `?category=home` tự chọn sẵn Bước 1
- **Quản Lý State Form**: React Hook Form + Zod validation. Dữ liệu lưu tạm trong bộ nhớ qua các bước, chỉ INSERT DB 1 lần khi Submit cuối.

## 3. CÂY COMPONENT
```
QuotePage (Server)
└── QuoteWizard (Client "use client")
    ├── QuoteSidebar (Client) — thanh bước trên desktop
    ├── QuoteMobileProgress (Client) — thanh tiến trình mobile
    ├── Step1Category (Client)
    ├── Step2SubCategory (Client)
    ├── Step3Area (Client)
    ├── Step4Address (Client) — Kakao Daum postcode
    ├── Step5Schedule (Client) — chọn ngày/giờ
    ├── Step6Options (Client) — mức độ bẩn + upload ảnh
    ├── Step7Summary (Client) — AI estimate + nút gửi
    └── QuoteActions (Client) — nút Quay lại/Tiếp
```

## 4. SERVER ACTIONS & API
| Hàm | File | Mô Tả |
|-----|------|-------|
| `submitQuoteAction` | `quote/_actions/submit-quote.ts` | Người đã đăng nhập → INSERT `cleaning_requests` với `user_id=auth.uid()` |
| `submitGuestQuoteAction` | `quote/_actions/submit-guest-quote.ts` | Khách vãng lai → INSERT với `guest_session_token` + set httpOnly cookie |
| `getCurrentUser()` | `src/lib/auth/current-user.ts` | Xác định Khách vãng lai hay Thành viên |

## 5. BẢNG CƠ SỞ DỮ LIỆU
| Bảng | Cột Sử Dụng | Thao Tác |
|------|-------------|----------|
| `cleaning_requests` | `id, user_id, guest_session_token, category_id, sub_category_id, area_pyeong, address_road, address_detail, region, district, dong, latitude, longitude, preferred_schedule, condition_level, memo, status, ai_estimate_avg, bid_base_max, bid_deadline` | INSERT |
| `service_categories` | `id, name, base_price_per_pyeong` | SELECT (tính AI estimate) |
| `service_sub_categories` | `id, category_id, name` | SELECT (dropdown Bước 2) |
| Storage: `quote-photos` | file blob | UPLOAD |

## 6. ĐĂNG KÝ REALTIME
Không có trên trang này.

## 7. BIẾN MÔI TRƯỜNG
| Biến | Bắt Buộc | Mục Đích |
|------|----------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Có | Khởi tạo Supabase client |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Có | Xác thực Supabase client |

## 8. CHÍNH SÁCH RLS
- `cleaning_requests_user_insert`: Người dùng đã xác thực được phép INSERT yêu cầu của mình
- `quote_photos_user_upload`: Cho phép upload vào đường dẫn `quote-photos/{requestId}/*`
- Luồng Khách vãng lai: `createServiceClient()` bỏ qua RLS sau khi xác minh

## 9. TÍCH HỢP BÊN NGOÀI
| Dịch Vụ | Mục Đích |
|---------|----------|
| **Kakao Daum Postcode API** | Tự động hoàn thành địa chỉ + mã hóa tọa độ tại Bước 4 |
