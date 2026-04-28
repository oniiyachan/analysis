# TRANG: Gửi Thông Báo Hàng Loạt (Broadcast)

## 1. ĐỊNH TUYẾN
| Mục | Giá Trị |
|-----|---------|
| URL | `/admin/broadcast` |
| Vai Trò | Admin |

## 2. CHỨC NĂNG
- **Form Gửi** (`BroadcastForm`): Tiêu đề, nội dung, đối tượng (tất cả/khách/đối tác), lên lịch
- **Lịch Sử Gửi**: Bảng broadcast đã gửi với thống kê giao nhận
- **Hủy Đã Lên Lịch**: Hủy broadcast đang chờ trước giờ gửi

## 3. SERVER ACTIONS
| Hàm | File | Mô Tả |
|-----|------|-------|
| `createBroadcast` | `admin/broadcast/_actions/create-broadcast.ts` | INSERT `broadcasts` |
| `cancelBroadcast` | `admin/broadcast/_actions/cancel-broadcast.ts` | UPDATE `broadcasts.status='cancelled'` |

## 4. BẢNG CSDL
| Bảng | Cột | Thao Tác |
|------|-----|----------|
| `broadcasts` | `id, title, body, target, status, scheduled_at, sent_count, created_at` | SELECT + INSERT + UPDATE |
