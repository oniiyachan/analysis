# PAGE: Login

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/login` (supports `?next=` redirect param) |
| Source File | `src/app/(auth)/login/page.tsx` (113 lines) |
| Allowed Roles | Public (unauthenticated) |
| Auth Required | No |
| Layout | `(auth)/layout.tsx` — centered card with brand header/footer |
| Rendering | Client Component (`"use client"`) |

## 2. FEATURES & FUNCTIONALITY
- **Email + Password Login**: `signInWithPassword` via Supabase Auth
- **React 19 useActionState**: Progressive form enhancement with `loginAction`
- **Next Redirect**: `?next=` param preserved in hidden input → redirect after success
- **Field-Level Errors**: Zod validation with per-field error display
- **Form Error Banner**: Generic auth failure message
- **Navigation Links**: "Forgot Password" → `/reset-password`, "Sign Up" → `/signup` (preserves `?next=`)
- **Suspense Boundary**: `useSearchParams()` wrapped in `<Suspense>` per Next.js 16 requirement

## 3. COMPONENT TREE
```
LoginPage (Client)
└── Suspense
    └── LoginForm (Client)
        ├── Input (email)
        ├── Input (password)
        ├── Button (submit)
        └── Link (signup, reset-password)
```

## 4. SERVER ACTIONS
| Action | File | Description |
|--------|------|-------------|
| `loginAction` | `src/lib/integrations/supabase/auth-actions.ts` | `signInWithPassword` → redirect to `next` or `/` |

## 5. DATABASE TABLES
| Table | Columns | Operation |
|-------|---------|-----------|
| `auth.users` | `email, encrypted_password` | Supabase Auth internal |
| `profiles` | `id, role` | READ (post-login role routing) |

## 6. ENVIRONMENT VARIABLES
| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anonymous key |

---

# PAGE: Sign Up (Registration)

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/signup` (supports `?next=` redirect param) |
| Source File | `src/app/(auth)/signup/page.tsx` (214 lines) |
| Allowed Roles | Public |
| Rendering | Client Component (`"use client"`) |

## 2. FEATURES & FUNCTIONALITY
- **Registration Fields**: Email, Password, Password Confirm, Name, Phone
- **Consent Checkboxes** (ADR 0002):
  - ✅ Terms of Service (required) → links to `/legal/terms`
  - ✅ Privacy Policy (required) → links to `/legal/privacy`
  - ☐ Marketing Opt-in (optional) — coupons & event notifications
- **Zod Server Validation**: All fields validated server-side with per-field error display
- **Password Rules**: Alphanumeric, minimum 8 characters
- **Consent Evidence** (Migration 24): `terms_accepted_at`, `privacy_accepted_at`, `marketing_accepted_at` timestamps stored in `profiles`
- **Next Redirect**: Post-signup redirect to `?next=` path (guest quote → payment flow)

## 3. SERVER ACTIONS
| Action | File | Description |
|--------|------|-------------|
| `signupAction` | `src/lib/integrations/supabase/auth-actions.ts` | `signUp` → INSERT `profiles` → redirect |

## 4. DATABASE TABLES
| Table | Columns | Operation |
|-------|---------|-----------|
| `auth.users` | `email, encrypted_password` | INSERT (Supabase Auth) |
| `profiles` | `id, email, name, phone, role='customer', terms_accepted_at, privacy_accepted_at, marketing_accepted_at` | INSERT (trigger or action) |

---

# PAGE: Reset Password (Request Link)

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/reset-password` |
| Source File | `src/app/(auth)/reset-password/page.tsx` (74 lines) |
| Allowed Roles | Public |
| Rendering | Client Component (`"use client"`) |

## 2. FEATURES & FUNCTIONALITY
- **Email Input Only**: User enters registered email
- **Security**: Always shows same success message regardless of email existence (prevents user enumeration)
- **Supabase `resetPasswordForEmail`**: Sends magic link email with password reset token
- **Success/Error Display**: Green success banner or red error banner

## 3. SERVER ACTIONS
| Action | File | Description |
|--------|------|-------------|
| `resetPasswordAction` | `src/lib/integrations/supabase/auth-actions.ts` | `resetPasswordForEmail` → sends email |

## 4. EXTERNAL INTEGRATIONS
| Service | Purpose |
|---------|---------|
| **Supabase Auth** | Password reset email delivery |
| **Resend** (optional) | Custom SMTP for branded email template |

---

# PAGE: Update Password (Set New Password)

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/update-password` |
| Source File | `src/app/(auth)/update-password/page.tsx` (71 lines) |
| Allowed Roles | Authenticated (via reset email magic link token) |
| Rendering | Client Component (`"use client"`) |

## 2. FEATURES & FUNCTIONALITY
- **Entry Point**: User arrives via magic link from reset email → Supabase session auto-injected
- **Two Fields**: New Password + Confirm Password
- **Supabase `updateUser`**: Updates password in `auth.users`
- **Success Redirect**: → `/` (home)

## 3. SERVER ACTIONS
| Action | File | Description |
|--------|------|-------------|
| `updatePasswordAction` | `src/lib/integrations/supabase/auth-actions.ts` | `updateUser({ password })` → redirect `/` |

---

# PAGE: Terms of Service (Legal)

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/legal/terms` |
| Source File | `src/app/legal/terms/page.tsx` (159 lines) |
| Allowed Roles | Public |
| Rendering | Server Component (static) |

## 2. FEATURES & FUNCTIONALITY
- **11 Legal Articles** (Korean e-commerce law compliant):
  1. Purpose
  2. Definitions (User, Partner, Reverse Auction, Platform Fee 15%)
  3. Terms Effectiveness & Amendments (7-day / 30-day notice)
  4. Membership & Contract Formation
  5. Service Provision
  6. Payment & Refund Policy (24h full refund, 10% fee after)
  7. Partner Obligations (warning → 3-day suspension → termination at 3 strikes)
  8. Settlement (D+1 next business day)
  9. Dispute Resolution (48h window, max ₩100M insurance)
  10. Liability Exemptions (force majeure, external transactions)
  11. Governing Law (Seoul Central District Court, Korean law)
- **Version Footer**: v1 MVP draft (2026-04-21), Phase 3 legal review pending
- **SEO Metadata**: Title + description for search engines

## 3. DATABASE REFERENCES
- `profiles.terms_accepted_at`: Timestamp when user accepted this version at signup

---

# PAGE: Privacy Policy (Legal)

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/legal/privacy` |
| Source File | `src/app/legal/privacy/page.tsx` (136 lines) |
| Allowed Roles | Public |
| Rendering | Server Component (static) |

## 2. FEATURES & FUNCTIONALITY
- **9 Privacy Sections** (Korean Personal Information Protection Act compliant):
  1. Overview
  2. Collected Items: Required (email, password hash, name, phone) / Service (address, photos, payment info) / Auto (IP, cookies, logs) / Optional (marketing consent)
  3. Collection & Use Purpose (matching, payment, analytics, marketing)
  4. Retention Periods: Contracts 5yr / Payment 5yr / Complaints 3yr / Login IP 3mo
  5. Third-Party Provision (only with consent or legal basis)
  6. Data Processors:
     - **Supabase Inc.** — DB/Auth/Storage (Tokyo region)
     - **Vercel Inc.** — Web hosting (Seoul region)
     - **NicePay** — Payment processing
     - **Resend Inc.** — Transactional email
  7. User Rights (access, modify, delete, processing suspension)
  8. Cookies & Auto-Collection
  9. Data Protection Officer: Higher Inc. (주식회사 하여)
- **Version Footer**: v1 MVP draft (2026-04-21), Phase 3 legal review pending
- **SEO Metadata**: Title + description

## 3. DATABASE REFERENCES
- `profiles.privacy_accepted_at`: Timestamp when user accepted this version at signup
