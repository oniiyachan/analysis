# BẢN ĐỒ CHUỖI GIAO DIỆN KHÁCH HÀNG (CUSTOMER & AUTH)
*Gồm: 18 trang nghiệp vụ User + 6 Trang Auth/Pháp lý (Tổng 24 Trang)*

```mermaid
graph TD
    %% Khối Khám Phá
    subgraph Discovery [Khám Phá & Yêu Cầu]
        H(["Trang Chủ (/)"]) --> Q(["Báo Giá Mới (/quote)"])
        H --> P1(["Danh Sách Thợ (/partner)"])
        P1 --> P2(["Chi Tiết Thợ (/partner/[id])"])
    end

    %% Khối Lõi Thực Thi
    subgraph Core_Funnel [Luồng Mua Hàng Cốt Lõi]
        Q -->|Gửi Đơn| W(["Chờ Đấu Giá (/waiting/[id])"])
        W -->|Websocket Alert| C(["Khay So Sánh (/compare/[id])"])
        C -->|Chọn Thợ| P(["Thanh Toán Net (/payment/[id])"])
        P -->|Hoàn Tất| B1(["Lịch Sử Đơn Booking (/bookings)"])
        B1 --> B2(["Chi Tiết Đơn (/bookings/[id])"])
        B2 --> B3(["Chat Trực Tiếp (/bookings/[id]/chat)"])
        B2 --> R(["Đánh Giá Thợ (/review/[id])"])
    end

    %% Khối Quản Trị Khách
    subgraph My_Page [Ngăn Kéo Cá Nhân]
        M1(["Hồ Sơ Mypage (/mypage)"])
        M2(["Điểm Thưởng (/mypage/points)"])
        M3(["Hồ Sơ Yêu Thích (/mypage/favorites)"])
        M4(["Đã Quét Định Kỳ (/mypage/recurring)"])
        M5(["Đăng Ký Khung Định Kỳ (/mypage/recurring-new)"])
        N1(["Thông Báo Cá Nhân (/notifications)"])
        CS(["Tạo Đơn Khiếu Nại (/cs/new)"])
    end

    %% Khối Auth & Pháp Lý
    subgraph Auth_Legal [Bảo Mật Xác Thực & Hành Lang]
        L1(["Đăng Nhập (/login)"])
        L2(["Đăng Ký (/signup)"])
        L3(["Cấp Lại Mật Khẩu (/reset-password)"])
        L4(["Luật Điều Khoản (/terms)"])
        L5(["Luật Quyền Sử Dụng (/privacy)"])
        L6(["Màn Hình Gãy (/404)"])
    end

    L1 --> H
    H --> M1
    M1 -.-> M2 & M3 & M4
    M4 -.-> M5
```