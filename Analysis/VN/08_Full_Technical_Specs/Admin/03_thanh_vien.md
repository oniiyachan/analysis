# TRANG: Quản Lý Thành Viên (Users / Partners / Đơn Xin / Admins)

## 1. ĐỊNH TUYẾN
| Mục | Giá Trị |
|-----|---------|
| URL | `/admin/members?tab=users\|partners\|applications\|partner_members\|admins` |
| File Mã Nguồn | `src/app/(admin)/admin/members/page.tsx` (301 dòng) |
| Vai Trò | Admin (tab admins = chỉ Super Admin) |

## 2. CHỨC NĂNG
- **Giao Diện 5 Tab**: Users / Partners / Đơn xin / Duyệt thành viên / Quản trị (chỉ super)
- **Tab Users** (`UsersTab`): Bảng dữ liệu email, vai trò, trạng thái, tier, cấm/blacklist, thao tác hàng loạt
- **Tab Partners**: Bảng tên, mã kinh doanh, trạng thái, badge xếp hạng, đánh giá, khu vực, hành động
- **Tab Đơn Xin**: Duyệt đơn đối tác (phê duyệt/từ chối)
- **Tab Duyệt Thành Viên**: Duyệt lời mời thành viên đối tác
- **Tab Admins**: Danh sách admin chỉ super có thể xem (thêm/xóa)
- **Dialog Ghi Đè Xếp Hạng**: Super admin ghi đè tier (Bronze/Silver/Gold)
- **Cấm/Danh Sách Đen**: Cấm user (theo thời hạn), danh sách đen hàng loạt

## 3. SERVER ACTIONS
| Hàm | File | Mô Tả |
|-----|------|-------|
| `banUser` | `members/_actions/ban-user.ts` | Cấm user theo thời hạn |
| `bulkBlacklist` | `members/_actions/bulk-blacklist.ts` | Danh sách đen hàng loạt |
| `bulkBroadcast` | `members/_actions/bulk-broadcast.ts` | Gửi push cho users đã chọn |
| `invitePartner` | `members/_actions/invite-partner.ts` | TẠO bản ghi partner + member |
| `reviewApplication` | `members/_actions/review-application.ts` | Phê duyệt/từ chối đơn đối tác |
| `reviewMemberApplication` | `members/_actions/review-member-application.ts` | Phê duyệt/từ chối lời mời |
| `overrideTier` | `members/_actions/override-tier.ts` | Super: ghi đè tier đối tác |
| `adminActions` | `members/_actions/admin-actions.ts` | Super: thêm/xóa admin |
| `partnerActions` | `members/_actions/partner-actions.ts` | Chuyển trạng thái đối tác |

## 4. BẢNG CSDL
| Bảng | Cột | Thao Tác |
|------|-----|----------|
| `profiles` | `id, email, name, role, status, tier, created_at` | SELECT |
| `partners` | `id, business_name, business_number, status, rating, review_count, total_completed, service_areas, warning_count, tier` | SELECT + UPDATE |
| `partner_applications` | `id, business_name, status, created_at` | SELECT + UPDATE |
| `partner_member_applications` | `id, partner_id, profile_id, role, status` | SELECT + UPDATE |
| `partner_members` | `partner_id, profile_id, member_role, team_id` | INSERT |
| `admin_profiles` | `profile_id, created_at` | SELECT + INSERT + DELETE |
