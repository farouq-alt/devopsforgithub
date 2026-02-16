# Quick Start Guide

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The app will open at `http://localhost:5173`

## Testing the System

### Step 1: Generate Signup Codes (Admin)
1. Select "Admin" role
2. Enter any name
3. Click "Continue"
4. Navigate to "Signup Codes" tab
5. Click "Generate New Code"
6. Copy one of the generated codes (format: SC-XXXXX-XXXX)

### Step 2: Create Student Account
1. Logout (top right)
2. Select "Student" role
3. Paste the signup code
4. Enter your name
5. Click "Continue"

### Step 3: Credit Balance (Admin)
1. Logout and login as Admin again
2. Navigate to "Credit Balance" tab
3. Enter amount (e.g., 150 MAD)
4. Add note (optional)
5. Click "Credit Balance"

Note: In this demo, balance is credited to the current session. In production, you'd select a specific student.

### Step 4: Place Order (Student)
1. Logout and login as Student with the same code
2. Enable ordering (you may need to login as Admin first and toggle "Ordering Open")
3. Select a shop (make sure it's open)
4. Browse menu and add items to cart
5. Go to cart
6. Add delivery details
7. Place order
8. Note your PICKUP CODE

### Step 5: Prepare Order (Shop)
1. Logout and login as "Shop Owner"
2. View incoming orders
3. Click "Mark as Preparing"
4. Click "Mark as Ready"

### Step 6: Deliver Order (Runner)
1. Logout and login as "Delivery Runner"
2. View ready orders with pickup codes
3. Click "Mark as Picked Up"
4. Navigate to "In Delivery" tab
5. Click "Mark as Delivered"

### Step 7: Track Order (Student)
1. Login as Student again
2. Go to "Orders" tab
3. See order progress through all stages

## Key Features to Test

### Balance System
- ✅ Try ordering without sufficient balance
- ✅ Check balance deduction after order
- ✅ View transaction history (in Redux DevTools)

### Signup Codes
- ✅ Try using the same code twice (should fail)
- ✅ Try invalid code format (should fail)
- ✅ Deactivate a code and try using it (should fail)

### Order Workflow
- ✅ Watch status progress: Queued → Preparing → Ready → Picked Up → Delivered
- ✅ Cancel order while in "Queued" status
- ✅ Check pickup code visibility

### Break Management
- ✅ Watch countdown timer
- ✅ Try ordering after cutoff (should be blocked)
- ✅ Admin can toggle ordering on/off

### Shop Management
- ✅ Open/close shop
- ✅ View batch aggregation
- ✅ Check capacity limits

### Privacy Features
- ✅ Shop sees only item quantities (no student names)
- ✅ Runner sees only pickup codes and delivery location (no prices)
- ✅ Admin sees everything

## Configuration

### Adjust Break Times
Edit `src/utils/constants.js`:
```javascript
export const BREAK_CONFIG = {
  START_TIME: '12:00',
  CUTOFF_TIME: '12:30',
  END_TIME: '13:00'
}
```

### Adjust Subscription Fee
Edit `src/utils/constants.js`:
```javascript
export const SUBSCRIPTION = {
  MONTHLY_FEE: 150, // MAD
  MIN_BALANCE: 0
}
```

### Add More Shops
Edit `src/store/shopsSlice.js` - add to initial state

### Modify Menu Items
Edit `src/store/shopsSlice.js` - modify shop.menu arrays

## Troubleshooting

### "Insufficient Balance" Error
- Login as Admin
- Credit balance in "Credit Balance" tab
- Logout and login as Student again

### "Code Already Used" Error
- Login as Admin
- Generate a new code
- Use the new code for signup

### Orders Not Showing
- Make sure ordering is enabled (Admin dashboard)
- Make sure shop is open (Shop dashboard)
- Check that you're logged in with correct role

### Countdown Shows "Closed"
- Adjust BREAK_CONFIG times to future times
- Or toggle ordering manually as Admin

## Development Tools

### Redux DevTools
Install Redux DevTools browser extension to inspect:
- App state (balance, user info)
- Orders state (cart, orders)
- Shops state (menu, status)

### React DevTools
Install React DevTools to inspect component hierarchy

### Console Logs
Check browser console for any errors or warnings

## Building for Production

```bash
npm run build
```

Output will be in `dist/` folder

## Testing

```bash
npm run test
```

## Linting

```bash
npm run lint
```

## Next Steps

1. Set up backend API
2. Connect to real database
3. Implement real authentication
4. Add payment tracking
5. Deploy to production
6. Set up monitoring
7. Add analytics

See `IMPLEMENTATION_STATUS.md` for detailed production roadmap.
