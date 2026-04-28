# TÀI LIỆU TRANG: BẢNG ĐIỀU PHỐI LẮP GHÉP (KANBAN) (ADMIN-MATCHING)

> **Lời ngỏ**: Đây là tài liệu được viết theo ngôn ngữ bình dân cực kỳ dễ hiểu, phục vụ Ban Giám Đốc và nhóm Vận hành hoàn toàn không cần biết kỹ thuật Lập trình.

---

## 1. THÔNG TIN CHUNG
- **Tên trang**: Bảng Điều Phối Lắp Ghép (Kanban)
- **Vị trí của file code**: `src/app/(admin)/admin/matching/page.tsx`
- **Đường link trên trình duyệt**: `[Tên-miền]/admin/matching`

---

## 2. TRANG NÀY SINH RA ĐỂ LÀM GÌ?
Hãy tưởng tượng trang này là **Trạm Xe Ôm. Nó là bảng Trello khổng lồ, nhảy số liền tay. Cứ có khách cần quét nhà, sếp cầm chuột gắp thả thẻ đơn ném cho thợ nhận.**

- **Lợi ích**: Giúp Sếp hoặc Ban Quản Trị can thiệp trực tiếp vào mạch máu của kinh doanh mà không cần phải réo gọi Thợ gõ Code hỗ trợ.

---

## 3. TRÊN CHIẾC MÀN HÌNH NÀY CÓ GÌ? (GIAO DIỆN)
- **Thiết kế**: Hiển thị bảng biểu mượt mà, bộ lọc (Filter) tìm kiếm gắt gao bằng tên hoặc Số Điện Thoại.
- Đặc biệt trang này tách biệt khối "Đổ Dữ Liệu" khổng lồ và Khối "Nghe tiếng Click chuột" để Sếp ấn mượt không bị đơ giật.

---

## 4. TỪ LÚC BẤM VÀO THÌ TRANG NÀY HOẠT ĐỘNG THẾ NÀO?
1. Bạn gõ đường link vào trình duyệt.
2. Cảnh vệ (Middleware) soi xét thẻ đeo (Session Token). Nếu thẻ là Người ngoài hoặc Nhân viên kho quèn -> Tát văng ra ngoài không thương tiếc.
3. Nếu thẻ VVIP (Super Admin/Quản lý), máy chủ lách khe hở khóa chống trộm bê 1 đống số liệu ném cái uỵch vào màn hình cho Sếp xem.

---

## 5. BẢO MẬT: AI ĐƯỢC PHÉP VÀO TRANG NÀY?
- **Được mở**: Quản trị Cấp Cao (Super Admin) và Nhóm chức trách đặc biệt có Thẻ `root`.
- **Hình phạt kẻ trộm**: Hệ thống ép lỗi 403 (Không đủ thẩm quyền).

---

## 6. LẤY DỮ LIỆU TỪ ĐÂU RA VÀ QUY TẮC LÀ GÌ?
Trang này lục file từ Hệ Cơ Sở Dữ Liệu cao cấp. Đảm bảo những Luật lệ khắt khe:
- **Sức mạnh Realtime Websocket, cấm F5, thay đổi luồng thẻ bài tức thì.**
- Áp lực tải được máy chủ nhai sống không cho lưu file tạm. Đảm bảo dữ liệu thời gian thực đễ đỡ bị nhầm số tiền bạc chết người.