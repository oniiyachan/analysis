# PAGE: Review Management (`/p/reviews`)

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/p/reviews` |
| Source File | `src/app/(partner)/p/reviews/page.tsx` |
| Allowed Roles | All Partner Members |

## 2. FEATURES & FUNCTIONALITY
- **Review Feed**: Customer reviews with 4-criteria ratings
- **Reply Form** (`ReplyForm`): Partner can write a response to each review

## 3. SERVER ACTIONS
| Action | File | Description |
|--------|------|-------------|
| `replyReview` | `p/reviews/_actions/reply-review.ts` | UPDATE `reviews.partner_reply` |

## 4. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `reviews` | `id, booking_id, rating, text, partner_reply, created_at` | SELECT + UPDATE partner_reply |
