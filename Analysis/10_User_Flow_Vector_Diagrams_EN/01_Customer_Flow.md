# FULL SITEMAP: CUSTOMER JOURNEY & PUBLIC GATES
*Coverage: 18 User Module Nodes + 6 Auth/Legal Nodes (Total 24 Nodes)*

```mermaid
graph TD
    subgraph Discovery [Navigation & Public Discovery]
        H(["Home Landing (/)"]) --> Q(["Wizard Request (/quote)"])
        H --> P1(["Vendor Feed (/partner)"])
        P1 --> P2(["Vendor Portfolio (/partner/[id])"])
    end

    subgraph Core_Funnel [The Financial Funnel]
        Q -->|Submit| W(["Live Bidding Wait (/waiting/[id])"])
        W -->|Received 5| C(["Compare Matrix (/compare/[id])"])
        C -->|Winner Selection| P(["NicePay Mount (/payment/[id])"])
        P -->|Cleared| B1(["My Bookings (/bookings)"])
        B1 --> B2(["Booking State (/bookings/[id])"])
        B2 --> B3(["Websocket Chat (/bookings/[id]/chat)"])
        B2 --> R(["Write Review (/review/[id])"])
    end

    subgraph My_Page [User Preferences]
        M1(["Mypage Dashboard (/mypage)"])
        M2(["Reward Points (/mypage/points)"])
        M3(["Saved Vendors (/mypage/favorites)"])
        M4(["Recurring Setups (/mypage/recurring)"])
        M5(["New Recurring (/mypage/recurring-new)"])
        N1(["Notifications List (/notifications)"])
        CS(["Create CS Ticket (/cs/new)"])
    end

    subgraph Auth_Legal [System Protection]
        L1(["Sign In (/login)"])
        L2(["Register (/signup)"])
        L3(["Recovery (/reset-password)"])
        L4(["Terms (/terms)"])
        L5(["Privacy (/privacy)"])
        L6(["Fallback (/404)"])
    end

    L1 --> H
    H --> M1
    M1 -.-> M2 & M3 & M4
    M4 -.-> M5
```