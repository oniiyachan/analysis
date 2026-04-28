# PAGE ARCHITECTURE & URL ROUTING MAP

The CleanHi project is divided into 3 Portals (entry gates) corresponding to 3 user types. Below is a detailed diagram integrating the actual URL routes derived from the Next.js App Router structure (`src/app`).

---

## 1. Customer Portal (Route Prefix: `/`)
**Purpose**: Enable customers to submit cleaning requests, compare bids, pay, and interact with support. (Mobile-first design.)

```mermaid
graph TD
    UserRoot((Home / Landing))

    UserRoot --> QuoteFlow["👉 /quote : 8-Step Quote Wizard"]
    UserRoot --> MyPage["👉 /mypage : Personal Dashboard"]

    QuoteFlow --> WaitingView["👉 /waiting/[id] : Countdown Bid Timer"]
    WaitingView --> Compare["👉 /compare/[id] : Bid Comparison Matrix"]
    Compare --> Payment["👉 /payment/[id] : NicePay Checkout"]

    MyPage --> BookingHistory["👉 /bookings : Booking History"]
    MyPage --> Points["👉 /mypage/points : Points & Coupons"]
    MyPage --> Recurring["👉 /mypage/recurring : Recurring Schedules"]
    MyPage --> Favorites["👉 /mypage/favorites : Saved Cleaners"]

    BookingHistory --> BookingDetail["👉 /bookings/[id] : Booking Detail"]
    BookingDetail --> Chat["👉 /bookings/[id]/chat : Chat with Cleaner"]
    BookingDetail --> Review["👉 /review/[id] : Submit Star Rating"]
    BookingDetail --> CS["👉 /cs/new : File a Complaint"]

    UserRoot --> PartnerView["👉 /partner/[id] : Company Profile"]
    UserRoot --> Notifications["👉 /notifications : Notification Center"]
```

---

## 2. Partner Portal (Route Prefix: `/p/`)
**Purpose**: Workspace for cleaning companies (Lead/Owner) and field workers to discover jobs, submit bids, and manage schedules.

```mermaid
graph TD
    PartnerRoot(("👉 /p : Partner Dashboard"))

    PartnerRoot --> Bids["👉 /p/bids : Browse & Bid"]
    PartnerRoot --> Schedule["👉 /p/schedule : Work Calendar"]
    PartnerRoot --> Team["👉 /p/team : Team Management"]
    PartnerRoot --> Settlement["👉 /p/settlement : Revenue Ledger"]
    PartnerRoot --> CRM["👉 /p/customers : Customer CRM"]
    PartnerRoot --> Settings["👉 /p/settings : Company Profile"]

    Bids --> MakeBid["👉 /p/bids/[requestId] : Submit Bid Form"]
    Bids --> BidTemplates["👉 /p/bids/templates : Saved Bid Templates"]

    Schedule --> WorkAction["👉 /p/schedule/[bookingId] : Start/Complete Job"]
    WorkAction --> PChat["👉 /p/schedule/[bookingId]/chat : Chat with Client"]

    Team -.-> AddStaff["👉 /p/team/add : Recruit New Worker (Owner only)"]

    Settings --> Portfolio["👉 /p/portfolio : Portfolio Gallery"]
    Settings --> Ratings["👉 /p/reviews : Respond to Reviews"]
```

---

## 3. Admin Portal (Route Prefix: `/admin/`)
**Purpose**: Desktop-first operations workbench for Ops/CS/Marketing teams running the entire marketplace.

```mermaid
graph TD
    AdminRoot(("👉 /admin : Admin Dashboard"))

    AdminRoot --> Matching["👉 /admin/matching : Order Pipeline Kanban"]
    AdminRoot --> Members["👉 /admin/members : Partner Approval Queue"]
    AdminRoot --> CS["👉 /admin/cs : Dispute Center"]
    AdminRoot --> Finance["👉 /admin/settlement : Financial Ledger"]
    AdminRoot --> Analytics["👉 /admin/analytics : BI Reports"]
    AdminRoot --> Marketing["👉 /admin/marketing : Coupon Campaigns"]
    AdminRoot --> Config["👉 /admin/settings : System Configuration"]

    CS --> TicketDetail["👉 /admin/cs/[id] : Ticket Resolution"]
    AdminRoot --> Broadcast["👉 /admin/broadcast : Push Email/Kakao Tool"]
    AdminRoot --> Audit["👉 /admin/audit : Action Audit Trail"]
    AdminRoot --> Alerts["👉 /admin/alerts : Anomaly Sensors"]
    AdminRoot --> Reports["👉 /admin/reports : User Reports Queue"]
```

---

## Absolute URL Reference Table (From Next.js App Router)

### Route `/` (Customer & Public)
- Guest pages: `/` (Landing), `/legal/privacy`, `/legal/terms`
- Quote funnel: `/quote` → `/waiting/[id]` → `/compare/[id]` → `/payment/[id]`
- Booking management: `/bookings`, `/bookings/[id]`, `/bookings/[id]/chat`
- Profile: `/mypage`, `/mypage/favorites`, `/mypage/points`, `/mypage/recurring-new`
- Support: `/cs/new`, `/review/[id]`, `/partner/[id]`

### Route `/p/` (Partner Company)
- Overview: `/p`, `/p/settings`
- Bidding: `/p/bids`, `/p/bids/[requestId]`, `/p/bids/templates`
- Schedule: `/p/schedule`, `/p/schedule/[bookingId]`, `/p/schedule/[bookingId]/chat`
- Finance & HR: `/p/settlement`, `/p/team`, `/p/team/add`, `/p/customers`, `/p/portfolio`, `/p/reviews`

### Route `/admin/` (System Control)
- Analytics: `/admin`, `/admin/analytics`, `/admin/matching`
- Finance & Users: `/admin/settlement`, `/admin/members`
- CS & Tools: `/admin/cs`, `/admin/cs/[id]`, `/admin/marketing`, `/admin/broadcast`
- Security: `/admin/settings`, `/admin/audit`, `/admin/alerts`, `/admin/reports`