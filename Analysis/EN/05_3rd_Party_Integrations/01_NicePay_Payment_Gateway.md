# NICEPAY 2.0 NATIONAL PAYMENT GATEWAY INTEGRATION

> **Overview**: The financial ingestion pipeline. NicePay operates as the exclusive external Payment Gateway processing live KRW transactions within the Korean jurisdiction.

---

## 1. HTTP INGESTION FLOW
**The Standard 3-Step Handshake:**
1. **Initiation**: The Next.js server spawns a pre-flight invoice (\`order_id\`) formatted structurally as \`ORD-[UID]-[TIMESTAMP]\`.
2. **Client Handoff**: The Client UI mounts the NicePay Web-iFrame (SDK). Upon user credential injection, the Card Provider throws an Approval Token back to the server endpoint: \`/api/payments/nicepay/callback\`.
3. **S2S Validation**: The Server receives the Token, hashes it locally using the MID Secret, and executes a Server-to-Server (S2S) blast to the NicePay endpoint. NicePay deduces the fiat money and replies with a definitive \`{"status": "PAID"}\` payload.
4. **Finalization**: System triggers \`cleaning_requests\` -> \`assigned\`, and marks \`payments\` -> \`completed\`.

---

## 2. IDEMPOTENCY ENGINE (DOUBLE-CHARGE NULLIFICATION)
Preventing multi-execution financial attacks (e.g., duplicate \"Pay\" clicks).
- **Database Locks**: The \`payments\` table utilizes strict UNIQUE constraints on both \`order_id\` and \`transaction_id\`.
- **Runtime Checks**: Within the Vercel Callback processor, logic demands: \`if (payment.status === 'completed') return false;\`. Duplicate lagging pings from the bank are natively aborted, ensuring absolute singular processing per request.

---

## 3. BUSINESS EXCEPTIONS & EDGE CONTEXTS
- **Minimum Thresholds**: Transactions bottom out at \`100 KRW\`. Should internal Coupon models decimate the invoice to 0 KRW, the Server aborts the NicePay SDK completely, forcing a purely internal "Full Auto (Free)" success transition.
- **Environment Forking**: Mobile Native App contexts utilize full URL Redirect models (bypassing popup blockers), whereas Desktop ecosystems cleanly mount Pop-up iFrames. This fork is aggressively managed at the initial UI presentation layer.
