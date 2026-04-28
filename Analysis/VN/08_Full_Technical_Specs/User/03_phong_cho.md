# TRANG: Phòng Chờ Báo Giá (Đếm Ngược Đấu Thầu)

## 1. ĐỊNH TUYẾN & QUYỀN TRUY CẬP
| Mục | Giá Trị |
|-----|---------|
| URL | `/waiting/[id]` (nhận `?t=<guest_session_token>` cho magic link) |
| File Mã Nguồn | `src/app/(user)/waiting/[id]/page.tsx` (218 dòng) |
| Vai Trò Được Phép | Chủ yêu cầu (Khách Hàng hoặc Khách Vãng Lai có cookie hợp lệ) |
| Yêu Cầu Đăng Nhập | Không (hỗ trợ Khách vãng lai qua cookie `guest_session_token`) |
| Kiểu Render | `force-dynamic` Server → Client `WaitingClient` |

## 2. CHỨC NĂNG & TÍNH NĂNG
- **Đồng Hồ Đếm Ngược 24 Giờ**: `setInterval(tick, 1000)` trừ thời gian còn lại tới `bid_deadline`
- **Thẻ Báo Giá Live**: Realtime `INSERT` trên bảng `quotes` → thẻ xuất hiện tức thì với hiệu ứng
- **Auto JOIN Fetch**: Khi báo giá mới đến qua WebSocket, âm thầm truy vấn bảng `partners` (tên, đánh giá, ảnh đại diện)
- **Nhập Qua Magic Link**: Email CTA của Khách vãng lai chứa `?t=<token>` → xác minh → set httpOnly cookie → redirect (xóa token khỏi URL để bảo mật)
- **Mở Rộng Đấu Thầu**: Nút "Mở thêm 5 báo giá" → `extendBidsAction` → cập nhật `is_extended=true`, `bid_extend_max`
- **Tự Động Chuyển Trạng Thái**: `pending_payment+` → redirect `/bookings`; `expired` → giao diện xin lỗi
- **Hiển Thị AI Estimate**: Hiện giá trung bình ước tính từ server

## 3. CÂY COMPONENT
```
WaitingPage (Server)
└── WaitingClient (Client "use client")
    ├── Đồng Hồ Đếm Ngược (setInterval)
    ├── Danh Sách Thẻ Báo Giá (động)
    └── Nút Mở Rộng (có điều kiện)
```

## 4. SERVER ACTIONS & API
| Hàm | File | Mô Tả |
|-----|------|-------|
| `extendBidsAction` | `waiting/[id]/_actions/extend-bids.ts` | SET `is_extended=true`, tăng `bid_extend_max` |
| `getCurrentUser()` | `src/lib/auth/current-user.ts` | Kiểm tra phiên đăng nhập |
| `getGuestToken()` | `src/lib/auth/guest-session.ts` | Đọc `guest_session_token` từ cookie |
| `setGuestCookie()` | `src/lib/auth/guest-session.ts` | Set httpOnly cookie khi vào qua magic link |

## 5. BẢNG CƠ SỞ DỮ LIỆU
| Bảng | Cột Sử Dụng | Thao Tác |
|------|-------------|----------|
| `cleaning_requests` | `id, status, bid_count, bid_base_max, bid_extend_max, bid_deadline, is_extended, ai_estimate_avg, guest_session_token` | SELECT |
| `quotes` | `id, total_price, estimated_hours, worker_count, included_services, message, created_at` | SELECT + Lắng nghe Realtime INSERT |
| `partners` | `id, business_name, rating, review_count, total_completed, certifications` | JOIN qua quotes FK |

## 6. ĐĂNG KÝ REALTIME
| Hook/Component | Channel | Sự Kiện | Bảng | Bộ Lọc |
|---------------|---------|---------|------|--------|
| `WaitingClient` | `quotes:request:{id}` | `INSERT` | `quotes` | `request_id=eq.{id}` |

**Chiến lược**: Đẩy trực tiếp vào State (KHÔNG dùng `router.refresh()`). Thẻ mới được push vào mảng React State để đạt độ trễ 0ms.

## 7. BIẾN MÔI TRƯỜNG
| Biến | Bắt Buộc | Mục Đích |
|------|----------|----------|
| `SUPABASE_SERVICE_ROLE_KEY` | Có | Luồng Khách vãng lai bỏ qua RLS qua service client |

## 8. CHÍNH SÁCH RLS
- `quotes_user_read`: Khách hàng đã xác thực đọc báo giá của yêu cầu mình
- Luồng Khách vãng lai: `createServiceClient()` sau khi xác minh `guest_session_token` khớp với yêu cầu

## 9. TÍCH HỢP BÊN NGOÀI
Không có.
