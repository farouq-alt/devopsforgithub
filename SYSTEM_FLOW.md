# System Flow Diagram

## 🔄 Complete Order Lifecycle

```
┌─────────────────────────────────────────────────────────────────┐
│                         ADMIN SETUP                              │
│                                                                   │
│  1. Generate Signup Codes                                        │
│     ├─> SC-XXXXX-XXXX                                           │
│     ├─> SC-YYYYY-YYYY                                           │
│     └─> SC-ZZZZZ-ZZZZ                                           │
│                                                                   │
│  2. Distribute Codes Externally                                  │
│     ├─> WhatsApp                                                │
│     ├─> Email                                                   │
│     └─> Printed Cards                                           │
│                                                                   │
│  3. Enable Ordering                                              │
│     └─> Toggle "Ordering Open"                                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      STUDENT SIGNUP                              │
│                                                                   │
│  1. Receive Code (External)                                      │
│     └─> SC-XXXXX-XXXX                                           │
│                                                                   │
│  2. Visit Platform                                               │
│     └─> Enter code + name                                       │
│                                                                   │
│  3. Code Verification                                            │
│     ├─> Valid? → Create Account                                 │
│     ├─> Used? → Reject                                          │
│     └─> Invalid? → Reject                                       │
│                                                                   │
│  4. Account Created                                              │
│     └─> Balance: 0 MAD                                          │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    BALANCE CREDITING                             │
│                                                                   │
│  Student → Pays Offline                                          │
│     ├─> Cash to admin                                           │
│     ├─> Bank transfer                                           │
│     └─> Mobile money                                            │
│                                                                   │
│  Admin → Credits Account                                         │
│     ├─> Enter amount: 150 MAD                                   │
│     ├─> Add note: "Monthly subscription"                        │
│     └─> Confirm credit                                          │
│                                                                   │
│  Student → Balance Updated                                       │
│     └─> Balance: 150 MAD                                        │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      ORDER PLACEMENT                             │
│                                                                   │
│  1. Student Views Break                                          │
│     └─> Countdown: 25 minutes remaining                         │
│                                                                   │
│  2. Browse Shops                                                 │
│     ├─> Tajine Express (Open, 15 spots left)                   │
│     ├─> Couscous Corner (Open, 20 spots left)                  │
│     └─> Pastilla Palace (Full)                                 │
│                                                                   │
│  3. Select Shop & Menu                                           │
│     └─> Tajine Express                                          │
│         ├─> Chicken Tajine (45 MAD)                            │
│         └─> Lamb Tajine (55 MAD)                               │
│                                                                   │
│  4. Add to Cart                                                  │
│     ├─> 1x Chicken Tajine                                       │
│     └─> 1x Lamb Tajine                                          │
│                                                                   │
│  5. Add Delivery Details                                         │
│     ├─> Building: A                                             │
│     ├─> Floor: 3                                                │
│     ├─> Room: 305                                               │
│     └─> Note: "Call when arriving"                             │
│                                                                   │
│  6. Review Order                                                 │
│     ├─> Subtotal: 100 MAD                                       │
│     ├─> Service Fee: 1.5 MAD                                    │
│     ├─> Delivery Fee: 5 MAD                                     │
│     ├─> Total: 106.5 MAD                                        │
│     └─> Balance: 150 MAD ✓                                      │
│                                                                   │
│  7. Place Order                                                  │
│     ├─> Generate Pickup Code: ABC123                           │
│     ├─> Deduct Balance: 106.5 MAD                              │
│     ├─> New Balance: 43.5 MAD                                  │
│     └─> Status: QUEUED                                          │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    SHOP PREPARATION                              │
│                                                                   │
│  1. Shop Views Batch                                             │
│     └─> Cutoff: 10 minutes remaining                           │
│                                                                   │
│  2. Aggregated Items                                             │
│     ├─> 5x Chicken Tajine                                       │
│     ├─> 3x Lamb Tajine                                          │
│     └─> 2x Vegetable Tajine                                     │
│     Total: 10 orders                                            │
│                                                                   │
│  3. Start Preparation                                            │
│     └─> Click "Mark as Preparing"                              │
│         └─> All orders → PREPARING                              │
│                                                                   │
│  4. Complete Preparation                                         │
│     └─> Click "Mark as Ready"                                   │
│         └─> All orders → READY                                  │
│                                                                   │
│  Privacy: Shop sees only items, not student names               │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      RUNNER PICKUP                               │
│                                                                   │
│  1. Runner Views Ready Orders                                    │
│     └─> Tajine Express: 10 orders ready                        │
│                                                                   │
│  2. View Order Details                                           │
│     ├─> Pickup Code: ABC123                                     │
│     ├─> Items: 1x Chicken, 1x Lamb                             │
│     └─> Deliver to: Building A, Floor 3, Room 305              │
│                                                                   │
│  3. Verify & Pickup                                              │
│     ├─> Match code with order                                   │
│     └─> Click "Mark as Picked Up"                              │
│         └─> Order → PICKED UP                                   │
│                                                                   │
│  Privacy: Runner sees codes & locations, not prices             │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                        DELIVERY                                  │
│                                                                   │
│  1. Runner Navigates                                             │
│     └─> To: Building A, Floor 3, Room 305                      │
│                                                                   │
│  2. Student Verification                                         │
│     ├─> Student shows: ABC123                                   │
│     └─> Runner verifies code                                    │
│                                                                   │
│  3. Complete Delivery                                            │
│     └─> Click "Mark as Delivered"                              │
│         └─> Order → DELIVERED                                   │
│                                                                   │
│  4. Student Confirmation                                         │
│     └─> Order status updated in real-time                      │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    ADMIN MONITORING                              │
│                                                                   │
│  Statistics Updated:                                             │
│  ├─> Total Orders: +1                                           │
│  ├─> Revenue: +106.5 MAD                                        │
│  ├─> Active Orders: -1                                          │
│  └─> Completed Orders: +1                                       │
│                                                                   │
│  Transaction Log:                                                │
│  └─> Student balance: 150 → 43.5 MAD                           │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔐 Authentication Flow

```
┌──────────────┐
│   New User   │
└──────┬───────┘
       │
       ├─> Has Signup Code?
       │   ├─> YES → Enter Code
       │   │         ├─> Valid & Unused? → Create Account
       │   │         ├─> Already Used? → Error
       │   │         └─> Invalid? → Error
       │   │
       │   └─> NO → Cannot Signup (Students only)
       │
       ├─> Shop/Runner/Admin?
       │   └─> Enter Name → Login (Demo mode)
       │
       └─> Existing User?
           └─> Session Restored (if valid)
```

---

## 💰 Balance Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      BALANCE LIFECYCLE                       │
└─────────────────────────────────────────────────────────────┘

Student Account Created
    └─> Balance: 0 MAD
         │
         ├─> Student Pays Offline (Cash/Transfer)
         │   └─> Admin Credits Account
         │       └─> Balance: +150 MAD
         │           └─> Transaction: CREDIT
         │
         ├─> Student Places Order
         │   └─> Balance: -106.5 MAD
         │       └─> Transaction: DEBIT
         │
         ├─> Student Cancels Order (if Queued)
         │   └─> Balance: +106.5 MAD
         │       └─> Transaction: REFUND
         │
         └─> Balance History
             ├─> [CREDIT] +150 MAD - "Monthly subscription"
             ├─> [DEBIT] -106.5 MAD - "Order ABC123"
             └─> [REFUND] +106.5 MAD - "Cancelled ABC123"
```

---

## 📊 Order Status Progression

```
┌─────────────────────────────────────────────────────────────┐
│                    ORDER STATUS FLOW                         │
└─────────────────────────────────────────────────────────────┘

    QUEUED
      │
      │ Shop clicks "Mark as Preparing"
      ↓
   PREPARING
      │
      │ Shop clicks "Mark as Ready"
      ↓
     READY
      │
      │ Runner clicks "Mark as Picked Up"
      ↓
  PICKED UP
      │
      │ Runner clicks "Mark as Delivered"
      ↓
  DELIVERED ✓

Alternative Paths:
    QUEUED → [Student cancels] → CANCELLED
    DELIVERED → [No pickup] → NO-SHOW
```

---

## 🏪 Shop Batch Processing

```
┌─────────────────────────────────────────────────────────────┐
│                     BATCH AGGREGATION                        │
└─────────────────────────────────────────────────────────────┘

Individual Orders:
├─> Order 1: 1x Chicken Tajine, 1x Lamb Tajine
├─> Order 2: 2x Chicken Tajine
├─> Order 3: 1x Vegetable Tajine
├─> Order 4: 1x Chicken Tajine, 1x Vegetable Tajine
└─> Order 5: 1x Lamb Tajine

Aggregated View (Shop Sees):
├─> 4x Chicken Tajine
├─> 2x Lamb Tajine
└─> 2x Vegetable Tajine
Total: 5 orders, 8 items

Privacy: No student names, just quantities
```

---

## 🔒 Privacy Model

```
┌─────────────────────────────────────────────────────────────┐
│                    DATA VISIBILITY                           │
└─────────────────────────────────────────────────────────────┘

Order Data:
├─> Order ID: ORD-123456
├─> Student ID: student_789
├─> Student Name: "Sarah"
├─> Items: [Chicken Tajine, Lamb Tajine]
├─> Pickup Code: ABC123
├─> Delivery: Building A, Floor 3, Room 305
├─> Total: 106.5 MAD
└─> Status: QUEUED

Who Sees What:

STUDENT (Sarah):
├─> ✓ Own orders
├─> ✓ Pickup code
├─> ✓ Status
├─> ✓ Total price
└─> ✓ Delivery location

SHOP (Tajine Express):
├─> ✓ Items & quantities (aggregated)
├─> ✓ Order count
├─> ✗ Student names
├─> ✗ Pickup codes
├─> ✗ Delivery locations
└─> ✗ Individual prices

RUNNER (Ahmed):
├─> ✓ Pickup codes
├─> ✓ Delivery locations
├─> ✓ Items (for verification)
├─> ✗ Student names
├─> ✗ Prices
└─> ✗ Payment details

ADMIN:
├─> ✓ Everything
├─> ✓ All orders
├─> ✓ All users
├─> ✓ All transactions
└─> ✓ Full visibility
```

---

## ⏱️ Time-Based Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      BREAK TIMELINE                          │
└─────────────────────────────────────────────────────────────┘

11:30 AM - Break Starts
    └─> Ordering Opens
        └─> Students can browse & order

12:00 PM - 30 minutes remaining
    └─> Peak ordering time
        └─> Shops receive orders

12:15 PM - 15 minutes remaining
    └─> Last-minute orders
        └─> Shops start preparing

12:30 PM - CUTOFF
    └─> Ordering Closes
        └─> No new orders accepted
            └─> Shops finalize batches

12:35 PM - Preparation complete
    └─> Shops mark batches as READY
        └─> Runners start pickups

12:40 PM - Deliveries begin
    └─> Runners deliver to locations
        └─> Students receive orders

1:00 PM - Break Ends
    └─> Most deliveries complete
        └─> System ready for next break
```

---

## 🔄 Error Handling Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    ERROR SCENARIOS                           │
└─────────────────────────────────────────────────────────────┘

Insufficient Balance:
    Student tries to order
    └─> Check balance
        └─> Balance < Total?
            └─> Block order
                └─> Show error message
                    └─> Suggest contacting admin

Code Already Used:
    Student tries to signup
    └─> Verify code
        └─> Code used?
            └─> Reject signup
                └─> Show error message
                    └─> Suggest getting new code

Shop at Capacity:
    Student selects shop
    └─> Check capacity
        └─> Orders >= Max?
            └─> Disable selection
                └─> Show "Full" badge
                    └─> Suggest other shops

After Cutoff:
    Student tries to order
    └─> Check time
        └─> Past cutoff?
            └─> Block order
                └─> Show "Closed" message
                    └─> Show next break time
```

---

## 📱 Multi-Device Sync

```
┌─────────────────────────────────────────────────────────────┐
│                    STATE MANAGEMENT                          │
└─────────────────────────────────────────────────────────────┘

Device 1 (Student Phone):
    └─> Places order
        └─> Redux state updated
            └─> LocalStorage saved
                └─> Order: QUEUED

Device 2 (Shop Tablet):
    └─> Receives order
        └─> Redux state updated
            └─> Shows in batch
                └─> Marks as PREPARING

Device 3 (Runner Phone):
    └─> Sees ready order
        └─> Redux state updated
            └─> Picks up order
                └─> Order: PICKED UP

Device 1 (Student Phone):
    └─> Refreshes page
        └─> LocalStorage restored
            └─> Redux state synced
                └─> Shows: PICKED UP

Note: In production, use WebSocket for real-time sync
```

---

## 🎯 Success Paths

```
┌─────────────────────────────────────────────────────────────┐
│                    HAPPY PATH                                │
└─────────────────────────────────────────────────────────────┘

1. Admin generates code → ✓ Code created
2. Student receives code → ✓ Code valid
3. Student signs up → ✓ Account created
4. Admin credits balance → ✓ Balance updated
5. Student places order → ✓ Order queued
6. Shop prepares order → ✓ Order ready
7. Runner picks up → ✓ Order in transit
8. Runner delivers → ✓ Order delivered
9. Student receives food → ✓ Happy customer
10. Admin sees revenue → ✓ Business success

Result: Everyone wins! 🎉
```

This visual flow helps understand how all components work together!
