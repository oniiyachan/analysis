# FULL SITEMAP: ADMIN SUPREME CONTROLS
*Coverage: Aggregation, Legal, Governance logic grids (Total 17 Nodes)*

```mermaid
graph TD
    A(["Root Core Control (/admin)"])

    %% Dispatch & Fin
    A --> F1(["Visual KPI Radars (/admin/analytics)"])
    F1 --> D1(["Master Kanban Drag-Drop (/admin/matching)"])
    D1 --> F2(["NicePay Webhooks (/admin/transactions)"])
    F2 --> F3(["Wire Transfer Locks (/admin/settlement)"])

    %% CS & Reports
    A --> D2(["CS Dispute Floor (/admin/cs)"])
    D2 --> D3(["Gavel & Refunds (/admin/cs/[id])"])
    D3 --> R3(["Report Pipelines (/admin/reports)"])
    R3 --> R4(["Judgment Execution (/admin/reports/[id])"])
    
    %% Overrides & Audits
    A --> R2(["Hard-coded Trace Audits (/admin/audit)"])
    R2 --> R1(["Anomaly AI Sensors (/admin/alerts)"])
    R2 --> R5(["Shadow-Ban Reviews (/admin/reviews)"])

    %% Global Sets
    A --> M3(["God-Mode Auth Table (/admin/members)"])
    A --> M2(["Coupon Overrides (/admin/marketing)"])
    A -.-> M1(["FCM Push Loudspeaker (/admin/broadcast)"])
    A -.-> S1(["Global Maintenance Switches (/admin/settings)"])
    A -.-> N1(["Root Bell Inbox (/admin/notifications)"])
```