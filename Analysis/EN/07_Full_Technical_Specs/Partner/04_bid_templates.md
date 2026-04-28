# PAGE: Bid Templates (`/p/bids/templates`)

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/p/bids/templates` |
| Source File | `src/app/(partner)/p/bids/templates/page.tsx` |
| Allowed Roles | Owner / Lead |

## 2. FEATURES & FUNCTIONALITY
- **Template Card List** (`TemplateCard`): Saved bid presets (price, services, message)
- **Template Form** (`TemplateForm`): Create new template
- **Delete Template**: Remove existing template

## 3. SERVER ACTIONS
| Action | File | Description |
|--------|------|-------------|
| `createTemplate` | `p/bids/templates/_actions/create-template.ts` | INSERT bid template |
| `deleteTemplate` | `p/bids/templates/_actions/delete-template.ts` | DELETE bid template |

## 4. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `bid_templates` | `id, partner_id, name, total_price, services, message` | SELECT + INSERT + DELETE |
