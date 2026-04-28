# TÀI LIỆU TRANG: Giao Diện P TEAM ADD

> **Lời ngỏ**: Tài liệu kỹ thuật cấp Doanh Nghiệp (Bình Dân Hóa).

---

## 1. THÔNG TIN CHUNG
- **Vị trí của file code**: `src/app/(partner)/p/team-add/page.tsx`

---

## 2. TRANG NÀY SINH RA ĐỂ LÀM GÌ?
Đây là màn hình Mở rộng/Chức năng thứ yếu hỗ trợ mảnh ghép tổng quan của cổng thông tin phân quyền `partner`.
Nó xử lý các yêu cầu thay đổi thông tin (Sửa hồ sơ, Quản lý tài khoản) hoặc các mảnh thông báo chuông nhỏ nhặt.

---

## 3. BẢO MẬT & DỮ LIỆU
- Trang phụ thuộc dữ liệu Cột sống (Root Layout Context).
- Dữ liệu bị cùm xích bởi luật RLS (Chỉ chính tôi mới nhìn thấy rác của nhà tôi).