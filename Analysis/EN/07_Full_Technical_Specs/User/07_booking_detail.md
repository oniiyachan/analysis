# PAGE: Booking Detail

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/bookings/[id]` |
| Source File | `src/app/(user)/bookings/[id]/page.tsx` |
| Allowed Roles | Registered Customer (booking owner) |
| Auth Required | Yes |
| Rendering | `force-dynamic` Server Component |

## 2. FEATURES & FUNCTIONALITY
- **Booking Status Timeline**: Visual progress bar (Confirmed → Assigned → In Progress → Completed)
- **Service Detail Card**: Partner name, service type, area, scheduled date/time, location
- **Action Buttons**: Chat with Cleaner, Write Review, File Complaint (conditional by status)
- **Price Summary**: Total amount paid, coupon discount, points used
- **Partner Profile Link**: Tap partner name → `/partner/[partnerId]`
- **Cancel Policy**: 24h free cancellation notice

## 3. COMPONENT TREE
```
BookingDetailPage (Server)
├── Status Timeline
├── Service Detail Card
├── Action Button Row (Chat / Review / CS)
└── Price Summary
```

## 4. DATABASE TABLES
| Table | Columns Used | Operation |
|-------|-------------|-----------|
| `bookings` | `id, request_id, quote_id, partner_id, status, total_amount, scheduled_date, scheduled_time` | SELECT |
| `cleaning_requests` | `category_id, area_pyeong, district, dong` | JOIN |
| `partners` | `business_name, rating` | JOIN |
| `payments` | `status, method, paid_at` | JOIN |

## 5. RLS POLICIES
- `bookings_user_select`: User reads only own bookings
