# KIẾN TRÚC HIỆN THỊ MÁY CHỦ (FRONTEND NEXT.JS APP ROUTER)

> **Mô tả**: Tôn chỉ Layout, Component, Caching và cách Giao Diện Máy khách (Browser Frontend) tương tác với logic của Dự Án CleanHi. Áp dụng chuẩn Next.js phiên bản V14/V16 App Router Directory.

---

## 1. THE ROOT LAYOUT (CÁC KHUNG XƯƠNG LAN TỎA)
- Dự án bẻ nhánh `src/app/` ra làm 4 Vùng Đất Hoàn Nhau Tách Biệt bằng kỹ thuật Dấu Ngoặc Tròn `(admin)`, `(user)`, `(partner)`.
- Kỹ thuật dán nhãn Ngoặc Tròn gọi là **Xếp Nhóm (Route Groups)**: Nó giúp giao diện Không Bị Dính Chữ Thừa Vào URL Web (VD: Link là `cleanhi.kr/quote` chứ ko bị hiện thành `cleanhi.kr/(user)/quote`), CHƯA KỂ nó giúp cài cắm 1 giao diện nền riêng biệt cho từng khối.
  - Vỏ bọc `(admin)/layout.tsx`: Kẹp Menu trái điều hướng của Nội bộ.
  - Vỏ bọc `(user)/layout.tsx`: Gắn Navigation Thanh ngang thanh lịch và Logo thương hiệu.
  - File Đệm lỗi chung: Toàn bộ được kẹp biến Mạng Cứng `<ErrorBoundary>` tại Root Layout phòng thủ hỏa hoạn sập trắng Trang Web.

## 2. QUY TẮC HIỂN THỊ TRỌNG TÂM (RENDERING PARADIGMS)
- **Tôn Chỉ Phục Vụ 1**: Càng Ít JS Gửi Cho Máy Khách Càng Tốt. Mặc định 100% Page tự Render dạng RSC (Server Context Module) trên RAM của máy chủ Vercel - nhả về 1 đoạn HTML dốt nát phẳng lì. Nhờ thế Google SEO chấm điểm load nhanh kinh hồn, và Hacker không chọc được biến Variables trên Chrome Console JS (Vì JS đã bị giữ ở Server).
- **Trường Hợp Cắt Khúc "use client"**: 
  - Khi nào xuất hiện Input gõ chữ, khi nào có nút `<button onClick={...}>`. Cắt nguyên cái Ô Vuông HTML đó thả vào File Component tách rời có lệnh `"use client"`.

## 3. THAY THẾ API ĐI LÙI (THE SERVER ACTIONS OVER API ROUTES)
Đây là cuộc Cách mạng mới nhất so với các hệ thống PHP hay React đời đầu. Không dùng Folder API như cách cũ (`fetch("http://...")`).
- **Data Mutation**: Việc Bắn Form đi (Signup, Upload, Submit Payment, Add Bid) được gọi trực tiếp bằng `await serverAction()`. Hàm chạy ẩn ở Server, thao tác DB rồi tự kết thúc. Loại bỏ trọn vẹn sự trung gian khựng Form Loading của các thư viện cũ (như Redux hay React Query).

## 4. CHUẨN THIẾT KẾ CẢM QUAN (STYLE GUIDE TAILWIND)
- Bỏ rơi tư duy viết Class CSS dài như Sớ. Viết Code bằng Tailwind Utility Engine.
- Tự định nghĩa thẻ dải `border-surface-container`, `text-primary`, `bg-primary-container`. Không bao giờ đánh mầu xanh đỏ thủ công (`red-500`, `blue-600`) trừ phi làm Cảnh báo Trừ Điểm. Tất cả ăn chung vào Token Theme từ Design System cấp độ công ty. Bật chế độ Tối (Dark Mode) không bị loạn sắc.
