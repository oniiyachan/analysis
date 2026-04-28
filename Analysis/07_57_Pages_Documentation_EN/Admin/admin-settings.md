# PAGE DOCUMENT: SYSTEM MASTER SWITCHBOARD

> **Overview**: Simplified architectural documentation targeted at business stakeholders and global PMs outlining exact business objectives completely free of deep engineering buzzwords.

---

## 1. METADATA
- **Component**: System Master Switchboard
- **Physical Tree Path**: `src/app/(admin)/admin/settings/page.tsx`
- **Browser Route**: `/admin/settings`

---

## 2. CORE BUSINESS INTELLIGENCE
Imagine this functionality purely as: **The "Circuit Breaker". Modifies global commission rates, system-wide maintenance locks, and API key toggles.**

- **Impact**: Grants executive controllers frictionless GUI intervention, directly pivoting business variables without manual IT/Database queries.

---

## 3. UI/UX TOPOLOGY
- **Layout Paradigm**: Strictly favors Server Components wrapping dense Data Tables.
- **Ergonomics**: Divides the "Loading Network" tree and the "OnClick Reactivity" logic so the Vercel Main Thread never stutters during mass clicks by administrators.

---

## 4. THE AUTHENTICATED REQUEST FUNNEL
1. Admin triggers the relative Route Navigation.
2. Boundary Middleware interrogates the Next.js JWT active Session.
3. Upon strict RBAC Clearance, it executes an aggressive `createServiceClient()` Database pull to unearth data.

---

## 5. GUARDRAILS & DATA CONSTRAINTS
- **Enforcement**: System Master Switchboard mandates pristine Security isolations.
- **Mechanics**: **Dữ liệu được nạp vào RAM cache liên tiếp vì mọi dòng code đều phải hỏi Cầu Dao này.**. It boldly overrides basic Row Level Security boundaries selectively, since typical Supabase RLS natively blocks queries not directly owned by the active user.