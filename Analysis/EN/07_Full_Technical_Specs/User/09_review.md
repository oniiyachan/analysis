# PAGE: Review (Submit Star Rating)

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/review/[id]` (id = bookingId) |
| Source File | `src/app/(user)/review/[id]/page.tsx` |
| Allowed Roles | Customer (booking owner, status=completed) |
| Auth Required | Yes |

## 2. FEATURES & FUNCTIONALITY
- **4-Criteria Rating**: Cleanliness, Punctuality, Courtesy, Value-for-Money (1-5 stars each)
- **Text Review**: Free-form feedback textarea
- **Photo Upload**: Optional proof photos
- **Points Reward**: +500P loyalty points automatically credited on submit
- **One-time Only**: Cannot re-submit review for same booking

## 3. COMPONENT TREE
```
ReviewPage (Server)
└── ReviewForm (Client "use client")
    ├── Star Rating × 4
    ├── Textarea
    └── Submit Button
```

## 4. SERVER ACTIONS & API
| Action | File | Description |
|--------|------|-------------|
| `submitReview` | `review/[id]/_actions/submit-review.ts` | INSERT `reviews` + trigger auto-rating recalc |

## 5. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `reviews` | `id, booking_id, user_id, partner_id, rating_cleanliness, rating_punctuality, rating_courtesy, rating_value, comment, created_at` | INSERT |
| `partners` | `rating, review_count` | AUTO-UPDATE (SQL Trigger `update_partner_rating`) |
| `loyalty_events` | `user_id, kind='review_reward', amount=500` | AUTO-INSERT (SQL Trigger) |
| `bookings` | `id, user_id, partner_id, status` | SELECT (verify completed + ownership) |

## 6. RLS POLICIES
- `reviews_user_insert`: User can only insert review for own completed booking
- `reviews_user_select`: User reads own reviews
