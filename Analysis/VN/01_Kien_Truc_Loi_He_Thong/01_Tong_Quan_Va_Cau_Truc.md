# Tổng Quan Dự Án CleanHi

CleanHi là nền tảng O2O (Online to Offline) dọn dẹp theo phân khúc đấu giá ngược (Reverse Auction). Khách đưa diện tích, mô tả hoặc ảnh tình trạng căn hộ, các đội/nhà dịch vụ dọn dẹp sẽ vào báo giá cạnh tranh. App sẽ tích hợp AI để ước lượng khoảng giá dự toán cho khách. Nền tảng tự động trừ hoa hồng trên giao dịch.

## 1. Công Nghệ Xây Dựng (Tech Stack)
Dự án được xây dựng rất hiện đại, sử dụng hệ sinh thái Vercel và Supabase làm mũi nhọn:
- **Giao diện & Logic (Frontend)**: Next.js 16 (App Router), Tailwind CSS v4, Components từ shadcn/ui. Quản lý trạng thái form bằng React Hook Form + Zod.
- **Xử lý dữ liệu (Backend & Database)**: Supabase (PostgreSQL, Auth, RLS Security, Realtime cho tính năng chat/đồng bộ giá, Storage lưu ảnh). 
- **Tích hợp bên thứ 3**: Thanh toán bằng NicePayments 2.0, Gửi email bằng Resend, Gửi SMS/Zalo bằng Solapi. Automation Test bằng Playwright.

## 2. Cấu Trúc Thư Mục Chức Năng Cốt Lõi
Mã nguồn được phân rã theo Folder chuyên trách độc lập:

- `src/` (Mã nguồn dự án React/Next.js)
  - `src/app/(user)/` : Chứa các màn hình và tính năng dành riêng cho Khách hàng (trang chủ, luồng đặt đơn 8 bước, bảng so sánh báo giá, thanh toán).
  - `src/app/(partner)/` : Chứa các màn hình PWA (cho mobile) dành riêng cho Đối tác dọn dẹp (xem đơn quanh khu vực, nộp báo giá, xem lịch, quản lý nhân viên).
  - `src/app/(admin)/` : Dashboard nội bộ Quản trị hệ thống (KPI, quản lý tranh chấp, duyệt partner).
  - `src/lib/integrations/` : Thư mục đóng gói các kết nối ra bên ngoài: `nicepay/` (code thanh toán), `supabase/` (kết nối CSDL), `solapi/` (code gửi tin nhắn).
  - `src/schemas/` : Định nghĩa `Zod` bảo vệ việc nhập liệu từ người dùng. Mọi hành vi tạo form đều đi qua Folder này.
- `supabase/migrations/` : Nơi quyết định chất lượng Backend. Chứa 37 file mã SQL kiến trúc Database, triggers, thủ tục lưu trữ tự động. Đặc biệt chứa các quy tắc bảo mât Row Level Security.
- `docs/` : Kho tàng lưu trữ tài liệu 기획 (Mô tả nghiệp vụ), nhật ký quyết định hệ thống (ADR) và Runbooks (Quy trình vận hành khi có lỗi).
- `tests/e2e/` : Các luồng chạy kiểm thử người máy tự động Playwright (ví dụ tự động điền form, tự động vào vai thợ nộp báo giá).
