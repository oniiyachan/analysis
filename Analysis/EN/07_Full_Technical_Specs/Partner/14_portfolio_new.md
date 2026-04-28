# PAGE: Add Portfolio Item (`/p/portfolio/new`)

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/p/portfolio/new` |
| Source File | `src/app/(partner)/p/portfolio/new/page.tsx` |
| Allowed Roles | Owner / Lead |

## 2. FEATURES & FUNCTIONALITY
- **Upload Form** (`PortfolioForm`): Image file upload + caption input
- **Storage Upload**: Files uploaded to Supabase Storage `partner-portfolio` bucket

## 3. SERVER ACTIONS
| Action | File | Description |
|--------|------|-------------|
| `createPortfolio` | `p/portfolio/_actions/create-portfolio.ts` | INSERT `partner_assets` + upload to Storage |
| `deletePortfolio` | `p/portfolio/_actions/delete-portfolio.ts` | DELETE from `partner_assets` + remove from Storage |

## 4. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `partner_assets` | `id, partner_id, url, caption, type='portfolio'` | INSERT |
