# 📁 CLEANHI — ANALYSIS DOCUMENTATION HUB
### Bộ Tài Liệu Phân Tích Kỹ Thuật Dự Án (Enterprise Documentation Suite)
*Cập nhật lần cuối: 28/04/2026 · Song ngữ Việt — Anh (Bilingual VI/EN)*

---

## 🏗️ CẤU TRÚC THƯ MỤC (DIRECTORY MAP)

```
Analysis/
│
├── 📜 README.md                              ← BẠN ĐANG Ở ĐÂY
├── 📜 00_ENTERPRISE_DOCUMENT_STANDARDS_VI.md  ← Chuẩn mực viết tài liệu (Tiếng Việt)
├── 📜 00_ENTERPRISE_DOCUMENT_STANDARDS_EN.md  ← Document standards (English)
│
├── 📂 01_Kien_Truc_Loi_He_Thong_VI/          ← Kiến trúc lõi hệ thống (6 files)
├── 📂 01_Core_Architecture_EN/                ← Core architecture (6 files)
│
├── 📂 02_Luong_Nghiep_Vu_Kinh_Doanh_VI/      ← Luồng nghiệp vụ kinh doanh (3 files)
├── 📂 02_Business_Workflows_EN/               ← Business workflows (3 files)
│
├── 📂 03_He_Thong_Thoi_Gian_Thuc_VI/         ← Hệ thống thời gian thực (5 files)
├── 📂 03_Realtime_Systems_EN/                 ← Realtime systems (5 files)
│
├── 📂 04_Kien_Truc_Database_Supabase_VI/      ← Kiến trúc Database (2 files)
├── 📂 04_Database_Architecture_EN/             ← Database architecture (2 files)
│
├── 📂 05_Tich_Hop_Doi_Tac_3rd_Party_VI/       ← Tích hợp bên thứ 3 (4 files)
├── 📂 05_3rd_Party_Integrations_EN/            ← 3rd party integrations (4 files)
│
├── 📂 06_57_Pages_Documentation_VI/            ← Tài liệu 57 trang giao diện (57 files)
├── 📂 07_57_Pages_Documentation_EN/            ← 57 pages documentation (57 files)
│
├── 📂 08_User_Flow_Vector_Diagrams_VI/         ← Sơ đồ Mermaid 3 luồng User (3 files)
├── 📂 10_User_Flow_Vector_Diagrams_EN/         ← User flow Mermaid diagrams (3 files)
│
└── 📂 12_Plan_2_month/                         ← Lộ trình phát triển 60 Ngày (5 files)
```

---

## 📖 HƯỚNG DẪN ĐỌC (HOW TO READ)

### Quy tắc đánh số
- Mỗi chủ đề chiếm **1 số thứ tự**, mở nhánh thành **2 folder song ngữ** (VI + EN)
- Folder `06` và `07` là cặp song ngữ của bộ tài liệu 57 trang giao diện
- Folder `08` và `10` là cặp song ngữ sơ đồ luồng User (Vector Mermaid)
- Folder `12` là kế hoạch phát triển 60 ngày không có bản EN

### Cách mở sơ đồ Mermaid
- Trong **VS Code**: Mở file `.md` → nhấn `Ctrl + Shift + V` để xem bản vẽ Vector
- Trên **GitHub**: Mermaid tự động render khi xem file `.md` trên web

---

## 📊 THỐNG KÊ TỔNG QUAN

| Nhóm | Số Folder | Số File | Ngôn Ngữ |
|------|----------|---------|----------|
| Kiến trúc lõi (01) | 2 | 12 | VI + EN |
| Luồng nghiệp vụ (02) | 2 | 6 | VI + EN |
| Hệ thống Realtime (03) | 2 | 10 | VI + EN |
| Database & Migration (04) | 2 | 4 | VI + EN |
| Tích hợp bên thứ 3 (05) | 2 | 8 | VI + EN |
| Tài liệu 57 trang (06–07) | 2 | **114** | VI + EN |
| Sơ đồ luồng User (08, 10) | 2 | 6 | VI + EN |
| Kế hoạch 60 ngày (12) | 1 | 5 | VI |
| Chuẩn mực tài liệu (00) | — | 2 | VI + EN |
| **TỔNG CỘNG** | **15** | **167** | — |

---

## 🎯 CHI TIẾT NỘI DUNG TỪNG NHÓM

### 01 — Kiến Trúc Lõi Hệ Thống / Core Architecture
| File | Nội dung |
|------|---------|
| `01_Tong_Quan` / `01_Overview` | Tech stack (Next.js 16, Supabase, Tailwind), cấu trúc thư mục |
| `02_Phan_Quyen` / `02_Roles` | RBAC: Customer → Guest/Member, Partner → Owner/Lead/Worker, Admin → Super/Ops/CS/Marketing |
| `03_Danh_Gia` / `03_Estimation` | Tiến độ backend 90%, ước lượng onboarding 10–15 ngày |
| `04_So_Do` / `04_Pages` | Sơ đồ Mermaid 3 cổng (Customer/Partner/Admin) + bảng URL tuyệt đối |
| `05_CronJobs` | 5 nhiệm vụ quét tự động: No-show, Orphan payment, Zero-bid, Refund rate, Settlement |
| `06_Frontend` | App Router paradigm, RSC rendering, Server Actions, Tailwind Design System |

### 02 — Luồng Nghiệp Vụ / Business Workflows
| File | Nội dung |
|------|---------|
| `01_Yeu_Cau` / `01_Request` | Wizard 8 bước, AI estimate, Half-batch bidding 5+5, Rate limiting |
| `02_Booking` / `02_Booking` | Chốt giá → NicePay → Idempotency → Thi công → Settlement D+1 |
| `03_Admin` / `03_Admin` | CS tickets, Review 4 tiêu chí, Audit logs, Anomaly detection |

### 03 — Hệ Thống Thời Gian Thực / Realtime Systems
| File | Nội dung |
|------|---------|
| `01_Tong_Quan` / `01_Overview` | 2 chiến lược: State Append (Chat) vs Router Refresh (Admin). Security gates |
| `02_Chat` / `02_Live_Chat` | Hook `useChatRealtime`, channel filter, callback ref pattern |
| `03_Thong_Bao` / `03_Notifications` | `useNotificationsRealtime`, router.refresh() cho unread count |
| `04_Kanban` / `04_Admin_Kanban` | `useMatchingRealtime`, lắng nghe 2 bảng (requests + quotes) |
| `05_Cho_Bao_Gia` / `05_Waiting` | `waiting-client.tsx`, countdown timer + live bid cards + JOIN fetch |

### 04 — Kiến Trúc Database / Database Architecture
| File | Nội dung |
|------|---------|
| `01_ERD_Loi` / `01_Core_ERD` | 23 bảng, quan hệ FK, RLS matrix tổng quan |
| `02_Migration` | 37 đợt migration từ Nền Móng → Bảo Mật → 3-Role → Enterprise |

### 05 — Tích Hợp Bên Thứ 3 / 3rd Party Integrations
| File | Nội dung |
|------|---------|
| `01_NicePay` | Cổng thanh toán: Prepare → Confirm → Refund, Idempotency, Webhook |
| `02_Solapi` | Kakao Alimtalk SMS, 5 template, Fallback logic |
| `03_Resend` | 9 email template, fail-safe, no-op mode, wrapper branding |
| `04_Vercel` | Deployment model, 6 Cron Jobs, 9 ENV vars, CI/CD pipeline |

### 06–07 — Tài Liệu 57 Trang Giao Diện / 57 Pages Documentation
- Phân thành 5 nhóm: `User/` (24 trang), `Partner/` (16 trang), `Admin/` (17 trang), `Legal/`, `Others/`
- Mỗi file mô tả: Mục đích, URL, Components, Data flow, RLS liên quan

### 08, 10 — Sơ Đồ Luồng User / User Flow Diagrams
- 3 sơ đồ Mermaid chiều dọc (Customer 24 nodes, Partner 16 nodes, Admin 17 nodes)
- Mỗi node ghi rõ đường dẫn URL (`/path`)

### 12 — Kế Hoạch Phát Triển 60 Ngày / 2-Month Development Plan
| File | Nội dung |
|------|---------|
| `00_Bao_Cao` | Báo cáo hiện trạng: 90% MVP xong, 10% nợ kỹ thuật |
| `01_Sprint_1` | Tuần 1–2: NicePay live + Kakao/Resend + E2E Playwright |
| `02_Sprint_2` | Tuần 3–4: Vercel CronJobs + CS Refund + Coupon checkout |
| `03_Sprint_3` | Tuần 5–6: Recurring bookings + OpenBanking + Heatmap |
| `04_Sprint_4` | Tuần 7–8: Security hardening + Redis + Sentry + Go-Live |

---

*Tài liệu này được duy trì bởi đội phân tích kỹ thuật CleanHi. Mọi thay đổi cấu trúc folder cần cập nhật lại file README.*
