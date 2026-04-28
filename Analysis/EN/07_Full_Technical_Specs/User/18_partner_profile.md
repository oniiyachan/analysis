# PAGE: Partner Profile (Public View)

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/partner/[id]` |
| Source File | `src/app/(user)/partner/[id]/page.tsx` |
| Auth Required | No (Public) |

## 2. FEATURES & FUNCTIONALITY
- **Company Profile**: Business name, rating, total completions, member since
- **Tab Navigation**: Overview / Portfolio / Reviews
- **Portfolio Gallery**: Grid of completed project photos
- **Reviews Feed**: Customer reviews with star ratings
- **Favorite Heart**: Toggle (auth required)

## 3. COMPONENT TREE
```
PartnerDetailPage (Server)
├── PartnerTabs (Client "use client") — tab switching
└── PortfolioGallery (Client) — image lightbox
```

## 4. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `partners` | `id, business_name, rating, review_count, total_completed, certifications, service_categories, about, created_at` | SELECT |
| `partner_assets` | `id, partner_id, image_url, caption` | SELECT |
| `reviews` | `id, partner_id, rating_*, comment, created_at` | SELECT |
| `profiles` (reviewer) | `name` | JOIN |
| `partner_favorites` | `user_profile_id, partner_id` | SELECT (check if favorited) |
