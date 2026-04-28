const fs = require('fs');
const path = require('path');

const dir1 = path.resolve('C:/Users/USER/Desktop/CleanHi/Analysis/01_Core_Architecture_EN');
const dir2 = path.resolve('C:/Users/USER/Desktop/CleanHi/Analysis/02_Business_Workflows_EN');
const dir3 = path.resolve('C:/Users/USER/Desktop/CleanHi/Analysis/03_Realtime_Systems_EN');

const files = [
    {
        dir: dir1,
        name: '01_Overview_And_Structure.md',
        content: `# ARCHITECTURE OVERVIEW & DIRECTORY STRUCTURE\n\n> **Overview**: High-level analysis of the CleanHi project's architecture, tech stack, and primary directory layout.\n\n## 1. TECH STACK\n- **Framework**: Next.js 14/16 (App Router paradigm)\n- **Database**: Supabase PostgreSQL with RLS (Row Level Security)\n- **Styling**: Tailwind CSS with custom Design System tokens\n\n## 2. PROJECT DIRECTORY TOPOLOGY\n- \`src/app/(admin)\`: Internal Operations dashboards.\n- \`src/app/(partner)\`: Sub-contractor portals and bidding interfaces.\n- \`src/app/(user)\`: Customer-facing request wizards and payment gateways.\n- \`src/core/actions\`: Pure Server Actions handling DB mutations.\n- \`src/components\`: Reusable UI elements strictly split into Server/Client chunks.`
    },
    {
        dir: dir1,
        name: '02_User_Roles_And_Permissions.md',
        content: `# ROLE-BASED ACCESS CONTROL (RBAC)\n\n> **Overview**: Hierarchical permission definitions across the ecosystem.\n\n## 1. ADMINS (Super Admin, Ops, CS)\n- Full bypass capabilities via \`Service Role\`. \n- Master access to financial analytics, matching overrides, and user bans.\n\n## 2. PARTNERS (Sub-contractors)\n- **Owner**: Full access to settlements, company profiles, and worker management.\n- **Lead**: Can bid on jobs and assign workers to schedules.\n- **Worker**: Restricted strictly to viewing assigned schedules and accessing Job Chat. Financials are hidden.\n\n## 3. USERS (Customers)\n- **Registered**: Bounded strictly to their own \`user_id\` rows.\n- **Guest**: Granted temporal access tokens to complete request wizards up to the payment wall.`
    },
    {
        dir: dir1,
        name: '03_Backend_Evaluation_And_Estimation.md',
        content: `# BACKEND EVALUATION & EFFORT ESTIMATION\n\n> **Overview**: Technical readiness audit of the current backend structure.\n\n## 1. CURRENT STATE\n- Database schemas and relationships (ERD) are 95% finalized.\n- Row Level Security (RLS) policies are active and aggressively mitigating unauthorized cross-tenant data leaks.\n\n## 2. REMAINING EFFORTS\n- **Micro-optimizations**: Adjusting pagination limits on heavy analytical queries in the Admin portal.\n- **Testing**: Expanding Jest unit test coverage over the payment Idempotency matrix.\n- **Deployment**: Verifying Vercel Cron structural integrity on production mimesis environments.`
    },
    {
        dir: dir1,
        name: '04_Pages_Structure_Diagram.md',
        content: `# 57-PAGE ARCHITECTURE TREE\n\n> **Overview**: The complete mapping of all routable endpoints.\n\n- **Admin Portal**: 17 pages (Analytics, Notifications, Settlements, etc.)\n- **Partner Portal**: 16 pages (Bids, Schedules, Team Management, etc.)\n- **User Portal**: 18 pages (Quote Wizard, Waiting Room, Bookings, etc.)\n- **Auth & Miscs**: 6 pages (Login, Signup, Recovery, Legals)`
    },
    {
        dir: dir1,
        name: '05_Background_Processes_CronJobs.md',
        content: `# BACKGROUND PROCESSES & CRON JOBS\n\n> **Overview**: Automated recurring tasks executing without human intervention.\n\n## 1. EXECUTION ENGINE\nDeployed via Vercel Cron executing secure HTTP requests toward \`api/cron/...\` endpoints. Authenticated exclusively via internal \`CRON_SECRET\` headers.\n\n## 2. THE 5 CORE MANIFESTOS\n1. **No-Show Detection**: Flags \`assigned\` requests missing check-in timestamps after scheduled start limits.\n2. **Orphan Payments**: Automatically voids \`pending\` rows idling beyond 10 hours.\n3. **Abandoned Quotes**: Cancels empty bidding rooms exceeding the 24h limit, triggering apology SMS flows.\n4. **Critical Refund Alarms**: Alerts ops if a partner's refund tally breaches the 15% threshold.\n5. **Settlement Reminders**: Flags pending finalized jobs missing accounting payouts from the prior week.`
    },
    {
        dir: dir1,
        name: '06_Frontend_Architecture_Nextjs.md',
        content: `# FRONTEND RENDERING ARCHITECTURE (NEXT.JS)\n\n> **Overview**: Layout paradigms, caching, and client/server chunking.\n\n## 1. ROUTE GROUPS & LAYOUTS\n- Physical separation utilizing \`(admin)\`, \`(partner)\`, \`(user)\` root nodes ensuring CSS and Layout isolation without polluting the URL strings.\n- Enforced \`<ErrorBoundary>\` and \`<Suspense>\` boundaries at the layout roots.\n\n## 2. RENDERING PHILOSOPHY\n- **React Server Components (RSC)** default strictly for 90% of nodes. Emits zero JS payload to the browser, maximizing SEO and speed.\n- **'"use client"' directives**: Highly localized to interactive leaf nodes (buttons, text inputs, websockets).\n\n## 3. SERVER ACTIONS MUTATION\n- Legacy \`fetch()\` API calls deprecated. Forms interact directly with Node backend via asynchronous Action functions, slashing intermediate latency.`
    },
    {
        dir: dir2,
        name: '01_Request_And_Bidding.md',
        content: `# BUSINESS WORKFLOW: REQUEST & LIVE BIDDING\n\n> **Overview**: The primary conversion funnel translating user cleaning intents into competitive subcontractor clashes.\n\n## 1. THE WIZARD (Quote Setup)\nAn 8-step frictional-less form collecting dimensions, services, and locations. Maintains state in memory before executing a unified DB \`INSERT\`.\n\n## 2. THE ARENA (Live Bidding)\nPartners within geospatial boundaries receive silent push notifications. They submit competitive \`quotes\` causing the Customer's waiting room UI to live-update via WebSockets.\n\n## 3. THE SHOWDOWN (Comparison)\nUsers compare up to 5 finalized bids side-by-side evaluating pricing against Partner Ratings and Review aggregates.`
    },
    {
        dir: dir2,
        name: '02_Booking_And_Payment.md',
        content: `# BUSINESS WORKFLOW: BOOKING & TRANSACTION\n\n> **Overview**: The financial transfer phase.\n\n## 1. THE CHECKOUT (NicePay Gateway)\nUsers inject coupon modifiers onto the winning bid. The payload routes to NicePay SDK.\n\n## 2. TRANSACTION INTEGRITY\nAggressive Idempotency locks on the \`order_id\` prevent double-charging users during network lag or duplicate callback HTTP hooks.\n\n## 3. FULFILLMENT\nPost-payment, the request transitions to \`assigned\`. The Partner’s calendar syncs the new block.`
    },
    {
        dir: dir2,
        name: '03_Admin_And_Customer_Service.md',
        content: `# BUSINESS WORKFLOW: ADMIN & DISPUTE RESOLUTION\n\n> **Overview**: Internal corporate governance and damage control.\n\n## 1. KANBAN DISPATCH\nAdmins monitor un-matched orders. They reserve the authority to forcefully assign high-priority \"orphan\" cleanings directly to premium Partners.\n\n## 2. DISPUTE COURT\nUsers flagging sub-par cleanings trigger CS tickets. Admins hold powers to issue partial or complete NicePay \`Refunds\`, subsequently debiting the Partner's future settlement payloads.\n\n## 3. PENAL MATRIX\nPartners generating excessive refunds or abusive chat behavior face forced Account Suspensions via the \`Members\` dashboard modifying Supabase Auth states directly.`
    },
    {
        dir: dir3,
        name: '01_Realtime_Overview.md',
        content: `# REALTIME ARCHITECTURE TOPOLOGY\n\n> **Overview**: The implementation logic enabling WebSocket-driven zero-latency web updates.\n\n## THE 4 PILLARS OF REALTIME\n1. **Live Chat**: Sub-second text exchanges between Cleaners and Buyers.\n2. **Notification Bells**: Instantary alerts for UI badges.\n3. **Admin Kanban**: Live-shifting cards in the Ops dispatch board.\n4. **Bidding Waiting Room**: The dynamic 24-hr countdown pumping live quote cards to the user.`
    },
    {
        dir: dir3,
        name: '02_Live_Chat.md',
        content: `# REALTIME ANALYSIS: IN-APP CHAT\n\n> **Core Engine**: \`use-chat-realtime.ts\`\n\n## EXECUTION MODEL\n- Subscribes to \`postgres_changes\` specifically for \`INSERT\` events on the \`chat_messages\` table.\n- **Traffic Optimization**: Employs rigorous \`filter=room_id=eq.[ID]\` arguments ensuring mobile clients do not download extraneous data streams.\n- **Render Paradigm**: Directly pushes incoming payloads into the Client State array to bypass UI freezing, guaranteeing 0ms latency perception.`
    },
    {
        dir: dir3,
        name: '03_New_Notifications.md',
        content: `# REALTIME ANALYSIS: NOTIFICATION BELL\n\n> **Core Engine**: \`use-notifications-realtime.ts\`\n\n## EXECUTION MODEL\n- Bound to the \`notifications\` table filtered by \`user_id\`.\n- **Render Paradigm**: Unlike Chat, this triggers a \`router.refresh()\`. \n- **Why?**: Forces the Server to securely recalculate \"Unread Counts\" using pristine secure execution nodes, completely centralizing logic to avoid client-side spoofing.`
    },
    {
        dir: dir3,
        name: '04_Admin_Kanban.md',
        content: `# REALTIME ANALYSIS: ADMIN KANBAN\n\n> **Core Engine**: \`use-matching-realtime.ts\`\n\n## EXECUTION MODEL\n- Tracks dual-tables: both \`cleaning_requests\` (for Status mutations) and \`quotes\` (for bid counts).\n- Requires no spatial filters. Broadly listens to the entire ecosystem due to its macro-Administrative scope.\n- Protected strictly by Administrative RLS bounds dropping malicious socket hijack attempts.`
    },
    {
        dir: dir3,
        name: '05_Customer_Waiting_For_Quotes.md',
        content: `# REALTIME ANALYSIS: CUSTOMER WAITING ROOM\n\n> **Core Engine**: \`waiting-client.tsx\`\n\n## EXECUTION MODEL\n- Orchestrates an internalized JS interval timer (T-24h).\n- Reactively listens to \`quotes\` INSERTS.\n- **The Clever Join Fetch**: When an isolated Quote INSERT rings the socket, the client pauses, secretly pings the DB using a deep \`SELECT partners(name, rating)\` query to attach the Company Avatar onto the financial payload before smoothly mounting it into the visual HTML DOM.\n`
    }
];

files.forEach(f => {
    fs.writeFileSync(path.join(f.dir, f.name), f.content.trim());
});

console.log('Phase 5.2 Scripts Translated to EN Successfully!');
