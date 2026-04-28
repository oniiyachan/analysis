# PAGE: Review Management (Admin)

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/admin/reviews` |
| Source File | `src/app/(admin)/admin/reviews/page.tsx` |
| Auth | Admin |

## 2. FEATURES & FUNCTIONALITY
- **Review Table**: All reviews with filter bar (date range, rating, partner)
- **Filter Bar** (`ReviewFilterBar`): Date range, min/max rating, partner search
- **Review Row** (`ReviewRow`): Star rating, customer, partner, text, visibility toggle
- **Visibility Toggle**: Hide/show reviews for moderation

## 3. COMPONENT TREE
```
ReviewsPage (Server)
├── ReviewFilterBar (Client)
└── ReviewRow (Client) × N — visibility toggle button
```

## 4. SERVER ACTIONS
| Action | File | Description |
|--------|------|-------------|
| `setVisibility` | `admin/reviews/_actions/set-visibility.ts` | UPDATE `reviews.is_visible` |

## 5. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `reviews` | `id, booking_id, rating, text, partner_reply, is_visible, created_at` | SELECT + UPDATE is_visible |
