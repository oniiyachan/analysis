# TRANG: Trang Chủ / Landing

## 1. ĐỊNH TUYẾN & QUYỀN TRUY CẬP
| Mục | Giá Trị |
|-----|---------|
| URL | `/` |
| File Mã Nguồn | `src/app/(user)/page.tsx` (568 dòng) |
| Vai Trò Được Phép | Công khai (Ai cũng vào được — không cần đăng nhập) |
| Yêu Cầu Đăng Nhập | Không |
| Layout | `(user)/layout.tsx` |
| Kiểu Render | Server Component (RSC) — không gửi JS về trình duyệt |

## 2. CHỨC NĂNG & TÍNH NĂNG
- **Khu Vực Hero**: Banner toàn chiều rộng có nút CTA "30초 견적 받기", ảnh nội thất với hiệu ứng nghiêng khi hover
- **Bảng Thống Kê Live**: 3 thẻ — Tổng báo giá 12,847 / Đối tác 847 / Điểm đánh giá 4.8
- **Lưới Danh Mục Dịch Vụ**: 5 thẻ ảnh bấm được (Gia đình/Chuyển nhà/Nhập cư/Đặc biệt/Định kỳ) → `/quote?category={id}`
- **Lưới Giá Trị Cơ Bản (Bento Grid)**: 4 thẻ (Xác Minh Đối Tác / Bảo Đảm 100% / Giá Minh Bạch / Thân Thiện Môi Trường)
- **Hướng Dẫn Sử Dụng**: 3 bước dạng dọc với đường nối thời gian
- **Đánh Giá Khách Hàng**: 3 thẻ tĩnh (carousel tương tác dự kiến Ngày 5)
- **Huy Hiệu Tin Cậy**: 4 biểu tượng (Kiểm Tra Lý Lịch / Bảo Hiểm / Ký Quỹ / Bảo Đảm Hài Lòng)
- **Banner Tuyển Đối Tác**: Banner tối liên kết tới `/partner`
- **Footer Pháp Lý**: Thông tin công ty từ config `COMPANY` (CEO, mã số kinh doanh, địa chỉ, TMĐT)

## 3. CÂY COMPONENT
```
LandingPage (Server)
├── Image (next/image) × 8
├── Link (next/link) × 12
└── COMPANY config (footer)
```
Toàn bộ render phía Server. Không có directive `"use client"`.

## 4. SERVER ACTIONS & API
| Hàm | File | Mô Tả |
|-----|------|-------|
| `getCurrentUser()` | `src/lib/auth/current-user.ts` | Kiểm tra phiên đăng nhập để hiển thị CTA khác nhau |

## 5. BẢNG CƠ SỞ DỮ LIỆU
Không truy vấn database trực tiếp. Trang marketing tĩnh.

## 6. ĐĂNG KÝ REALTIME
Không có.

## 7. BIẾN MÔI TRƯỜNG
| Biến | Bắt Buộc | Mục Đích |
|------|----------|----------|
| `COMPANY_LEGAL_NAME` | Tùy chọn | Ghi đè tên pháp lý ở footer |
| `COMPANY_CEO` | Tùy chọn | Ghi đè tên CEO |
| `COMPANY_BUSINESS_NUMBER` | Tùy chọn | Mã số đăng ký kinh doanh |
| `COMPANY_ECOMMERCE_NUMBER` | Tùy chọn | Mã giấy phép TMĐT |
| `COMPANY_ADDRESS` | Tùy chọn | Địa chỉ công ty |
| `COMPANY_PHONE` | Tùy chọn | Số điện thoại CSKH |
| `COMPANY_EMAIL` | Tùy chọn | Email CSKH |

## 8. CHÍNH SÁCH RLS
Không truy cập database — không liên quan RLS.

## 9. TÍCH HỢP BÊN NGOÀI
Không có.
