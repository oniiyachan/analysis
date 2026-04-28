# PAGE: Add Team Member (`/p/team/add`)

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/p/team/add` |
| Source File | `src/app/(partner)/p/team/add/page.tsx` |
| Allowed Roles | Owner only |

## 2. FEATURES & FUNCTIONALITY
- **Invitation Form** (`TeamAddForm`): Email, role selection (lead/worker), team assignment
- **Member Application**: Creates `partner_member_applications` record for admin approval

## 3. SERVER ACTIONS
| Action | File | Description |
|--------|------|-------------|
| `submitMemberApplication` | `p/team/_actions/submit-member-application.ts` | INSERT `partner_member_applications` |

## 4. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `partner_member_applications` | `partner_id, profile_id, role, status='pending'` | INSERT |
