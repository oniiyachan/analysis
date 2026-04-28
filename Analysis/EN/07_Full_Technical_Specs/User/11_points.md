# PAGE: Points & Loyalty History

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/mypage/points` |
| Source File | `src/app/(user)/mypage/points/page.tsx` |
| Auth Required | Yes |

## 2. FEATURES & FUNCTIONALITY
- **Balance Display**: Current points with large number
- **Expiring Banner**: Warning for points expiring within 7 days
- **History List**: Chronological list of earn/spend transactions
- **Kind Filter**: Filter by type (review_reward / coupon_spend / refund_reverse / admin_adjust)
- **Monthly Chart**: Recharts bar chart showing monthly point flow

## 3. COMPONENT TREE
```
PointsPage (Server)
├── ExpiringBanner (Client)
├── KindFilter (Client)
├── HistoryList (Client)
└── MonthlyChart (Client) — Recharts
```

## 4. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `profiles` | `points_balance` | SELECT |
| `loyalty_events` | `id, user_id, kind, amount, reference_type, reference_id, created_at, expires_at` | SELECT |
