# TÀI LIỆU TRANG: CUỐN LỊCH CHẠY BẦU SÔ (P-SCHEDULE)

> **Lời ngỏ**: Tài liệu dịch thuật bình dân, nhắm tới việc giải thích mạch máu kinh doanh mộc mạc nhất cho Sếp và Đội Vận Hành.

---

## 1. THÔNG TIN CHUNG 
- **Tên màn hình**: Cuốn Lịch Chạy Bầu Sô
- **Thư mục Code**: `src/app/(partner)/p/schedule/page.tsx`

---

## 2. TRANG NÀY SINH RA ĐỂ LÀM GÌ?
Hãy hình dung màn hình này chính là **Cuốn sổ Lư hương. Hiện rõ chành bành mùng 1 phải lau nhà anh A, mùng 2 lau nhà chị B. Có cả lịch nhân viên nào phải đi làm.**

- Nó là lưỡi đao giải quyết đứt điểm một luồng hành vi của người dùng trực tiếp sinh ra lợi nhuận hoặc tạo độ bám dính dịch vụ.

---

## 3. LUẬT RÀNG BUỘC KÉP CỦA HỆ THỐNG
- **Dữ liệu**: Đọc dữ liệu `cleaning_requests` trạng thái `in_progress` hoặc `assigned`.
- Áp lực được luân chuyển bởi máy chủ Edge Network, không giật lag ngay cả ở băng thông yếu.