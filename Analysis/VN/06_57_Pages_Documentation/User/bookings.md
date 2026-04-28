# TÀI LIỆU TRANG: KÉT SẮT LƯU BIÊN LAI (BOOKINGS)

> **Lời ngỏ**: Tài liệu dịch thuật bình dân, nhắm tới việc giải thích mạch máu kinh doanh mộc mạc nhất cho Sếp và Đội Vận Hành.

---

## 1. THÔNG TIN CHUNG 
- **Tên màn hình**: Két Sắt Lưu Biên Lai
- **Thư mục Code**: `src/app/(user)/bookings/page.tsx`

---

## 2. TRANG NÀY SINH RA ĐỂ LÀM GÌ?
Hãy hình dung màn hình này chính là **Hòm gỗ đựng kỉ niệm. Hóa đơn nhà nào dọn xong rồi, nhà nào sắp dọn... Lịch sử nằm toàn bộ ở mảnh đất này.**

- Nó là lưỡi đao giải quyết đứt điểm một luồng hành vi của người dùng trực tiếp sinh ra lợi nhuận hoặc tạo độ bám dính dịch vụ.

---

## 3. LUẬT RÀNG BUỘC KÉP CỦA HỆ THỐNG
- **Dữ liệu**: RLS Filter chặn cái nhìn tọc mạch tuyệt đối (user_id = me).
- Áp lực được luân chuyển bởi máy chủ Edge Network, không giật lag ngay cả ở băng thông yếu.