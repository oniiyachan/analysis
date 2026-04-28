# PHÂN TÍCH REALTIME: KHÁCH NGỒI HÓNG GIÁ (waiting-client.tsx)

## 1. CHỨC NĂNG NÀY ĐỂ LÀM GÌ?
Đây là màn ảo thuật "Wow Effect" để làm Khách Hàng sướng nhất của dự án. 
Khi khách ấn gửi cái Yêu cầu dọn toilet... Hệ thống nhảy sang màn hình Đồng hồ Đếm ngược 24 Tiếng. Và ngay trong lúc khách đang cầm điện thoại... "*Ting, có Công ty A nhảy vào nhận giá 500k*. *Ting, có người B tranh kèo giành giá 400k*". Thẻ báo giá từ từ xếp lên màn hình siêu hấp dẫn.

## 2. VIỆC NÀO ĐỨNG SAU CHIÊU TRÒ NÀY?
Trái tim của tính năng nằm ở đoạn lệnh `waiting-client.tsx` (Đây là một Component chứ không còn là một Hook như 3 chức năng kia).

**Nó gồng gánh cùng lúc 2 thứ:**
1. **Đồng Hồ Máy Tính (Timer)**: Tự trừ đi một giây `setInterval(tick, 1000)` đếm ngược số giờ còn lại. Nếu chạm 0 mà không có thợ nào đấu thầu, nó hiện hình mặt buồn thất vọng xin lỗi khách làm lại đơn.
2. **Nghe ngóng tiếng rớt đồng xu (Realtime INSERT Quotes)**: Cứ có thợ nào chốt giá (`quotes INSERT`). Màn hình sẽ chớp lóe chèn thêm đúng cái phiếu giá rẻ ấy lên đầu bảng.

## 3. CƠ CHẾ GHÉP MẢNH (JOIN FETCH KHÉO LÉO)
Một rào cản cực lớn cho hệ cơ sở dữ liệu đó là: Khi cái ống Realtime vứt về một thẻ báo giá mới, Màn hình... không hề biết Thợ vừa báo giá đó "Tên là gì, Được mấy sao" (Vì tên Thợ nằm ở bảng Company Partner, không nằm chung với bảng Tiền).

**Giải pháp xuất sắc của Lập trình viên:**
Thay vì bắt máy chủ Load cả lại cái web (router.refresh). Thì Lập trình viên lập trình rằng: "Ngay khi có phiếu tiền rơi xuống, dừng hình chờ 0.5s... Cho phép màn hình lặng lẽ gửi thám tử xuống Database Bảng Company, hỏi xem thằng thợ ở vé đó tên là gì, sao nó cao không, xong bê cái ảnh đại diện của nó đính vào cái thẻ Tiền, rồi mới nhét ra màn hình cho Khách Hàng coi!".

*(Việc này được che giấu xử lý hoàn hảo trong hàm ẩn `supabase.from("quotes").select(partners(business_name, rating...))` để đảm bảo dù có là Vị khách ẩn danh chưa đăng nhập vẫn xoi được thông tin nhà thầu).*
