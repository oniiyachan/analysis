# TRANG: Chi Tiết Ticket CS

## 1. ĐỊNH TUYẾN
| Mục | Giá Trị |
|-----|---------|
| URL | `/admin/cs/[id]` |
| File Mã Nguồn | `src/app/(admin)/admin/cs/[id]/page.tsx` |
| Vai Trò | Admin |

## 2. CHỨC NĂNG
- **Xem Chi Tiết Ticket**: Mô tả, ảnh, thông tin khách, tham chiếu booking
- **Form Phản Hồi**: Admin viết phản hồi, thay đổi trạng thái
- **Hành Động Giải Quyết**: Đánh dấu đã giải quyết, chuyển cấp

## 3. SERVER ACTIONS
| Hàm | File | Mô Tả |
|-----|------|-------|
| `replyAction` | `admin/cs/[id]/_actions/reply-action.ts` | INSERT phản hồi + UPDATE trạng thái ticket |

## 4. BẢNG CSDL
| Bảng | Cột | Thao Tác |
|------|-----|----------|
| `cs_tickets` | `id, status, description, photos, profile_id, booking_id` | SELECT + UPDATE |
| `cs_ticket_replies` | `ticket_id, author_id, body, created_at` | INSERT |
