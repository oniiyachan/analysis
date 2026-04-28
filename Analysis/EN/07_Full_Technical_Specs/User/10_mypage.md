# PAGE: My Page (Profile Dashboard)

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/mypage` |
| Source File | `src/app/(user)/mypage/page.tsx` |
| Allowed Roles | Registered Customer |
| Auth Required | Yes |

## 2. FEATURES & FUNCTIONALITY
- **Profile Summary**: User name, email, member since date
- **Points Balance Card**: Current balance + link to `/mypage/points`
- **Quick Links**: Favorites, Recurring Schedule, Booking History
- **Account Settings**: Change password link, notification preferences

## 3. COMPONENT TREE
```
MyPage (Server)
└── PointsCard (Client) — displays balance with animation
```

## 4. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `profiles` | `id, email, name, phone, points_balance, created_at` | SELECT |
