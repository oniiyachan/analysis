# TỔNG QUAN KIẾN TRÚC THỜI GIAN THỰC (REALTIME SYSTEM)

*Tài liệu phân tích cốt lõi công nghệ kết nối trực tiếp (Websockets) của dự án CleanHi, giúp nền tảng giật nảy số liệu lập thời mà không cần f5 trình duyệt.*

## 1. Công Nghệ Lõi (Core Engine)
Hệ thống CleanHi hoàn toàn không sử dụng thư viện cũ kỹ như `Socket.io` hay thuê bao máy chủ Node.js duy trì trạng thái đắt đỏ.
Toàn bộ dự án được xây dựng dựa trên công nghệ **Supabase Realtime** — Bắt trực tiếp sự kiện thay đổi dữ liệu từ tầng lõi của Database (`postgres_changes`).

Bất kỳ khi nào có một lệnh `INSERT`, `UPDATE`, hay `DELETE` thành công vào Cơ sở dữ liệu (Database), PostgreSQL sẽ xì luồng điện Broadcast xuống thẳng Client thông qua cổng Socket.

> **Ví dụ điển hình**: Một bảng `chat_messages` được chèn thêm (INSERT) 1 dòng mới, lập tức máy 2 người đang nói chuyện sẽ nhận được gói tin JSON mà không cần tải lại trang.

---

## 2. Phân Tách 2 Trường Phái Kiến Trúc Song Song
Nhờ có Next.js 16 (App Router), Đội Dev CleanHi đã thông minh chia cơ chế Realtime thành 2 mặt trận để tối ưu hóa CPU cho thiết bị của khách hàng:

### A. Mặt trận 1: Chọc thẳng vào RAM (Client State Append)
- **Áp dụng cho**: Tính năng **Chat Trực Tuyến** (`useChatRealtime`).
- **Cơ chế**: Khi nhận được tín hiệu Postgres_changes, App sẽ không phiền đến Next.js Server. Nó sẽ lấy cục Data đó nhét thẳng (append/push) vào danh sách hiển thị trên giao diện (State React).
- **Lý do**: Tại khung Chat, người dùng có thao tác Cuộn (Scroll). Thiết kế như vậy sẽ giữ độ giật lag ở mức 0ms tuyệt đối. Scrollbar không bị giật lùi về điểm mốc. 

### B. Mặt trận 2: Ép Server Tải Lại Cây Nhánh (Next.js Router Refresh)
- **Áp dụng cho**: **Admin Kanban**, **Quản lý Thông báo**, **Phòng chờ đấu giá Khách hàng**.
- **Cơ chế**: Khi bắt được tín hiệu Realtime, máy khách không quan tâm dữ liệu bên trong là gì, nó lấy sự kiện đó làm MÁY KÍCH NỔ để gọi lệnh `router.refresh()`. Lúc này, Next.js đẩy API chạy Server-Side để hốt phiên bản dữ liệu lưới ngậm mút RLS chuẩn nhất rồi vẽ tải về máy Khách.
- **Lý do**: DRY Code! Việc lấy Kanban sắp xếp logic phức tạp, chia cụm, tính tiền sẽ được nhốt kín ở mặt Server. Client chỉ việc nghe "Có tin mới nổ" -> Ép tải lại. Server sẽ che giấu được toàn bộ logic tính toán nhạy cảm.

---

## 3. Các Chặn Bảo Mật Kép (Security Gates)

Hệ thống Realtime thường dễ bị lộ dữ liệu (Listener Spy) nếu không che chắn. CleanHi áp dụng 2 lớp giáp gai:

1. **Row Level Security (RLS) Database**: Nếu một Thợ rình mò mở WebSocket nặc danh để nghe trộm Room Chat của người khác. Lớp RLS `chat_messages_participant_all` sẽ đóng băng dòng tín hiệu nếu ID user hiện tại không khớp với ID thành viên của Room đó. Data sẽ chết ngay cánh cửa máy chủ PostgreSQL.
2. **Kênh Chứa Kín (Channel Filters)**: Thay vì lắng nghe rào rào toàn cục hệ thống, cấu hình Code sẽ gài cứng tham số: `.channel(chat:[roomId])` và Filter bắt buộc `room_id=eq.[roomId]`. Điều này tối ưu hoá hàng triệu Event thành 1 dòng nhỏ giọt chuẩn xác. Không làm tràn RAM khách hàng (như được thể hiện trong Cleanup Hook `supabase.removeChannel(channel)`).
