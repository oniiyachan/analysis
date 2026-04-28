# TÀI LIỆU TRANG: ADMIN ALERTS (THEO DÕI LỖI VÀ BẤT THƯỜNG)

> **Lời ngỏ**: Đây là tài liệu được viết theo ngôn ngữ cực kỳ đơn giản và dễ hiểu, dành cho những ai không biết lập trình (Sếp, Ban giám đốc, hoặc Kế toán) cũng có thể đọc và hiểu chính xác trang web này hoạt động ra sao.
> **Trang đang giải thích**: `admin/alerts` (Nơi theo dõi các lỗi phát sinh của hệ thống).

---

## 1. THÔNG TIN CHUNG
- **Tên trang**: Bảng theo dõi lỗi hệ thống.
- **Vị trí của file code**: `src/app/(admin)/admin/alerts/page.tsx`
- **Đường link trên trình duyệt**: `[Tên-miền-của-bạn]/admin/alerts`

---

## 2. TRANG NÀY SINH RA ĐỂ LÀM GÌ?
Hãy tưởng tượng trang này là một cái **"Radar Cảnh Báo"**. Bất cứ lúc nào khách hàng đặt dịch vụ hay thợ dọn dẹp làm việc mà xảy ra vấn đề (như thợ bùng lịch không đến, tiền chuyển bị kẹt), cái Radar này sẽ tóm lấy lỗi đó và báo cáo lên màn hình.
- **Lợi ích**: Giúp nhân viên trực tổng đài can thiệp ngay lập tức trước khi khách hàng tức giận gọi điện mắng chửi. Nó giúp không bị mất tiền oan và chặn rủi ro kinh doanh.

---

## 3. TRÊN CHIẾC MÀN HÌNH NÀY CÓ GÌ? (GIAO DIỆN)
Trang web này rất gọn gàng, nó hiển thị dạng danh sách (dạng Bảng):
- **Góc trên**: Đếm cho sếp biết hiện tại đang có mấy lỗi Mới chưa ai xử lý, và có mấy lỗi Cực Kỳ Nguy Hiểm (sẽ được tô màu Đỏ nhấp nháy cho dễ nhìn).
- **Ở Giữa**: Danh sách các sự vụ. Admin có thể bấm chuyển qua lại giữa việc "Chỉ xem các lỗi chưa xử lý" hoặc "Xem toàn bộ lịch sử lớn bé".
- **Tính năng tiện lợi**: Có những ô Checkbox (ô tích vuông) để nhân viên tích chọn cùng lúc 10 cái phiếu lỗi và bấm nút "Đã giải quyết xong" chỉ với một phát click chuột, thay vì phải bấm xác nhận từng cái một.

---

## 4. TỪ LÚC BẤM VÀO THÌ TRANG NÀY HOẠT ĐỘNG THẾ NÀO?
Rất đơn giản, hệ thống đi theo 3 bước:
1. Bạn gõ đường link `/admin/alerts` vào trình duyệt máy tính.
2. Hệ thống kiểm tra xem Bạn là Ai. Tên bạn có quyền được xem lỗi không?
3. Nếu bạn được phép, hệ thống sẽ chạy đi lục lọi trong hòm tủ máy chủ, bê ra tối đa **50 cái phiếu lỗi mới gửi gần nhất** để ném lên màn hình cho bạn đọc.

---

## 5. BẢO MẬT: AI ĐƯỢC PHÉP VÀO TRANG NÀY?
Đây là màn hình Tuyệt Mật. Chuyện nội bộ lỗi hệ thống không thể phơi bày ra ngoài.
- **Ai được xem?**: Chỉ cấp **Giám đốc (Super Admin)** và **Quản lý vận hành (Ops)**.
- **Ai bị cấm?**: Khách hàng, Thợ dọn dẹp, Nhân viên Marketing, và kể cả nhân viên Chăm sóc khách hàng (CS) cũng bị chặn không cho xem.
- **Hình phạt**: Nếu một người không có thẩm quyền cố tình truy cập, trang web sẽ tát họ ra ngoài và hiện thông báo lỗi "Từ chối truy cập" (Lỗi 403) ngay lập tức.

---

## 6. LẤY DỮ LIỆU TỪ ĐÂU RA?
- Tất cả những lỗi này hiển thị ra màn hình là do máy móc tự động báo cáo lên, chứ con người không được viết thêm vào.
- **Tại sao chỉ lấy 50 lỗi?**: Để máy tính load cực nhanh trong chớp mắt. Nếu bắt nó nhớ lại hàng vạn lỗi một lúc thì máy tính và trang web sẽ bị đơ.
- Nó cũng lắng nghe yêu cầu của Sếp để biết Sếp đang muốn xem "Lỗi Chưa Xóa" hay "Tất cả các Lỗi cũ mới".

---

## 7. QUY TẮC BẮT LỖI LÀ GÌ?
Cứ mỗi một tiếng đồng hồ, cái Radar này sẽ tự động bay đi tuần tra toàn bộ đơn hàng. Nó nhắm tới 5 kẻ vi phạm:
1. **Lịch hẹn trễ**: Khách hẹn 8h mà 9h thợ báo chưa tới nơi.
2. **Thợ mất tích (Bùng Kèo)**: Thợ nhận việc xong lặn mất tăm, gọi không nghe.
3. **Bão Hoàn Tiền**: Đột nhiên có quá nhiều người đòi hoàn tiền trong cùng một lúc.
4. **Tiền Lạc Trôi**: Khách chuyển khoản rồi mà không thấy dính vào đơn hàng nào, tiền kẹt ở giữa không trung.
5. **Chậm Trả Lương**: Công ty chưa thanh toán tiền hoa hồng cho thợ quá hạn.

---

## 8. TỐC ĐỘ TẢI TRANG
Trang này được cài đặt ở chế độ **Làm mới liên tục (Dữ liệu tươi)**. Tức là sếp cứ bấm F5 (Load lại trang) là nó phải tìm xem có lỗi nào mới đẻ ra trong vài giây vừa qua không. Nó dứt khoát không dùng dữ liệu nhớ tạm của ngày hôm qua để lừa người xem.

---

## 9. GIÁM SÁT NHÂN VIÊN VÀ HIỂN THỊ TRỐNG
- **Sổ đen chấm công**: Nếu một nhân viên tự ý ấn nút "Đã giải quyết" để lấp đi một cái lỗi. Hệ thống sẽ **Ghi sổ đen (Lưu vết lịch sử)**. Sau này Sếp rà lại sẽ biết chính xác lúc mấy giờ, cậu nhân viên A đã xóa cái vé lỗi nào để trừ tiền thưởng.
- **Khi Không Có Lỗi Tức Là An Toàn**: Nếu hệ thống khỏe mạnh 100%, trang sẽ hiện chữ thông báo thân thiện *"Mọi thứ đang bình yên, không có lỗi gì!"* lên màn hình trống để Sếp yên tâm.