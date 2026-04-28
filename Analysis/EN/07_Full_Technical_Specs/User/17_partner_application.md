# PAGE: Partner Application

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/partner` |
| Source File | `src/app/(user)/partner/page.tsx` |
| Auth Required | No (Public landing + application form) |

## 2. FEATURES & FUNCTIONALITY
- **Partner Landing**: Benefits overview, earning potential, trust badges
- **Application Form**: Business name, license number, service areas, photo upload
- **Submit Application**: Creates `partner_applications` record for admin review

## 3. SERVER ACTIONS
| Action | File | Description |
|--------|------|-------------|
| `submitApplication` | `partner/_actions/submit-application.ts` | INSERT `partner_applications` |

## 4. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `partner_applications` | `id, business_name, license_number, service_areas, contact_email, contact_phone, status='pending'` | INSERT |
