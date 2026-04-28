# PAGE: Team Management (`/p/team`)

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/p/team` |
| Source File | `src/app/(partner)/p/team/page.tsx` |
| Allowed Roles | Owner only |

## 2. FEATURES & FUNCTIONALITY
- **Team Member List**: Name, role (owner/lead/worker), team assignment
- **Member Invitation**: Link to `/p/team/add`
- **Role Display**: Badge color-coded by role

## 3. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `partner_members` | `id, partner_id, profile_id, member_role, team_id` | SELECT |
| `profiles` | `name, email` | JOIN (member info) |
