# Demo Script - School Food Ordering Platform

Use this script to demonstrate all key features to stakeholders.

## 🎬 Demo Flow (15 minutes)

### Scene 1: Admin Setup (3 minutes)

**Narrator**: "Let's start by setting up the system as an administrator."

1. **Login as Admin**
   - Select "Admin" role
   - Enter name: "Admin Demo"
   - Click Continue

2. **Enable Ordering**
   - Show the "Ordering Closed" button
   - Click to toggle to "Ordering Open"
   - Explain: "This controls whether students can place orders"

3. **Generate Signup Codes**
   - Navigate to "Signup Codes" tab
   - Click "Generate New Code" 3 times
   - Show the code table with status
   - Copy one unused code
   - Explain: "These codes are distributed to students via WhatsApp, email, or printed cards"

4. **View Statistics**
   - Show total orders, active orders, revenue, no-shows
   - Explain: "Admin has full visibility of platform performance"

5. **Credit Balance**
   - Navigate to "Credit Balance" tab
   - Enter amount: 150
   - Enter note: "Monthly subscription - Demo"
   - Click "Credit Balance"
   - Explain: "Students pay offline, admin credits their account manually"

---

### Scene 2: Student Signup & Ordering (5 minutes)

**Narrator**: "Now let's see the student experience."

1. **Logout and Signup**
   - Click Logout
   - Select "Student" role
   - Paste the signup code
   - Enter name: "Sarah Student"
   - Click Continue
   - Explain: "Each code can only be used once"

2. **View Dashboard**
   - Show balance: 150 MAD
   - Show countdown timer
   - Explain: "Students see their balance and time remaining to order"

3. **Browse Shops**
   - Show available shops
   - Point out: Open/Closed status, spots left, cutoff times
   - Click on "Tajine Express"
   - Click "View Menu"

4. **Add to Cart**
   - Add "Chicken Tajine" (45 MAD)
   - Add "Lamb Tajine" (55 MAD)
   - Click cart icon (bottom nav)
   - Show cart with quantities
   - Adjust quantity using +/- buttons

5. **Add Delivery Details**
   - Click "Add Delivery Details"
   - Fill in:
     - Building: "Building A"
     - Floor: "3"
     - Room: "305"
     - Landmark: "Near library"
   - Add note: "Please call when arriving"

6. **Review Order**
   - Show subtotal, service fee, delivery fee
   - Show balance check
   - Explain: "System validates balance before allowing order"

7. **Place Order**
   - Click "Place Order"
   - Navigate to "Orders" tab
   - **Highlight the PICKUP CODE** (large, gold box)
   - Show order progress timeline
   - Show delivery details
   - Explain: "Student shows this code to the runner for verification"

---

### Scene 3: Shop Operations (3 minutes)

**Narrator**: "Let's see how shop owners manage orders."

1. **Login as Shop**
   - Logout
   - Select "Shop Owner"
   - Enter name: "Tajine Express Owner"
   - Click Continue

2. **View Dashboard**
   - Show shop status (Open/Closed toggle)
   - Show countdown timer
   - Show queued orders count

3. **View Batch Summary**
   - Show aggregated items:
     - "1x Chicken Tajine"
     - "1x Lamb Tajine"
   - Explain: "Shop sees total quantities, not individual student names"

4. **Update Status**
   - Click "Mark as Preparing"
   - Explain: "Shop starts preparing the batch"
   - Wait 2 seconds
   - Click "Mark as Ready"
   - Explain: "Batch is ready for runner pickup"

5. **View Detailed Orders**
   - Scroll to "Detailed Orders" section
   - Show order cards (no student names, just order IDs)
   - Explain: "Privacy-first: shops don't see student information"

---

### Scene 4: Runner Delivery (2 minutes)

**Narrator**: "Now the delivery runner takes over."

1. **Login as Runner**
   - Logout
   - Select "Delivery Runner"
   - Enter name: "Ahmed Runner"
   - Click Continue

2. **View Ready Orders**
   - Show "Ready for Pickup" tab
   - **Highlight the PICKUP CODE** (gold box)
   - Show delivery location details
   - Explain: "Runner uses the code to verify the correct order"

3. **Pick Up Order**
   - Click "Mark as Picked Up"
   - Navigate to "In Delivery" tab
   - Show order with delivery address
   - Show delivery notes

4. **Complete Delivery**
   - Click "Mark as Delivered"
   - Explain: "Order is now complete"

---

### Scene 5: Student Verification (1 minute)

**Narrator**: "Let's verify the student sees the update."

1. **Login as Student**
   - Logout
   - Login with same student credentials
   - Navigate to "Orders" tab

2. **View Completed Order**
   - Show order status: "Delivered"
   - Show completed progress timeline
   - Show all 5 stages highlighted
   - Show final total and payment method

---

### Scene 6: Admin Monitoring (1 minute)

**Narrator**: "Finally, let's see admin monitoring."

1. **Login as Admin**
   - Logout and login as Admin

2. **View Updated Statistics**
   - Show increased order count
   - Show revenue updated
   - Navigate to "Signup Codes" tab
   - Show the used code (marked as "Used")
   - Show "Used By" field populated

3. **Manage Shops**
   - Navigate to "Manage Shops" tab
   - Show shop settings
   - Demonstrate enable/disable shop
   - Explain: "Admin has full control over the platform"

---

## 🎯 Key Points to Emphasize

### 1. Security & Privacy
- ✅ One-time codes prevent unauthorized access
- ✅ Shops don't see student names
- ✅ Runners don't see prices
- ✅ Role-based access control

### 2. Offline Payment Model
- ✅ No online payment integration needed
- ✅ Students pay cash/bank transfer
- ✅ Admin manually credits accounts
- ✅ Automatic balance deduction

### 3. Batch Efficiency
- ✅ Orders grouped by shop
- ✅ Aggregated item quantities
- ✅ Efficient preparation workflow
- ✅ Clear cutoff times

### 4. User Experience
- ✅ Mobile-first design
- ✅ Clear countdown timers
- ✅ Prominent pickup codes
- ✅ Simple, fast interactions

### 5. School Independence
- ✅ Codes distributed externally
- ✅ School not involved in operations
- ✅ Self-service platform
- ✅ Minimal administration

---

## 🔄 Alternative Demo Scenarios

### Scenario A: Insufficient Balance
1. Login as Student
2. Try to place order > 150 MAD
3. Show error: "Insufficient balance"
4. Login as Admin, credit more balance
5. Return as Student, complete order

### Scenario B: Code Reuse Prevention
1. Try to signup with already-used code
2. Show error: "Code already used"
3. Login as Admin, generate new code
4. Use new code successfully

### Scenario C: Shop Capacity
1. Login as Admin
2. Edit shop max orders to 1
3. Login as Student 1, place order
4. Login as Student 2, try to order
5. Show "Shop at full capacity"

### Scenario D: Order Cancellation
1. Student places order
2. While status is "Queued"
3. Click "Cancel Order"
4. Show refund in balance
5. Login as Admin, verify no-show tracking

---

## 📱 Mobile Demo Tips

1. **Resize browser** to mobile width (375px)
2. Show responsive design
3. Demonstrate touch-friendly buttons
4. Show mobile navigation
5. Emphasize mobile-first approach

---

## 🎤 Talking Points

### For School Administrators
- "No involvement needed in day-to-day operations"
- "Students manage their own accounts"
- "Reduces lunch break congestion"
- "Improves student satisfaction"

### For Shop Owners
- "Batch orders reduce chaos"
- "Clear preparation timeline"
- "Guaranteed payment (prepaid)"
- "Efficient workflow"

### For Students
- "Order from your phone"
- "No waiting in line"
- "Track your order in real-time"
- "Delivered to your location"

### For Investors/Stakeholders
- "Scalable to multiple schools"
- "Low operational overhead"
- "Privacy-compliant"
- "Proven business model"

---

## ⏱️ Quick Demo (5 minutes)

If time is limited, show only:
1. Admin generates code (30 sec)
2. Student signup with code (30 sec)
3. Admin credits balance (30 sec)
4. Student places order, show pickup code (2 min)
5. Shop marks ready (30 sec)
6. Runner delivers (1 min)

---

## 🐛 Troubleshooting During Demo

### If countdown shows "Closed"
- Login as Admin
- Toggle "Ordering Open"

### If balance is 0
- Login as Admin
- Credit balance in "Credit Balance" tab

### If no shops are open
- Login as Shop Owner
- Click "Shop Closed - Click to Open"

### If codes don't work
- Login as Admin
- Generate fresh codes
- Use newly generated codes

---

## 📊 Demo Success Metrics

After demo, audience should understand:
- ✅ How signup codes work
- ✅ How balance system works
- ✅ How orders flow through the system
- ✅ How pickup codes ensure verification
- ✅ How privacy is maintained
- ✅ How admin monitors the platform

---

## 🎁 Demo Closing

**Narrator**: "This platform solves the lunch break chaos by:
1. Pre-ordering before the break
2. Batch preparation by shops
3. Efficient delivery by runners
4. Real-time tracking for students
5. Complete admin oversight

All while maintaining privacy and operating independently of school administration."

**Call to Action**: "Ready to pilot this at your school?"
