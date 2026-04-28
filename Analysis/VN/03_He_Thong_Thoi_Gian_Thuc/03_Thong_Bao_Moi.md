# PHÂN TÍCH REALTIME: CHUÔNG THÔNG BÁO (use-notifications-realtime.ts)

## 1. CHỨC NĂNG NÀY ĐỂ LÀM GÌ?
Cái này quản lý cái chuông nhà ở góc màn hình. Bơm con số màu đỏ đếm "Có 1, 2, 3... thông báo mới" khi có biến cố xảy ra như là: "Thợ đã hoàn thành công việc", "Thanh toán thành công", "Sếp nhắn tin v.v".

## 2. NÓ HOẠT ĐỘNG THẾ NÀO?
- **Đầu não ẩn**: File `use-notifications-realtime.ts`.
- Màn hình cắm rễ vào Bảng `notifications`. Cứ ai đẻ thêm dòng mới (Sự kiện `INSERT`) mà đúng mã ID của Bạn (`user_id = Mã của Bạn`) thì chuông sẽ rung.

## 3. LÝ DO GỌI XUYÊN MÁY CHỦ
Ở chức năng Notification này, Lập trình viên KHÔNG chọn nhét thông báo trực tiếp lên giao diện như chức năng CHAT. Mà thay vào đó, khi nghe tiếng chuông, máy của bạn sẽ tự động bảo với Tổng đài: *"Nhờ tổng đài đếm lại tổng kết chính xác xem tôi có bao nhiêu chuông chưa đọc"*. 
- Lệnh gọi đó là: `router.refresh()`.
- **Tại sao?**: Bởi vì làm thế này thì máy tính tổng đài (Server) sẽ một tay quản lý luôn số lượng chưa đọc, và xử phạt các lỗi bảo mật. Đỡ phải chia nhỏ cái việc tính chuông ra các thiết bị điện thoại khác nhau dễ gây sượng lag.

## 4. CHỐNG HỎNG MẠNG VÀ KÊT NỐI KÉP
Khi một khách hàng đang Đăng xuất Nick, sau đó nhảy sang Đăng nhập Nick của bố mẹ. Đường truyền cũ ngay lập tức bị Cắt ống `removeChannel()` để xóa sổ, máy sẽ cắm ống mới cho Nick của bố mẹ. Khống chế bệnh "Một người rung điện thoại 2 lần".
