# PAGE DOCUMENT: CUSTOMER SUPPORT DISPUTE CENTER

> **Overview**: Simplified architectural documentation targeted at business stakeholders and global PMs outlining exact business objectives completely free of deep engineering buzzwords.

---

## 1. METADATA
- **Component**: Customer Support Dispute Center
- **Physical Tree Path**: `src/app/(admin)/admin/cs/page.tsx`
- **Browser Route**: `/admin/cs`

---

## 2. CORE BUSINESS INTELLIGENCE
Imagine this functionality purely as: **The "Courtroom". Where CS agents issue partial or full refunds and resolve disputes between partners and clients.**

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
- **Enforcement**: Customer Support Dispute Center mandates pristine Security isolations.
- **Mechanics**: **Cho phép thay đổi trạng thái Refund (Hoàn tiền), móc thẳng API NicePay 2.0 để nhả tiền về STK.**. It boldly overrides basic Row Level Security boundaries selectively, since typical Supabase RLS natively blocks queries not directly owned by the active user.