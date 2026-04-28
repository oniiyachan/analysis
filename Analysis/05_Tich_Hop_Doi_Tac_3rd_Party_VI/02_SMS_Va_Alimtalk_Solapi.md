# TÍCH HỢP HỆ THỐNG TIN NHẮN TỰ ĐỘNG (SOLAPI / ALIMTALK KAKAO)

> **Mô Tả**: Cổng đẩy tin nhắn trực tiếp vào Zalo/Tin nhắn SMS báo điện thoại của Khách Hàn (Sử dụng siêu cổng của Alimtalk Kakao). Đảm bảo khách và thợ 100% không bị sót đơn.

---

## 1. KHÁI NIỆM ROOT
Solapi là Vendor cung cấp kho chứa Template cắm đầu nối với ứng dụng Kakao Talk.
Tin nhắn muốn gửi được rẻ tiền phải **"Trúng Mẫu Template Được Duyệt"**.
Trong CleanHi chia làm 5 Mẫu Temolate (Template IDs) cố định:
1. `TPL_MATCHING`: Báo khách đã có thợ ập vào giá hời.
2. `TPL_PAYMENT_SUCCESS`: Cảm ơn Bố đường, Tiền đã kéo về kho (Biên lai số XX).
3. `TPL_WORK_DONE`: Nghiệm thu. Thợ xong việc, sờ mó màn hình chấm sao đi!
4. `TPL_REFUND`: Chuyển hoàn vì lỗi sự cố.
5. `TPL_NOTICE`: Thư khẩn hệ thống cho 1 bên.

## 2. LUỒNG TÁC NGHIỆP TẠI MÁY CHỦ (SERVER ACTION DISPATCHER)
Trong bất kì file nào làm đổi State Đơn (Ví dụ Thanh Toán Xong, Thợ ấn Hoàn Thành trong phần mềm). 
Dòng lệnh thứ 2 sau khi Save Database bao giờ cũng đi kèm 1 lệnh móc ngầm: `await PushSolapiAlert("TPL_WORK_DONE", User_Phone_Number, JsonProps)`. 

## 3. CÁCH LẬP TRÌNH VIÊN CỨU LỖI SOLAPI SẬP MẠNG
Gửi tin nhắn dễ rớt nếu sóng mạng Hàn cúp hoặc số điện thoại Khách Đăng Ký tào lao (Số ảo).
- Lập trình bắt buộc phải kẹp toàn bộ Hook gọi Cổng Mạng Nhắn Tin nội bộ trong gọng kìm `try { ... } catch (error) { ... }`. 
- Nếu Solapi trả về HTTP Code 400 (Số Phá Rác). Nodejs lập tức ghi lại biên bản Error Log rồi Ngắt Hàm báo "Dừng nhắn tin, Nhưng vẫn cho Đơn Hàng này Đi Tiếp Bình Thường" -> (Chứ không cản Khách nạp tiền chỉ vì bị sai mỗi số điện thoại gửi SMS).
