# PAGE: Member Management (Users / Partners / Applications / Admins)

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/admin/members?tab=users\|partners\|applications\|partner_members\|admins` |
| Source File | `src/app/(admin)/admin/members/page.tsx` (301 lines) |
| Auth | Admin (admins tab = Super Admin only) |

## 2. FEATURES & FUNCTIONALITY
- **5-Tab Interface**: Users / Partners / Applications / Partner Member Approvals / Admins (super only)
- **Users Tab** (`UsersTab`): Data table with email, role, status, tier, ban/blacklist actions, bulk operations
- **Partners Tab**: Data table with business name, number, status, tier badge, rating, areas, row actions
- **Applications Tab**: Review pending partner applications (approve/reject)
- **Member Applications Tab**: Review pending partner member invitations
- **Admins Tab**: Super-only admin list with add/remove capabilities
- **Tier Override Dialog**: Super admin can manually override partner tier (Bronze/Silver/Gold)
- **Ban/Blacklist Actions**: Ban user (duration-based), bulk blacklist

## 3. COMPONENT TREE
```
MembersPage (Server)
├── Tab Navigation (5 tabs, admins conditional)
├── UsersTab (Client) — data table + bulk actions
├── PartnersTab (Server/Client hybrid)
│   ├── AddPartnerDialog (Client)
│   ├── TierBadge (Client)
│   ├── TierOverrideDialog (Client)
│   └── PartnerRowActions (Client)
├── ApplicationsTab (Client)
├── MemberApplicationsTab (Client)
└── AdminsTab (Client)
```

## 4. SERVER ACTIONS & API
| Action | File | Description |
|--------|------|-------------|
| `banUser` | `members/_actions/ban-user.ts` | Ban user with duration |
| `bulkBlacklist` | `members/_actions/bulk-blacklist.ts` | Bulk blacklist users |
| `bulkBroadcast` | `members/_actions/bulk-broadcast.ts` | Send push to selected users |
| `invitePartner` | `members/_actions/invite-partner.ts` | CREATE partner + member records |
| `reviewApplication` | `members/_actions/review-application.ts` | Approve/reject partner application |
| `reviewMemberApplication` | `members/_actions/review-member-application.ts` | Approve/reject member invitation |
| `overrideTier` | `members/_actions/override-tier.ts` | Super: manually set partner tier |
| `adminActions` | `members/_actions/admin-actions.ts` | Super: add/remove admin |
| `partnerActions` | `members/_actions/partner-actions.ts` | Toggle partner status (active/suspended) |

## 5. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `profiles` | `id, email, name, role, status, tier, created_at` | SELECT |
| `partners` | `id, business_name, business_number, status, rating, review_count, total_completed, service_areas, warning_count, tier, created_at` | SELECT + UPDATE |
| `partner_applications` | `id, business_name, status, created_at` | SELECT + UPDATE |
| `partner_member_applications` | `id, partner_id, profile_id, role, status` | SELECT + UPDATE |
| `partner_members` | `partner_id, profile_id, member_role, team_id` | INSERT |
| `admin_profiles` | `profile_id, created_at` | SELECT + INSERT + DELETE |
