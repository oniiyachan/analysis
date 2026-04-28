const fs = require('fs');
const path = require('path');

const baseDirVI = 'C:/Users/USER/Desktop/CleanHi/Analysis/08_User_Flow_Vector_Diagrams_VI';
const baseDirEN = 'C:/Users/USER/Desktop/CleanHi/Analysis/10_User_Flow_Vector_Diagrams_EN';

// ================= CUSTOMER DIAGRAMS ================= //
const customerVI = `
# BẢN ĐỒ CHUỖI GIAO DIỆN KHÁCH HÀNG (CUSTOMER & AUTH)
*Gồm: 18 trang nghiệp vụ User + 6 Trang Auth/Pháp lý (Tổng 24 Trang)*

\`\`\`mermaid
graph TD
    %% Khối Auth & Pháp Lý
    L2(["Đăng Ký (/signup)"]) --> L1(["Đăng Nhập (/login)"])
    L3(["Cấp Lại Mật Khẩu (/reset-password)"]) --> L1
    
    %% Khối Khám Phá
    L1 --> H(["Trang Chủ (/)"])
    H --> Q(["Báo Giá Mới (/quote)"])
    H --> P1(["Danh Sách Thợ (/partner)"])
    P1 --> P2(["Chi Tiết Thợ (/partner/[id])"])

    %% Khối Lõi Thực Thi
    Q --> W(["Chờ Đấu Giá (/waiting/[id])"])
    W --> C(["Khay So Sánh (/compare/[id])"])
    C --> P(["Thanh Toán Net (/payment/[id])"])
    P --> B1(["Lịch Sử Đơn Booking (/bookings)"])
    B1 --> B2(["Chi Tiết Đơn (/bookings/[id])"])
    B2 --> B3(["Chat Trực Tiếp (/bookings/[id]/chat)"])
    B2 --> R(["Đánh Giá Thợ (/review/[id])"])

    %% Khối Quản Trị Khách
    B1 --> M1(["Hồ Sơ Mypage (/mypage)"])
    M1 --> M2(["Điểm Thưởng (/mypage/points)"])
    M1 --> M3(["Hồ Sơ Yêu Thích (/mypage/favorites)"])
    M1 --> M4(["Đã Quét Định Kỳ (/mypage/recurring)"])
    M4 --> M5(["Đăng Ký Khung Định Kỳ (/mypage/recurring-new)"])
    
    %% Hỗ Trợ Rời Rạc
    H -.-> N1(["Thông Báo Cá Nhân (/notifications)"])
    H -.-> CS(["Tạo Đơn Khiếu Nại (/cs/new)"])
    H -.-> L6(["Màn Hình Gãy (/404)"])
    L4(["Luật Điều Khoản (/terms)"]) -.-> H
    L5(["Luật Quyền Sử Dụng (/privacy)"]) -.-> H
\`\`\`
`.trim();

const customerEN = `
# FULL SITEMAP: CUSTOMER JOURNEY & PUBLIC GATES
*Coverage: 18 User Module Nodes + 6 Auth/Legal Nodes (Total 24 Nodes)*

\`\`\`mermaid
graph TD
    %% Auth Block
    L2(["Register (/signup)"]) --> L1(["Sign In (/login)"])
    L3(["Recovery (/reset-password)"]) --> L1
    
    %% Discovery Block
    L1 --> H(["Home Landing (/)"])
    H --> Q(["Wizard Request (/quote)"])
    H --> P1(["Vendor Feed (/partner)"])
    P1 --> P2(["Vendor Portfolio (/partner/[id])"])

    %% Core Funnel
    Q --> W(["Live Bidding Wait (/waiting/[id])"])
    W --> C(["Compare Matrix (/compare/[id])"])
    C --> P(["NicePay Mount (/payment/[id])"])
    P --> B1(["My Bookings (/bookings)"])
    B1 --> B2(["Booking State (/bookings/[id])"])
    B2 --> B3(["Websocket Chat (/bookings/[id]/chat)"])
    B2 --> R(["Write Review (/review/[id])"])

    %% User Preferences Rooted Logically
    B1 --> M1(["Mypage Dashboard (/mypage)"])
    M1 --> M2(["Reward Points (/mypage/points)"])
    M1 --> M3(["Saved Vendors (/mypage/favorites)"])
    M1 --> M4(["Recurring Setups (/mypage/recurring)"])
    M4 --> M5(["New Recurring (/mypage/recurring-new)"])
    
    %% Orphans / Supporting Nodes
    H -.-> N1(["Notifications List (/notifications)"])
    H -.-> CS(["Create CS Ticket (/cs/new)"])
    H -.-> L6(["Fallback (/404)"])
    L4(["Terms (/terms)"]) -.-> H
    L5(["Privacy (/privacy)"]) -.-> H
\`\`\`
`.trim();

// ================= PARTNER DIAGRAMS ================= //
const partnerVI = `
# BẢN ĐỒ CHUỖI GIAO DIỆN ĐỐI TÁC (PARTNER PORTAL)
*Gồm: Thiết lập thầu, Tác chiến chạy đơn và Mở Công ty (Tổng 16 Trang)*

\`\`\`mermaid
graph TD
    D(["Bảng Radar Tổng Quan (/p)"])

    %% Chợ Bids
    D --> B1(["Chợ Đấu Giá Nóng (/p/bids)"])
    B1 --> B2(["Tạo Đơn Báo Giá Mới (/p/bids/[requestId])"])
    B1 --> B3(["Kho Mẫu Copy Paste (/p/bids/templates)"])

    %% Lịch Trình
    B2 --> S1(["Lịch Công Ty Lớn (/p/schedule)"])
    S1 --> S2(["Lịch Cá Nhân Lính (/p/schedule/[bookingId])"])
    S2 --> S3(["Chat Với Chủ Nhà (/p/schedule/[bookingId]/chat)"])
    
    %% Kế Toán & Uy Tín
    S2 --> F1(["Phơi Rút Tiền Kế Toán (/p/settlement)"])
    S2 --> C1(["Danh Sách Khách Ruột (/p/customers)"])
    S2 --> R1(["Bảng Tội Đồ Đánh Giá Dơ (/p/reviews)"])

    %% Bộ Máy Điều Hành
    D --> T1(["Danh Mục Hệ Lính (/p/team)"])
    T1 --> T2(["Tuyển Mộ Nhanh Lính Mới (/p/team/add)"])
    D --> P1(["Profile Doanh Nghiệp (/p/portfolio)"])
    P1 --> P2(["Chỉnh Sửa Profile (/p/portfolio/new)"])
    
    %% System
    D -.-> SET(["Công Tắc Cài Đặt (/p/settings)"])
    D -.-> NOT(["Radar Hệ Thống (/p/notifications)"])
\`\`\`
`.trim();

const partnerEN = `
# FULL SITEMAP: SUBCONTRACTOR MODULE OVERVIEW
*Coverage: Bidding Engine, Dispatch Ops, and Org Management (Total 16 Nodes)*

\`\`\`mermaid
graph TD
    D(["Partner Metrics (/p)"])

    %% Bidding
    D --> B1(["Live Feeds (/p/bids)"])
    B1 --> B2(["Draft New Bid (/p/bids/[requestId])"])
    B1 --> B3(["Autofill Templates (/p/bids/templates)"])

    %% Schedule
    B2 --> S1(["Master Calendar (/p/schedule)"])
    S1 --> S2(["Micro Booking Scope (/p/schedule/[bookingId])"])
    S2 --> S3(["Client Tunnels (/p/schedule/[bookingId]/chat)"])
    
    %% CRM and Fin
    S2 --> F1(["Accountant Ledgers (/p/settlement)"])
    S2 --> C1(["Retained Base (/p/customers)"])
    S2 --> R1(["Aggregated Defamations (/p/reviews)"])

    %% HR Org
    D --> T1(["Team Roster (/p/team)"])
    T1 --> T2(["Recruit Injection (/p/team/add)"])
    D --> P1(["Company Portfolio (/p/portfolio)"])
    P1 --> P2(["Portfolio Mutation (/p/portfolio/new)"])
    
    %% System
    D -.-> SET(["Global Config (/p/settings)"])
    D -.-> NOT(["Bells & Whisles (/p/notifications)"])
\`\`\`
`.trim();

// ================= ADMIN DIAGRAMS ================= //
const adminVI = `
# BẢN ĐỒ CHUỖI ĐIỀU HƯỚNG QUẢN TRỊ VIÊN CẤP CAO (ADMIN)
*Phân bố hệ thống theo Cấp độ rủi ro Data quyền hạn (Tổng 17 Trang)*

\`\`\`mermaid
graph TD
    A(["Tháp Chỉ Huy Lõi (/admin)"])

    %% Phân tích & Lắp ghépp
    A --> F1(["Radar Cảnh Quan (/admin/analytics)"])
    F1 --> D1(["Gắp Lắp Ghép Kanban (/admin/matching)"])
    D1 --> F2(["Biên Lai NicePay Gầm (/admin/transactions)"])
    F2 --> F3(["Lệnh Chuyển Ngân Hàng (/admin/settlement)"])

    %% CSKH & Tố Cáo
    A --> D2(["Đồn CSKH Cự Cãi (/admin/cs)"])
    D2 --> D3(["Tòa Án Chi Tiết (/admin/cs/[id])"])
    D3 --> R3(["Sọt Rác Tố Cáo (/admin/reports)"])
    R3 --> R4(["Búa Tòa Án Cấp 5 (/admin/reports/[id])"])
    
    %% An Ninh & Tù Tội
    A --> R2(["Camera Lịch Sử Thao Tác (/admin/audit)"])
    R2 --> R1(["Chuông An Toàn Còi Báo (/admin/alerts)"])
    R2 --> R5(["Phân Buồng Đánh Giá Giam (/admin/reviews)"])

    %% Global Entity
    A --> M3(["Sổ Tử Danh Bạ Người Dùng (/admin/members)"])
    A --> M2(["Máy In Mã Giảm Giá (/admin/marketing)"])
    A -.-> M1(["Loa Phát Thanh Diện Rộng (/admin/broadcast)"])
    A -.-> S1(["Cầu Dao Tắt Bật Hệ Thống (/admin/settings)"])
    A -.-> N1(["Chuông Thông Báo (/admin/notifications)"])
\`\`\`
`.trim();

const adminEN = `
# FULL SITEMAP: ADMIN SUPREME CONTROLS
*Coverage: Aggregation, Legal, Governance logic grids (Total 17 Nodes)*

\`\`\`mermaid
graph TD
    A(["Root Core Control (/admin)"])

    %% Dispatch & Fin
    A --> F1(["Visual KPI Radars (/admin/analytics)"])
    F1 --> D1(["Master Kanban Drag-Drop (/admin/matching)"])
    D1 --> F2(["NicePay Webhooks (/admin/transactions)"])
    F2 --> F3(["Wire Transfer Locks (/admin/settlement)"])

    %% CS & Reports
    A --> D2(["CS Dispute Floor (/admin/cs)"])
    D2 --> D3(["Gavel & Refunds (/admin/cs/[id])"])
    D3 --> R3(["Report Pipelines (/admin/reports)"])
    R3 --> R4(["Judgment Execution (/admin/reports/[id])"])
    
    %% Overrides & Audits
    A --> R2(["Hard-coded Trace Audits (/admin/audit)"])
    R2 --> R1(["Anomaly AI Sensors (/admin/alerts)"])
    R2 --> R5(["Shadow-Ban Reviews (/admin/reviews)"])

    %% Global Sets
    A --> M3(["God-Mode Auth Table (/admin/members)"])
    A --> M2(["Coupon Overrides (/admin/marketing)"])
    A -.-> M1(["FCM Push Loudspeaker (/admin/broadcast)"])
    A -.-> S1(["Global Maintenance Switches (/admin/settings)"])
    A -.-> N1(["Root Bell Inbox (/admin/notifications)"])
\`\`\`
`.trim();

// Write VI Files
if (fs.existsSync(baseDirVI)) {
    fs.writeFileSync(path.join(baseDirVI, '01_Khach_Hang_Customer.md'), customerVI);
    fs.writeFileSync(path.join(baseDirVI, '02_Doi_Tac_Partner.md'), partnerVI);
    fs.writeFileSync(path.join(baseDirVI, '03_Quan_Tri_Vien_Admin.md'), adminVI);
}

// Write EN Files
if (fs.existsSync(baseDirEN)) {
    fs.writeFileSync(path.join(baseDirEN, '01_Customer_Flow.md'), customerEN);
    fs.writeFileSync(path.join(baseDirEN, '02_Partner_Flow.md'), partnerEN);
    fs.writeFileSync(path.join(baseDirEN, '03_Admin_Flow.md'), adminEN);
}

console.log("Thành công vẽ lại lưới theo chiều dọc!");
