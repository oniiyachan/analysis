# LỊCH SỬ 37 ĐỢT CHUYỂN ĐỔI CƠ SỞ DỮ LIỆU (MIGRATION HISTORY)

> **Thư mục gốc**: `supabase/migrations/` — Mỗi file `.sql` đại diện cho một đợt tiến hóa Database.

---

## BẢNG TỔNG KẾT TIẾN HÓA (37 Đợt Migration)

| Đợt | File Migration | Nội dung chính | Ngày |
|-----|----------------|---------------|------|
| 01 | `01_extensions_helpers_profiles` | Kích hoạt Extension UUID, tạo bảng `profiles`, Trigger `handle_new_user` tự động sinh profile khi đăng ký | 18/04 |
| 02 | `02_partners_and_catalog` | Bảng `partners` + `service_categories` + `service_sub_categories`. Seed dữ liệu 5 loại dọn dẹp | 18/04 |
| 03 | `03_cleaning_requests_and_quotes` | Bảng CORE: `cleaning_requests` (đơn yêu cầu) + `quotes` (báo giá). FK liên kết chéo | 18/04 |
| 04 | `04_bookings_payments_settlements` | Chuỗi thanh toán: `bookings` → `payments` → `settlements`. Khóa tiền hoa hồng 15% | 18/04 |
| 05 | `05_reviews_coupons_chat_notifications_cs_audit` | 7 bảng phụ trợ: `reviews`, `coupons`, `chat_rooms`, `chat_messages`, `notifications`, `cs_tickets`, `audit_logs` | 18/04 |
| 06 | `06_rls_policies` | Bộ RLS sơ khởi cho toàn bộ 16 bảng. Lần đầu chặn cross-user | 18/04 |
| 07 | `07_realtime_and_storage` | Bật Supabase Realtime Publication + Tạo Storage Bucket `quote-photos` | 18/04 |
| 08 | `08_fix_function_search_path` | Vá bảo mật: thêm `SET search_path = ''` cho Trigger function | 18/04 |
| 09 | `09_fix_handle_new_user_phone` | Fix bug Trigger: phone nullable khi signup | 18/04 |
| 10 | `10_partner_applications` | Bảng `partner_applications`: đơn xin lên sàn của công ty dọn dẹp | 19/04 |
| 11 | `11_payment_idempotency` | **Track A1 Bảo mật**: `payments.pg_tx_id UNIQUE` chống Charge đôi + bảng `payment_reconciliation_queue` | 19/04 |
| 12 | `12_quote_photos_rls_fix` | **Track A2**: Vá RLS Storage chống đọc ảnh chéo giữa các Partner | 19/04 |
| 13 | `13_partner_organization` | Cấu trúc 3-Role: `partner_teams` + `partner_members` (owner/lead/worker) | 20/04 |
| 14 | `14_partner_member_applications` | Bảng `partner_member_applications`: Đơn xin gia nhập team của Lính | 20/04 |
| 15 | `15_admin_role_and_audit` | Thêm cột `profiles.admin_role` (super/ops/cs/marketing) + mở rộng `audit_logs` | 20/04 |
| 16 | `16_rls_admin_role` | **RLS Đại Phẫu**: Drop 13 + Create 15 policy. Hàm `app.has_admin_role()` | 20/04 |
| 17 | `17_lead_bidding` | `quotes.submitted_by_profile_id` + `bookings.team_id`: Lead được phép đấu giá | 20/04 |
| 18 | `18_guest_quotes` | `cleaning_requests.user_id` NULLABLE + `guest_sessions` table: Khách vãng lai | 20/04 |
| 19 | `19_rate_limits` | Bảng `rate_limits`: Chặn spam IP/email/phone | 20/04 |
| 20 | `20_grant_app_schema` | Cấp quyền schema `app` cho authenticated role | 20/04 |
| 21 | `21_fix_rls_recursion` | Fix infinite recursion trong RLS policy | 20/04 |
| 22 | `22_review_reply` | Thợ phản hồi review + Admin ẩn/hiện | 21/04 |
| 23 | `23_loyalty_coupons` | Điểm thưởng 500P khi viết review + Cải tiến coupon | 21/04 |
| 24 | `24_consents` | Bảng đồng ý pháp lý (Terms/Privacy consent gate) | 21/04 |
| 25 | `25_receipts` | Template biên lai + hóa đơn thuế | 21/04 |
| 26 | `26_anomaly_alerts` | Bảng `anomaly_alerts`: Còi báo bất thường tự động | 21/04 |
| 27 | `27_recurring_bookings` | Bảng `recurring_subscriptions`: Đặt lịch dọn dẹp định kỳ | 21/04 |
| 28 | `28_broadcasts` | Bảng `broadcasts` + `broadcast_deliveries`: Gửi thông báo hàng loạt | 22/04 |
| 29 | `29_partner_tier` | Hệ thống xếp hạng Thợ (Bronze/Silver/Gold) | 22/04 |
| 30 | `30_partner_assets` | Kho ảnh portfolio công ty Thợ | 22/04 |
| 31 | `31_partner_favorites` | Bảng Khách yêu thích Thợ | 22/04 |
| 32 | `32_user_tier` | Xếp hạng VIP Khách hàng | 22/04 |
| 33 | `33_admin_reports` | Hệ thống báo cáo/tố cáo từ người dùng | 22/04 |
| 34 | `34_system_settings` | Bảng Cài đặt hệ thống key-value | 22/04 |
| 35 | `35_system_settings_write` | RLS cho phép Super Admin ghi cài đặt | 22/04 |
| 36 | `36_broadcast_channels` | Mở rộng broadcast: 3 kênh (email/kakao/sms) | 22/04 |
| 37 | `37_partner_customer_stats` | CRM thống kê khách ruột của Thợ | 22/04 |

---

## PHÂN NHÓM THEO GIAI ĐOẠN

- **Nền móng (Mig 01–09)**: Schema cơ bản 16 bảng + RLS sơ khởi + Realtime + Storage
- **Bảo mật Track A (Mig 10–12)**: Vá lỗ hổng thanh toán + Storage + Partner Applications
- **Tổ chức 3-Role (Mig 13–19)**: Hệ Owner/Lead/Worker + Admin RBAC + Guest Flow + Rate-limit
- **Mở rộng Tính Năng (Mig 20–27)**: Fix RLS + Review phản hồi + Loyalty + Consent + Recurring
- **Phase 7 Enterprise (Mig 28–37)**: Broadcast + Tier ranking + CRM + Reports + System Settings
