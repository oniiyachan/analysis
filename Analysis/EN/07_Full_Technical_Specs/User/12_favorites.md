# PAGE: Favorite Partners

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/mypage/favorites` |
| Source File | `src/app/(user)/mypage/favorites/page.tsx` |
| Auth Required | Yes |

## 2. FEATURES & FUNCTIONALITY
- **Favorite Card Grid**: Saved partner cards with rating, review count, business name
- **Unfavorite Button**: Remove from favorites
- **Partner Link**: Tap → `/partner/[id]`

## 3. SERVER ACTIONS
| Action | File | Description |
|--------|------|-------------|
| `unfavorite` | `mypage/favorites/_actions/unfavorite.ts` | DELETE from `partner_favorites` |

## 4. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `partner_favorites` | `user_profile_id, partner_id, created_at` | SELECT + DELETE |
| `partners` | `id, business_name, rating, review_count` | JOIN |
