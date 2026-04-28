# TRANG: Quản Lý Matching (Pipeline Kanban)

## 1. ĐỊNH TUYẾN
| Mục | Giá Trị |
|-----|---------|
| URL | `/admin/matching` |
| File Mã Nguồn | `src/app/(admin)/admin/matching/page.tsx` (115 dòng) |
| Vai Trò | Admin |
| Kiểu Render | `force-dynamic` Server → Client `MatchingRealtimeBoundary` |

## 2. CHỨC NĂNG
- **Bảng Kanban 6 Cột**: bidding / bids_received / pending_payment / confirmed / in_progress / completed
- **Thẻ Yêu Cầu**: Danh mục, diện tích (pyeong), quận, số bid, AI estimate
- **Cập Nhật Thời Gian Thực**: `MatchingRealtimeBoundary` với chỉ báo pulse xanh
- **Top 10 Mỗi Cột**: 10 yêu cầu gần nhất mỗi trạng thái

## 3. BẢNG CSDL
| Bảng | Cột | Thao Tác |
|------|-----|----------|
| `cleaning_requests` | `id, status, category_id, area_pyeong, district, bid_count, ai_estimate_avg, created_at` | SELECT (limit 200, nhóm theo status) |

## 4. REALTIME
| Component | Channel | Sự Kiện | Bảng |
|-----------|---------|---------|------|
| `MatchingRealtimeBoundary` | `cleaning_requests:all` | `UPDATE` | `cleaning_requests` |
