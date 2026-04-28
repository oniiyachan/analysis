# Cơ Chế Phân Quyền Người Dùng (User Roles)

Hệ thống CleanHi ứng dụng mô hình Role-Based Access Control (RBAC) nhiều tầng, bảo vệ chặt chẽ thông qua Supabase Policies. Người dùng được chia làm 3 nhóm thực thể chính:

## 1. Khách Hàng (Customer)
- **Guest (Khách vãng lai)**: Rất hay - Guest có thể hoàn thành form tải ảnh, gửi yêu cầu dọn dẹp mà KHÔNG CẦN tạo tài khoản ngay lập tức. Hệ thống cấp `guest_session_token` ở Cookie để bảo mật. Khi có thợ nộp báo giá đầu tiên, hệ thống gửi email kích thích Guest tạo tài khoản để "Nhận báo giá".
- **Customer (Thành viên chính thức)**: Sở hữu các Request (Yêu cầu). Chỉ họ mới được xem danh sách báo giá ứng với nhà của họ, được chọn thợ, thanh toán đơn, và để lại Đánh giá (Review).

## 2. Đối Tác Dọn Dẹp (Partner)
Được thiết kế để hỗ trợ mô hình "Công ty dọn dẹp" chứ không chỉ phục vụ các thợ nhỏ lẻ 1 người. Một tài khoản công ty có thể chứa cấp dưới. Phân thành 3 vai trò (3-Role Organization):
- **Owner (Chủ doanh nghiệp/Tổng thầu)**: Có hệ thống Dashboard riêng, được xem thống kê doanh thu, tỷ lệ chốt đơn, lợi nhuận, thêm nhân viên vào team đội.
- **Lead (Đội trưởng)**: Đại diện cho đội nhóm thi công ở một khu vực (ví dụ Quận 1). Có quyền nhìn thấy yêu cầu mới nhảy lên ở Quận 1, nộp báo giá thay công ty.
- **Worker (Thợ/Nhân viên)**: Bị hạn chế quyền. Chỉ đăng nhập để nhìn thấy hôm nay mình có ca dọn ở đâu, giờ nào, click hoàn thành công việc. Worker tuyệt đối không được xem doanh thu của Chủ.

## 3. Ban Quản Trị Hệ Thống (Admin)
Phân tách đặc quyền dựa vào `admin_role` tại Table `profiles`:
- **Super**: Quyền quản trị tối cao, can thiệp xử lý hủy đơn khẩn cấp, cấp lại mã thanh toán bị treo.
- **Ops (Operations)**: Vận hành. Quản lý việc duyệt giấy phép kinh doanh của các công ty dọn dẹp xin lên sàn (Approve/Reject partner_applications). Xem bảng Audit Logs (nhật ký chọc phá app của nhân viên).
- **CS / QA (Chăm sóc khách hàng)**: Xử lý Ticket phàn nàn, mâu thuẫn giữa Phía Thợ Dọn Dẹp và Khách Hàng. Có quyền bấm hoàn tiền một phần.
- **Marketing**: Quản lý chiến dịch, phát hành Coupon nội bộ.
