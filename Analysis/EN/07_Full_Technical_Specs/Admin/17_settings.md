# PAGE: Admin Settings

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/admin/settings` |
| Source File | `src/app/(admin)/admin/settings/page.tsx` |
| Auth | Admin / Super Admin |

## 2. FEATURES & FUNCTIONALITY
- **Business Settings Tab** (`BusinessSettingsTab`): Edit platform-wide settings (commission rate, bid timeout, etc.)
- **Permission Matrix Tab** (`PermissionMatrixTab`): View/edit role permissions (Super only)
- **My Account Card** (`MyAccountCard`): Current admin profile, password change
- **Email Test Panel** (`EmailTestPanel`): Send test emails to verify Resend integration
- **Setting History** (`SettingHistoryPanel`): View changelog of all setting modifications
- **Edit Setting Dialog** (`EditSettingDialog`): Inline edit for each setting row
- **Revert Button** (`RevertSettingButton`): Revert setting to previous value

## 3. COMPONENT TREE
```
SettingsPage (Server)
├── BusinessSettingsTab (Client)
│   ├── EditSettingRowButton (Client) × N
│   ├── EditSettingDialog (Client)
│   ├── RevertSettingButton (Client)
│   └── SettingHistoryPanel (Client)
├── PermissionMatrixTab (Client) — Super only
├── MyAccountCard (Client)
└── EmailTestPanel (Client)
```

## 4. SERVER ACTIONS
| Action | File | Description |
|--------|------|-------------|
| `updateSetting` | `admin/settings/_actions/update-setting.ts` | UPDATE `platform_settings` |
| `revertSetting` | `admin/settings/_actions/revert-setting.ts` | Revert to previous value |
| `accountActions` | `admin/settings/_actions/account-actions.ts` | Update own admin profile |
| `testEmail` | `admin/settings/_actions/test-email.ts` | Send test email via Resend |

## 5. DATABASE TABLES
| Table | Columns | Operation |
|-------|---------|-----------|
| `platform_settings` | `key, value, updated_by, updated_at` | SELECT + UPDATE |
| `setting_history` | `setting_key, old_value, new_value, changed_by, changed_at` | SELECT + INSERT |
| `profiles` | `id, email, name` | SELECT (own profile) |

## 6. EXTERNAL INTEGRATIONS
| Service | Purpose |
|---------|---------|
| **Resend** | Test email delivery in Email Test Panel |
