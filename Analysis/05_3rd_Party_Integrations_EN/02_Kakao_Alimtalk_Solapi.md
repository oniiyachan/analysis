# AUTOMATED MESSAGING ENGINE (SOLAPI / KAKAO ALIMTALK)

> **Overview**: The outbound notification pipeline executing direct pushes to the Korean KakaoTalk network and fallback SMS layers, ensuring absolute notification delivery to non-active clients.

---

## 1. THE TEMPLATE ROOT PIPELINE
Solapi functions as the external Vendor bridging Server commands into the Kakao network.
Cost-effective mass messaging strictly requires **"Pre-Approved Kakao Templates"**.
CleanHi integrates exactly 5 Approved Template IDs:
1. \`TPL_MATCHING\`: Alerts Users of incoming competitive bids.
2. \`TPL_PAYMENT_SUCCESS\`: Transmits strict financial receipts post-checkout.
3. \`TPL_WORK_DONE\`: Signals job completion to the customer, encouraging 5-star review ratings.
4. \`TPL_REFUND\`: Issues transactional cancellation and fund return updates.
5. \`TPL_NOTICE\`: Macro-system alerts and critical operational notifications.

---

## 2. SERVER ACTION DISPATCH LAYER
Following any critical Stateful Mutation (Payment confirmation, Job Completion), the system sequentially fires asynchronous hooks.
- **Execution Blueprint**: Deep within the action payload lies \`await PushSolapiAlert("TPL_WORK_DONE", User_Phone_Number, JsonProps)\`. This acts as the unattached \"Fire-and-Forget\" notification runner.

---

## 3. NETWORK FAILURE MITIGATION (TRY/CATCH SURVIVABILITY)
External messaging networks (Kakao/Telecoms) frequently crash, or users input invalid phone formats.
- **Isolation Principle**: Outbound Solapi pushes are aggressively wrapped in \`try { ... } catch (error) { ... }\` blocks.
- **Graceful Degradation**: If Solapi throws an HTTP 400 (Bad Number) or HTTP 500 (Telecom Outage), the Node.js layer logs the Error Stack into \`audit_logs\` but explicitly allows the core system transaction (e.g., The Financial Checkout) to succeed flawlessly. A user with a typo in their phonenumber is not barred from paying.
