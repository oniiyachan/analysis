# TRANG: Quản Lý Quyết Toán Admin

## 1. ĐỊNH TUYẾN
| Mục | Giá Trị |
|-----|---------|
| URL | `/admin/settlement` |
| File Mã Nguồn | `src/app/(admin)/admin/settlement/page.tsx` (170 dòng) |
| Vai Trò | Admin |

## 2. CHỨC NĂNG
- **4 Thẻ KPI Trạng Thái**: Chờ / Đang xử lý / Đã hoàn thành / Thất bại (tổng net_amount)
- **Phát Hành Hóa Đơn Thuế Hàng Loạt** (`IssueTaxInvoicesForm`): Tạo hóa đơn hoa hồng hàng tháng
- **Bảng Lịch Sử Quyết Toán**: Ngày / Đối tác / Tổng / Phí / Thực nhận / Trạng thái (50 gần nhất)

## 3. SERVER ACTIONS
| Hàm | File | Mô Tả |
|-----|------|-------|
| `issueTaxInvoices` | `admin/settlement/_actions/issue-tax-invoices.ts` | Phát hành hàng loạt hóa đơn thuế hàng tháng |

## 4. BẢNG CSDL
| Bảng | Cột | Thao Tác |
|------|-----|----------|
| `settlements` | `id, partner_id, booking_id, gross_amount, platform_fee, net_amount, status, scheduled_date, completed_at` | SELECT |
| `partners` | `business_name` | JOIN |
| `tax_invoices` | `partner_id, period_ym, commission, net_payout` | INSERT (batch) |
