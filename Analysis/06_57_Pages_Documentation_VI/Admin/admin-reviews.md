# DOC CHI TIẾT TRANG: ADMIN REVIEWS
- **Tệp Nguồn Code**: `src/app/(admin)/admin/reviews/page.tsxpage.tsx`
- **Đường Dẫn URL**: `/admin/reviews`

---

## 1. Bản Vẽ Luồng Người Dùng (Luồng Hoạt Động Cốt Lõi)

```mermaid
graph TD
    A([Truy cập trang]) --> B[Trình duyệt Gọi Page: /admin/reviews]
    B --> C{Kiểm tra Cấp Quyền / Validator}
    C -->|Thành công| D([Gửi request lấy DB Server])
    C -->|Thất bại| E[Đá văng / Xử lý lỗi UI]
```
- **Mô Tả Chức Năng**: Giao diện cốt lõi (Core Engine) đứng ra fetch và hiển thị dữ liệu cho luồng định tuyến /admin/reviews.

## 2. Phân Quyền Truy Cập (Security RBAC)
- **Nhóm Cho phép**: Quản trị cấp cao (Super Admin), Ops, CS, Marketing
- **Nhóm Bị cấm**: Khách hàng, Thợ dọn dẹp
- **Bảo mật**: Chuyển hướng cảnh báo 403 nếu truy cập sai quyền.

## 3. Kiến Trúc Cơ Sở Dữ Liệu
- **Thao tác**: Ưu tiên đọc dữ liệu tổng thể qua hàm `createServiceClient()` nhằm bỏ qua RLS.
- **Bảo mật SQL**: Chốt chặn truy vấn tuân theo quy tắc khai báo RLS (Supabase Row-Level-Security).

## 4. Đặc Điểm Mã Nguồn & Hàm Gọi
- **Chiến lược Hiển Thị**: Trang Server Components (Tự động cập nhật sống force-dynamic).
- **Mã Kính Hiển Vi UI**: Giao diện hành vi "nhấp chuột / nhập liệu" đều được tách lẻ ra "use client" để chống tình trạng treo nghẽn bộ vi xử lý Server Vercel.

## 5. Xử Lý Ngoại Lệ & Lỗi Triển Khai
- **Sốc Nguồn Mạng**: Sẽ kích hoạt Lỗi Hệ Thống Lõi (Native Error Boundary).
- **Dữ liệu mồ côi (Trống)**: Được quy chuẩn hóa đổ bóng render khung `<EmptyState />` khi Data Database trả về biến 0 dòng.