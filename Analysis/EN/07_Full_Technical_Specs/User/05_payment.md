# PAGE: Payment Checkout

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/payment/[id]` (id = quoteId) |
| Source File | `src/app/(user)/payment/[id]/page.tsx` (223 lines) |
| Allowed Roles | Registered Customer (request owner) |
| Auth Required | Yes |
| Rendering | `force-dynamic` Server → Client `PaymentClient` |

## 2. FEATURES & FUNCTIONALITY
- **Booking Summary Card**: Partner name, service type + area, district
- **Coupon Input Form**: Enter code → server validates → recalculates `applied_discount_amount`
- **Points Usage Form**: Apply loyalty points (min final ₩100, max = balance)
- **Price Breakdown**: Original price → Coupon discount → Points reduction → Final amount
- **NicePay SDK Integration**: Embedded payment form (credit card / bank transfer / digital wallet)
- **Safety Notice**: 24h free cancellation policy, card + bank + easy pay support

## 3. COMPONENT TREE
```
PaymentPage (Server)
├── Booking Summary (Server)
├── CouponForm (Client "use client")
├── PointsForm (Client "use client")
├── Price Breakdown (Server)
└── PaymentClient (Client "use client") — NicePay SDK
```

## 4. SERVER ACTIONS & API
| Action | File | Description |
|--------|------|-------------|
| `applyCoupon` | `payment/[id]/_actions/apply-points.ts` | Validate coupon → UPDATE `quotes.applied_*` |
| `applyPoints` | `payment/[id]/_actions/apply-points.ts` | Deduct points → INSERT `loyalty_events` |
| `initPayment` | `payment/[id]/_actions/init-payment.ts` | Prepare NicePay session |
| `/api/nicepay/confirm` | `src/app/api/nicepay/confirm/route.ts` | Confirm payment → CREATE booking |

## 5. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `quotes` | `id, request_id, partner_id, total_price, status, applied_coupon_id, applied_discount_amount` | SELECT + UPDATE |
| `partners` | `business_name` | JOIN |
| `cleaning_requests` | `id, user_id, category_id, area_pyeong, district, dong` | JOIN (ownership check) |
| `coupons` | `id, code, discount_amount, discount_percent, max_uses, valid_until, min_order_amount` | JOIN |
| `profiles` | `points_balance` | SELECT |
| `loyalty_events` | `user_id, kind, amount, reference_type, reference_id` | SELECT + INSERT |
| `payments` | `id, quote_id, amount, status, pg_tx_id, method` | INSERT |
| `bookings` | `id, request_id, quote_id, partner_id, status, total_amount, scheduled_date` | INSERT |

## 6. REALTIME SUBSCRIPTIONS
None.

## 7. ENVIRONMENT VARIABLES
| Variable | Required | Purpose |
|----------|----------|---------|
| `NICEPAY_MID` | Yes | Merchant ID for NicePay |
| `NICEPAY_MERCHANT_KEY` | Yes | Auth key for server confirm |
| `NICEPAY_CLIENT_ID` | Yes | Client SDK initialization |
| `NEXT_PUBLIC_APP_URL` | Yes | Return URL after payment |

## 8. RLS POLICIES
- `quotes_user_read`: Owner reads own quote
- `profiles_user_select_own`: Read own points balance
- `loyalty_events_user_read`: Read own point transactions
- `coupons_authenticated_read`: Any logged-in user can validate coupons

## 9. EXTERNAL INTEGRATIONS
| Service | Purpose |
|---------|---------|
| **NicePay SDK 2.0** | PG (Payment Gateway): credit card, bank transfer, Kakao/Naver/Samsung Pay |
