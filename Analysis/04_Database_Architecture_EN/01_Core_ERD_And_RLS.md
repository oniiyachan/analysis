# CORE SUPABASE DATABASE ARCHITECTURE & SECURITY (RLS)

> **Overview**: Architectural breakdown of the physical table relationships (ERD) and Row-Level Security (RLS) firewalls governing the Supabase PostgreSQL layer.

---

## 1. CORE RELATIONSHIPS (ERD TOPOLOGY)
The system rotates around a central "Matching" funnel. Below are the 5 life-blood tables:

1. **`users` (or `profiles`)**: Hard-linked (Foreign Key) to Supabase's native `auth.users`. Represents both registered and guest entities.
2. **`cleaning_requests` (The Core Job Order)**: The heart of the service marketplace.
   - Foreign Key: \`user_id\` -> \`users.id\`.
   - Lifecycle Status Enums: *pending, bidding, assigned, in_progress, completed, cancelled*.
3. **`quotes` (The Bids)**: Financial proposals injected by Sub-contractors.
   - Dual-linked: \`request_id\` -> \`cleaning_requests.id\`, and \`partner_id\` -> \`partners.id\`.
4. **`partners` (The Sub-contractors)**: The service execution companies. Divided into 3 roles (Owner, Lead, Worker) at the app-level.
5. **`payments` (The Ledger)**: Links \`quote_id\` and \`request_id\`. Tracks raw financial transfers originating from the NicePay Gateway.

---

## 2. ROW LEVEL SECURITY (RLS FIREWALLS)
Instead of enforcing data-mutations purely via Backend middlewares, the logic is codified directly at the SQL level utilizing JWT Context injection.

### 🛡️ Customer (User) Paradigms
- **Table \`cleaning_requests\`**: \`SELECT\` & \`INSERT\` operations strictly require \`auth.uid() = user_auth_id\`. Users are strictly prohibited from parsing un-owned job geometries.
- **The Guest Override**: Unregistered users executing the Quote Wizard utilize a temporary \`guest_session\`. An RLS override dictates: \`OR user_auth_id IS NULL AND session_id matches\`.

### 🛡️ Partner (Sub-contractor) Paradigms
- **Table \`quotes\`**: Partners can only \`INSERT\` or \`UPDATE\` proposals if the decoded JWT (\`auth.jwt() -> app_metadata -> partner_id\`) matches. This negates malicious competitor bid modification attempts.

### 🛡️ The Service Role Bypass (Admin Override)
- Strict RLS structurally breaks Admin dashboards (Admins do not \"own\" the cleaning jobs, yielding 0 rows).
- **The Mitigation**: Admin fetching utilizes backend calls specifically wrapped with \`createServiceClient()\`, mounting the Supabase Service Key. This bypasses RLS globally. **This function is strictly forbidden from executing outside validated \`(admin)\` route groups.**
