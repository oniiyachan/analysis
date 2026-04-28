# PAGE: Marketing / Coupon Management

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/admin/marketing` |
| Source File | `src/app/(admin)/admin/marketing/page.tsx` |
| Auth | Admin |

## 2. FEATURES & FUNCTIONALITY
- **Coupon Manager** (`CouponManager`): Create/edit/delete coupon codes
- **Coupon Fields**: Code, discount amount/percent, max uses, valid until, min order amount
- **Usage Stats**: How many times each coupon was used

## 3. COMPONENT TREE
```
MarketingPage (Server)
└── CouponManager (Client) — full CRUD interface
```

## 4. SERVER ACTIONS
| Action | File | Description |
|--------|------|-------------|
| `couponActions` | `admin/marketing/_actions/coupon-actions.ts` | CRUD operations on `coupons` |

## 5. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `coupons` | `id, code, discount_type, discount_value, max_uses, used_count, valid_until, min_order_amount, is_active` | SELECT + INSERT + UPDATE + DELETE |
