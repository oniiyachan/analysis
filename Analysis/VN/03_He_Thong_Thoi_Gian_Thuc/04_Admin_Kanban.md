# PHÂN TÍCH REALTIME: BẢNG KANBAN QUẢN LÝ (use-matching-realtime.ts)

## 1. DÀNH CHO AI VÀ LÀM GÌ?
Cái này dành độc quyền cho màn hình Nhân Viên Vận Hành Admin (Trang Quản trị Matching).
Nó là một Bảng Cột kéo thả (Giống Trello). Các Đơn Hàng Của Khách sẽ là các miếng dán thẻ (Card).
Nhờ công nghệ thời gian thực, quản lý chỉ việc ngồi vắt chân lên ghế xem, khi Khách tạo đơn mới thì miếng dán tự đẻ ra, Khi thợ nộp báo giá thì miếng dán tự bay sang cột "Đã có báo giá". Tất cả diễn ra siêu ảo diệu tự động.

## 2. HOẠT ĐỘNG SAO?
- Lần này nó nghe ngóng tận 2 Bảng cùng lúc:
  1. Bảng `cleaning_requests`: Quản lý tình hình đẻ đơn (INSERT) và chuyển cột Cập nhật (UPDATE).
  2. Bảng `quotes`: Bảng quản lý tiền báo giá. Bất cứ khi thợ nào nộp tiền (INSERT), cái bảng Kanban Của Admin cũng tự động nảy số lượng "+1 người đã nộp giá".

## 3. LÀM SAO ĐỂ VẬN HÀNH TRƠN TRU KHỐI LƯỢNG LỚN?
Vì đây là bảng Quản Trị của Admin, Admins thì phải thấy TOÀN BỘ ĐƠN trên thế giới đổ về hệ thống (Không có bị lọc theo Mã phòng ID như Chat).
Nên mỗi khi có thay đổi, điện thoại Admin sẽ ra lệnh ép máy chủ Load nhanh lại Cục Thẻ Bài Kanban (`router.refresh()`). Không có Delay nháy nháy. 

Và dĩ nhiên nhân viên nào lén vào đường truyền này sẽ gãy mạch luôn bì vướng ma trận khóa cửa RLS Admin Only.
