# TÀI LIỆU TRANG: TRANG CHỦ CỦA CÔNG TY (PARTNER DASHBOARD) (P)

> **Lời ngỏ**: Tài liệu dịch thuật bình dân, nhắm tới việc giải thích mạch máu kinh doanh mộc mạc nhất cho Sếp và Đội Vận Hành.

---

## 1. THÔNG TIN CHUNG 
- **Tên màn hình**: Trang Chủ Của Công Ty (Partner Dashboard)
- **Thư mục Code**: `src/app/(partner)/p/page.tsx`

---

## 2. TRANG NÀY SINH RA ĐỂ LÀM GÌ?
Hãy hình dung màn hình này chính là **Bảng Điều Khiển Buồng Lái. Bước chân vào là Sếp công ty dọn dẹp thấy ngay hôm nay có mấy nhà phải lau, kiếm được mấy đồng bạc lẻ.**

- Nó là lưỡi đao giải quyết đứt điểm một luồng hành vi của người dùng trực tiếp sinh ra lợi nhuận hoặc tạo độ bám dính dịch vụ.

---

## 3. LUẬT RÀNG BUỘC KÉP CỦA HỆ THỐNG
- **Dữ liệu**: Biểu đồ được nhồi từ bảng `settlement` và `cleaning_requests` ép kín cho riêng `partner_id`.
- Áp lực được luân chuyển bởi máy chủ Edge Network, không giật lag ngay cả ở băng thông yếu.