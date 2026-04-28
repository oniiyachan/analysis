# PAGE: Portfolio Gallery (`/p/portfolio`)

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/p/portfolio` |
| Source File | `src/app/(partner)/p/portfolio/page.tsx` |
| Allowed Roles | Owner / Lead |

## 2. FEATURES & FUNCTIONALITY
- **Photo Grid**: Completed project showcase photos
- **Portfolio Card** (`PortfolioCard`): Image thumbnail, caption, delete button
- **Upload Link**: Navigate to `/p/portfolio/new`
- **Delete**: Remove portfolio items

## 3. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `partner_assets` | `id, partner_id, url, caption, type='portfolio', created_at` | SELECT + DELETE |
