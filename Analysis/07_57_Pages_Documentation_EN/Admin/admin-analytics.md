# PAGE DOCUMENT: FINANCIAL DASHBOARD

> **Overview**: Simplified architectural documentation targeted at business stakeholders and global PMs outlining exact business objectives completely free of deep engineering buzzwords.

---

## 1. METADATA
- **Component**: Financial Dashboard
- **Physical Tree Path**: `src/app/(admin)/admin/analytics/page.tsx`
- **Browser Route**: `/admin/analytics`

---

## 2. CORE BUSINESS INTELLIGENCE
Imagine this functionality purely as: **The "Revenue Radar" for management to track daily processing volumes and user drop-off funnels.**

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
- **Enforcement**: Financial Dashboard mandates pristine Security isolations.
- **Mechanics**: **Tính toán biểu đồ cực nặng, phải chọc thủng RLS để đứng trên vạn vật nhìn xuống.**. It boldly overrides basic Row Level Security boundaries selectively, since typical Supabase RLS natively blocks queries not directly owned by the active user.