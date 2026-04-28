# BẢN ĐỒ CHUỖI ĐIỀU HƯỚNG QUẢN TRỊ VIÊN CẤP CAO (ADMIN)
*Phân bố hệ thống theo Cấp độ rủi ro Data quyền hạn (Tổng 17 Trang)*

```mermaid
graph TD
    A(["Tháp Chỉ Huy Lõi (/admin)"])

    subgraph Core_Dispatch [Lưới Hỗ Trợ Khẩn Cấp]
        D1(["Gắp Lắp Ghép Kanban (/admin/matching)"])
        D2(["Đồn CSKH Cự Cãi (/admin/cs)"])
        D3(["Tòa Án Chi Tiết (/admin/cs/[id])"])
    end

    subgraph Analytic_Finance [Phân Tích Dòng Tiền]
        F1(["Radar Cảnh Quan (/admin/analytics)"])
        F2(["Biên Lai NicePay Gầm (/admin/transactions)"])
        F3(["Lệnh Chuyển Ngân Hàng (/admin/settlement)"])
    end

    subgraph Moderation_Risk [Đội Cấm Vệ & An Ninh Mạng]
        R1(["Chuông An Toàn Còi Báo (/admin/alerts)"])
        R2(["Camera Lịch Sử Thao Tác (/admin/audit)"])
        R3(["Sọt Rác Tố Cáo (/admin/reports)"])
        R4(["Búa Tòa Án Cấp 5 (/admin/reports/[id])"])
        R5(["Phân Buồng Đánh Giá Giam (/admin/reviews)"])
    end

    subgraph Global_Entity [Quản Trị Các Bộ Cấu Thành]
        M1(["Loa Phát Thanh Diện Rộng (/admin/broadcast)"])
        M2(["Máy In Mã Giảm Giá (/admin/marketing)"])
        M3(["Sổ Tử Danh Bạ Người Dùng (/admin/members)"])
        S1(["Cầu Dao Điện Lưới Tắt Bật Hệ Thống (/admin/settings)"])
        N1(["Chuông Thông Báo Góc Trái (/admin/notifications)"])
    end

    A --> F1 & D1 & R1 & M1
    D2 --> D3
    R3 --> R4
```