# BẢN ĐỒ CHUỖI GIAO DIỆN ĐỐI TÁC (PARTNER PORTAL)
*Gồm: Thiết lập thầu, Tác chiến chạy đơn và Mở Công ty (Tổng 16 Trang)*

```mermaid
graph TD
    D(["Bảng Radar Thông Số (/p)"])

    subgraph Bidding_Zone [Chợ Đấu Thầu]
        B1(["Chợ Đấu Giá Nóng (/p/bids)"])
        B2(["Tạo Đơn Báo Giá Mới (/p/bids/[requestId])"])
        B3(["Kho Mẫu Copy Paste (/p/bids/templates)"])
    end

    subgraph Operations [Tác Chiến & Lịch Thời Gian]
        S1(["Lịch Công Ty Lớn (/p/schedule)"])
        S2(["Lịch Cá Nhân Lính (/p/schedule/[bookingId])"])
        S3(["Chat Với Chủ Nhà (/p/schedule/[bookingId]/chat)"])
    end

    subgraph Company_Mgmt [Bộ Máy Điều Hành]
        T1(["Danh Mục Hệ Lính (/p/team)"])
        T2(["Tuyển Mộ Nhanh Lính Mới (/p/team/add)"])
        P1(["Profile Doanh Nghiệp (/p/portfolio)"])
        P2(["Chỉnh Sửa Profile (/p/portfolio/new)"])
        SET(["Công Tắc Cài Đặt (/p/settings)"])
        NOT(["Radar Hệ Thống (/p/notifications)"])
    end

    subgraph Accounting_CRM [Ví Kế Toán & Uy Tín]
        F1(["Phơi Rút Tiền Kế Toán (/p/settlement)"])
        C1(["Danh Sách Khách Ruột (/p/customers)"])
        R1(["Bảng Tội Đồ Đánh Giá Dơ (/p/reviews)"])
    end

    D --> B1 & S1 & F1 & T1 & P1
    B1 --> B2 & B3
    S1 --> S2 --> S3
    T1 -.-> T2
    P1 -.-> P2
```