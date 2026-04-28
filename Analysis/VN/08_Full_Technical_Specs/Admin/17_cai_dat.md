# TRANG: Cài Đặt Nền Tảng (Admin Settings)

## 1. ĐỊNH TUYẾN
| Mục | Giá Trị |
|-----|---------|
| URL | `/admin/settings` |
| Vai Trò | Admin / Super Admin |

## 2. CHỨC NĂNG
- **Tab Cài Đặt Kinh Doanh** (`BusinessSettingsTab`): Sửa cài đặt toàn nền tảng (tỷ lệ hoa hồng, thời gian chờ bid...)
- **Tab Ma Trận Quyền** (`PermissionMatrixTab`): Xem/sửa quyền vai trò (chỉ Super)
- **Thẻ Tài Khoản** (`MyAccountCard`): Hồ sơ admin hiện tại, đổi mật khẩu
- **Bảng Test Email** (`EmailTestPanel`): Gửi email thử nghiệm qua Resend
- **Lịch Sử Cài Đặt** (`SettingHistoryPanel`): Xem nhật ký thay đổi tất cả cài đặt
- **Nút Hoàn Tác** (`RevertSettingButton`): Hoàn tác cài đặt về giá trị trước

## 3. SERVER ACTIONS
| Hàm | File | Mô Tả |
|-----|------|-------|
| `updateSetting` | `admin/settings/_actions/update-setting.ts` | UPDATE `platform_settings` |
| `revertSetting` | `admin/settings/_actions/revert-setting.ts` | Hoàn tác về giá trị trước |
| `accountActions` | `admin/settings/_actions/account-actions.ts` | Cập nhật hồ sơ admin |
| `testEmail` | `admin/settings/_actions/test-email.ts` | Gửi email thử qua Resend |

## 4. BẢNG CSDL
| Bảng | Cột | Thao Tác |
|------|-----|----------|
| `platform_settings` | `key, value, updated_by, updated_at` | SELECT + UPDATE |
| `setting_history` | `setting_key, old_value, new_value, changed_by, changed_at` | SELECT + INSERT |
| `profiles` | `id, email, name` | SELECT (hồ sơ riêng) |

## 5. TÍCH HỢP BÊN NGOÀI
| Dịch Vụ | Mục Đích |
|---------|----------|
| **Resend** | Test gửi email trong Bảng Test Email |
