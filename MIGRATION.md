# Migration Guide: v1.0 to v2.0

This guide helps you migrate from version 1.0 to version 2.0 with enhanced security features.

## Breaking Changes

### 1. Redux Toolkit Version
**Changed**: `@reduxjs/toolkit` upgraded from 1.9.7 to 2.5.0

**Action Required**: None - already handled in package.json

### 2. Authentication System
**Changed**: Added token-based authentication with session management

**Impact**: 
- Users will need to log in again after upgrade
- Sessions now expire after 24 hours
- Auth tokens are stored in localStorage

**Action Required**: None - automatic session restoration implemented

### 3. Redux Action Signatures

#### Orders Slice
**Before**:
```javascript
dispatch(updateOrderStatus({ id: orderId, status: 'Ready' }))
```

**After**:
```javascript
dispatch(updateOrderStatus({ 
  id: orderId, 
  status: 'Ready',
  role: userRole 
}))
```

**Action Required**: Update any custom components that dispatch `updateOrderStatus`

#### Shops Slice
**Before**:
```javascript
dispatch(toggleShopStatus(shopId))
dispatch(toggleShop(shopId))
```

**After**:
```javascript
dispatch(toggleShopStatus({ 
  shopId, 
  ownerId, 
  isAdmin 
}))
dispatch(toggleShop({ 
  shopId, 
  isAdmin 
}))
```

**Action Required**: Update any custom components that dispatch shop actions

### 4. Order Data Structure
**Changed**: Orders now include `userId` field

**Before**:
```javascript
{
  id: 123,
  items: [...],
  shopId: 1,
  status: 'Queued'
}
```

**After**:
```javascript
{
  id: 'ORD-123-abc',
  userId: 'student_123',
  items: [...],
  shopId: 1,
  status: 'Queued',
  createdAt: 1234567890,
  updatedAt: 1234567890
}
```

**Action Required**: Update any code that relies on order structure

## New Features

### 1. Session Management
- Automatic session restoration on page reload
- 24-hour session expiry
- Secure token storage

### 2. Input Validation
- Name validation (2-50 characters)
- XSS prevention
- Order validation
- Cart limits (max 20 items)

### 3. Error Handling
- Global error boundary
- Validation error messages
- Graceful error recovery

### 4. Custom Hooks
New hooks available for use:
```javascript
import { useAuth } from './hooks/useAuth'
import { useOrderValidation } from './hooks/useOrderValidation'

// In your component
const { isLoggedIn } = useAuth()
const { canPlaceOrder } = useOrderValidation()
```

## Migration Steps

### Step 1: Update Dependencies
```bash
npm install
```

### Step 2: Clear Old Data (Optional)
If you want a fresh start:
```javascript
localStorage.clear()
```

### Step 3: Update Custom Components
If you have custom components, update action dispatches to include new required fields:

```javascript
// Update order status calls
dispatch(updateOrderStatus({ 
  id: orderId, 
  status: newStatus,
  role: currentUserRole 
}))

// Update shop toggle calls
dispatch(toggleShopStatus({ 
  shopId: shopId,
  ownerId: currentUserId,
  isAdmin: isAdminUser
}))
```

### Step 4: Test Authentication Flow
1. Clear localStorage
2. Log in with each role
3. Verify session persists on reload
4. Wait for session expiry (or manually expire)
5. Verify auto-logout works

### Step 5: Test Order Flow
1. Add items to cart
2. Verify validation messages
3. Place order
4. Verify order includes userId
5. Test status updates with different roles

## Rollback Plan

If you need to rollback to v1.0:

```bash
# Checkout previous version
git checkout v1.0.0

# Reinstall dependencies
npm install

# Clear localStorage
# In browser console:
localStorage.clear()
```

## Support

For issues or questions:
1. Check [SECURITY.md](./SECURITY.md) for security documentation
2. Review [CHANGELOG.md](./CHANGELOG.md) for detailed changes
3. Open an issue on GitHub

## Testing Checklist

- [ ] npm install completes successfully
- [ ] npm run lint passes
- [ ] npm run build succeeds
- [ ] Login works for all roles
- [ ] Session persists on reload
- [ ] Orders can be placed
- [ ] Shop status can be toggled
- [ ] Runner can update deliveries
- [ ] Admin can manage system
- [ ] Validation errors display correctly
- [ ] Session expires after 24 hours
