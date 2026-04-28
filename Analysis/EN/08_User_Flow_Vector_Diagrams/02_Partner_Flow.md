# FULL SITEMAP: SUBCONTRACTOR MODULE OVERVIEW
*Coverage: Bidding Engine, Dispatch Ops, and Org Management (Total 16 Nodes)*

```mermaid
graph TD
    D(["Partner Metrics (/p)"])

    %% Bidding
    D --> B1(["Live Feeds (/p/bids)"])
    B1 --> B2(["Draft New Bid (/p/bids/[requestId])"])
    B1 --> B3(["Autofill Templates (/p/bids/templates)"])

    %% Schedule
    B2 --> S1(["Master Calendar (/p/schedule)"])
    S1 --> S2(["Micro Booking Scope (/p/schedule/[bookingId])"])
    S2 --> S3(["Client Tunnels (/p/schedule/[bookingId]/chat)"])
    
    %% CRM and Fin
    S2 --> F1(["Accountant Ledgers (/p/settlement)"])
    S2 --> C1(["Retained Base (/p/customers)"])
    S2 --> R1(["Aggregated Defamations (/p/reviews)"])

    %% HR Org
    D --> T1(["Team Roster (/p/team)"])
    T1 --> T2(["Recruit Injection (/p/team/add)"])
    D --> P1(["Company Portfolio (/p/portfolio)"])
    P1 --> P2(["Portfolio Mutation (/p/portfolio/new)"])
    
    %% System
    D -.-> SET(["Global Config (/p/settings)"])
    D -.-> NOT(["Bells & Whisles (/p/notifications)"])
```