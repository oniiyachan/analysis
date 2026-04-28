# PAGE: Landing / Home

## 1. ROUTING & ACCESS
| Key | Value |
|-----|-------|
| URL | `/` |
| Source File | `src/app/(user)/page.tsx` (568 lines) |
| Allowed Roles | Public (Anyone — no login required) |
| Auth Required | No |
| Layout | `(user)/layout.tsx` |
| Rendering | Server Component (RSC) — zero client JS |

## 2. FEATURES & FUNCTIONALITY
- **Hero Section**: Full-width banner with CTA "30초 견적 받기", animated interior photo with hover tilt
- **Live Stats Counter**: 3 cards — 총 견적 12,847 / 파트너 847 / 평점 4.8
- **Service Category Grid**: 5 clickable image cards (가정/이사/입주/특수/정기) → `/quote?category={id}`
- **Value Propositions Bento Grid**: 4-card layout (Partner Verification / 100% Guarantee / Transparent Pricing / Eco Care)
- **How It Works**: 3-step vertical guide with timeline connector
- **Customer Reviews**: Static 3-card grid (interactive carousel planned Day 5)
- **Trust Badges**: 4 icons (Background Check / Insurance / Escrow / Satisfaction)
- **Partner Recruitment CTA**: Dark banner linking to `/partner`
- **Legal Footer**: Company info from `COMPANY` config (CEO, business number, address, ecommerce)

## 3. COMPONENT TREE
```
LandingPage (Server)
├── Image (next/image) × 8
├── Link (next/link) × 12
└── COMPANY config (footer)
```
All rendering is Server-side. Zero `"use client"` directives.

## 4. SERVER ACTIONS & API
| Action | File | Description |
|--------|------|-------------|
| `getCurrentUser()` | `src/lib/auth/current-user.ts` | Check auth session for conditional CTA text |

## 5. DATABASE TABLES
No direct database queries. Static marketing page.

## 6. REALTIME SUBSCRIPTIONS
None.

## 7. ENVIRONMENT VARIABLES
| Variable | Required | Purpose |
|----------|----------|---------|
| `COMPANY_LEGAL_NAME` | Optional | Override footer legal name |
| `COMPANY_CEO` | Optional | Override CEO name |
| `COMPANY_BUSINESS_NUMBER` | Optional | Business registration number |
| `COMPANY_ECOMMERCE_NUMBER` | Optional | E-commerce license number |
| `COMPANY_ADDRESS` | Optional | Company address |
| `COMPANY_PHONE` | Optional | CS phone |
| `COMPANY_EMAIL` | Optional | CS email |

## 8. RLS POLICIES
No database access — no RLS involved.

## 9. EXTERNAL INTEGRATIONS
None.
