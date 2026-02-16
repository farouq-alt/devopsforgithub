# Quick Reference Guide

## For Users

### How to Place an Order

1. **Login** - Select your role and enter name
2. **Browse Shops** - View available restaurants
3. **Select Shop** - Click on a restaurant
4. **View Menu** - Browse dishes with photos
5. **Add to Cart** - Click + button on items
6. **Add Delivery Details** - Click "Add Delivery Details" button
7. **Fill Location** - Enter building, floor, room
8. **Add Notes** (Optional) - Special delivery instructions
9. **Select Payment** - Choose payment method
10. **Apply Discount** (Optional) - Enter promo code
11. **Review Cart** - Check items and total
12. **Place Order** - Click "Place Order" button
13. **Track Order** - Monitor status in Orders tab

### Discount Codes

| Code | Discount | Minimum Order |
|------|----------|---------------|
| FIRST10 | 10% off | 50 MAD |
| FEAST20 | 20% off | 100 MAD |
| SAVE15 | 15 MAD off | 75 MAD |

### Order Status Flow

```
Queued → Ready → Picked Up → Delivered
```

### Minimum Orders

| Restaurant | Minimum |
|------------|---------|
| Tajine Express | 30 MAD |
| Couscous Corner | 35 MAD |
| Pastilla Palace | 40 MAD |
| Harira & More | 15 MAD |
| Kebab Kingdom | 25 MAD |

### Fees

- **Service Fee**: 1-2 MAD (varies by restaurant)
- **Delivery Fee**: 5 MAD (flat rate)

### Favorites

- Click ♡ to add to favorites
- Click ♥ to remove from favorites
- View favorites in empty cart
- Click favorite to add to cart

### Cancel Order

- Only queued orders can be cancelled
- Click "Cancel Order" button
- Confirm cancellation
- Order marked as cancelled

---

## For Developers

### Project Structure

```
src/
├── components/
│   ├── BottomNav.jsx
│   ├── DeliveryForm.jsx
│   ├── DiscountCode.jsx
│   ├── ErrorBoundary.jsx
│   └── Timer.jsx
├── hooks/
│   ├── useAuth.js
│   └── useOrderValidation.js
├── pages/
│   ├── AdminDash.jsx
│   ├── Login.jsx
│   ├── RunnerDash.jsx
│   ├── ShopDash.jsx
│   └── StudentDash.jsx
├── store/
│   ├── appSlice.js
│   ├── ordersSlice.js
│   ├── shopsSlice.js
│   └── store.js
├── utils/
│   ├── auth.js
│   ├── businessLogic.js
│   ├── constants.js
│   ├── storage.js
│   └── validation.js
├── App.css
├── App.jsx
├── index.css
└── main.jsx
```

### Key Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

### Redux State Structure

```javascript
{
  app: {
    user, role, isLoggedIn, userName, authToken,
    orderingEnabled, sessionExpiry
  },
  shops: {
    shops: [{ id, name, status, menu, ... }]
  },
  orders: {
    cart, studentOrders, allOrders,
    deliveryLocation, deliveryNotes, paymentMethod,
    discountCode, appliedDiscount, favoriteItems,
    orderHistory, error
  }
}
```

### Business Logic Functions

```javascript
// src/utils/businessLogic.js
calculateDeliveryTime(shopId, currentOrders)
calculateDeliveryFee(distance, orderTotal)
isWithinDeliveryHours()
getNextAvailableSlot()
validateOrderMinimum(shopId, orderTotal)
calculateLoyaltyPoints(orderTotal)
applyDiscount(orderTotal, discountCode)
estimatePreparationTime(items)
checkItemAvailability(itemId, currentTime)
suggestComplementaryItems(cartItems, allMenuItems)
```

### Redux Actions

```javascript
// App Actions
login, logout, toggleOrdering, restoreSession

// Shop Actions
updateShopStatus, toggleShopStatus, incrementOrderCount,
decrementOrderCount, toggleShop, updateShopSettings

// Order Actions
addToCart, removeFromCart, updateCartQuantity, clearCart,
setDeliveryLocation, setDeliveryNotes, setPaymentMethod,
applyDiscountCode, setAppliedDiscount, placeOrder,
updateOrderStatus, cancelOrder, addToFavorites,
removeFromFavorites, addOrderNote, clearError
```

### CSS Variables

```css
/* Colors */
--parchment: #f4e8d0
--ink-black: #1a1410
--royal-gold: #d4af37
--royal-blue: #1e3a5f
--forest-green: #2d5016
--seal-red: #a52a2a

/* Shadows */
--shadow-light: 0 2px 8px rgba(26, 20, 16, 0.15)
--shadow-medium: 0 4px 12px rgba(26, 20, 16, 0.25)
--shadow-heavy: 0 8px 24px rgba(26, 20, 16, 0.35)
```

### Component Props

```javascript
// DeliveryForm
<DeliveryForm />

// DiscountCode
<DiscountCode orderTotal={number} />

// BottomNav
<BottomNav view={string} setView={function} cartCount={number} />
```

### Environment Setup

```bash
# Node version
node >= 16.0.0

# Package manager
npm >= 8.0.0

# Required packages
react@19.2.0
@reduxjs/toolkit@2.5.0
react-redux@9.0.0
```

---

## For Admins

### Managing Discount Codes

Edit `src/utils/businessLogic.js`:

```javascript
const discounts = {
  'CODE': { type: 'percentage', value: 10, minOrder: 50 },
  // Add more codes here
}
```

### Setting Minimum Orders

Edit `src/utils/businessLogic.js`:

```javascript
const minimums = {
  1: 30, // Shop ID: Minimum amount
  // Add more shops here
}
```

### Configuring Delivery Fee

Edit `src/pages/StudentDash.jsx`:

```javascript
const deliveryFee = 5 // Change this value
```

### Managing Restaurants

Edit `src/store/shopsSlice.js`:

```javascript
shops: [
  {
    id: 1,
    name: 'Restaurant Name',
    maxOrders: 20,
    cutoffTime: '12:30',
    serviceFee: 1.5,
    enabled: true,
    menu: [...]
  }
]
```

### Preparation Times

Edit `src/utils/businessLogic.js`:

```javascript
const prepTimes = {
  1: 25, // Item ID: Minutes
  // Add more items here
}
```

---

## Troubleshooting

### Order Won't Place
- Check delivery location is filled
- Verify minimum order is met
- Ensure shop is open
- Check ordering is enabled

### Discount Code Not Working
- Verify code is correct (case-sensitive)
- Check minimum order requirement
- Ensure code hasn't expired
- Try removing and reapplying

### Can't Cancel Order
- Only queued orders can be cancelled
- Check order status
- Verify you own the order

### Favorites Not Saving
- Check localStorage is enabled
- Clear browser cache
- Try logging out and back in

---

## Support

### Documentation
- README.md - Project overview
- SECURITY.md - Security features
- THEME.md - Design system
- MOROCCAN_MENU.md - Menu details
- REAL_WORLD_FEATURES.md - Feature guide
- ENHANCEMENT_SUMMARY.md - Latest changes

### Contact
- GitHub Issues
- Development Team
- Support Email

---

## Version Information

**Current Version**: 2.3.0  
**Release Date**: February 16, 2026  
**Last Updated**: February 16, 2026  
**Status**: Production Ready
