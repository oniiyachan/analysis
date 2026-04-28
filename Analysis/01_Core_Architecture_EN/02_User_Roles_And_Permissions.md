# ROLE-BASED ACCESS CONTROL (RBAC)

> **Overview**: Hierarchical permission definitions across the ecosystem.

## 1. ADMINS (Super Admin, Ops, CS)
- Full bypass capabilities via `Service Role`. 
- Master access to financial analytics, matching overrides, and user bans.

## 2. PARTNERS (Sub-contractors)
- **Owner**: Full access to settlements, company profiles, and worker management.
- **Lead**: Can bid on jobs and assign workers to schedules.
- **Worker**: Restricted strictly to viewing assigned schedules and accessing Job Chat. Financials are hidden.

## 3. USERS (Customers)
- **Registered**: Bounded strictly to their own `user_id` rows.
- **Guest**: Granted temporal access tokens to complete request wizards up to the payment wall.