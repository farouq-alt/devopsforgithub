# Changelog

## [2.2.0] - Moroccan Cuisine Update

### 🍽️ Dataset Transformation

#### Moroccan Fast Food Menu
- ✅ Replaced generic food with authentic Moroccan cuisine
- ✅ Added 5 themed restaurants:
  - Tajine Express (traditional tajines)
  - Couscous Corner (royal couscous dishes)
  - Pastilla Palace (phyllo pastries and briouats)
  - Harira & More (soups and traditional sides)
  - Kebab Kingdom (grilled meats and sandwiches)
- ✅ Updated all menu items with Moroccan dishes
- ✅ Added dish descriptions for each menu item
- ✅ Changed currency from $ to MAD (Moroccan Dirham)

#### Image Integration
- ✅ Added shop images to all restaurant cards
- ✅ Added menu item images with descriptions
- ✅ Added cart item thumbnails
- ✅ Implemented responsive image sizing
- ✅ Used high-quality food photography from Unsplash

#### Visual Enhancements
- ✅ Shop cards now display featured images
- ✅ Menu items show food photos with descriptions
- ✅ Cart displays item thumbnails
- ✅ Images styled with medieval borders
- ✅ Proper image aspect ratios maintained

#### Data Updates
- ✅ Realistic Moroccan pricing (18-58 MAD range)
- ✅ Authentic dish names and descriptions
- ✅ Updated service fees to match local standards
- ✅ Adjusted order capacities per restaurant type

### 🎨 UI Improvements
- Enhanced menu item layout with images
- Improved cart item display with thumbnails
- Better visual hierarchy with food photography
- Responsive image handling across devices

---

## [2.1.0] - Medieval Theme Update

### 🎨 Visual Design Overhaul

#### Medieval Theme Implementation
- ✅ Complete visual redesign with medieval aesthetic
- ✅ Parchment-textured backgrounds throughout
- ✅ Gothic typography (Cinzel & Crimson Text fonts)
- ✅ Royal color palette (gold, burgundy, forest green, royal blue)
- ✅ Ornate borders and decorative elements
- ✅ Medieval symbols for navigation (⚔ ⚱ ⚜)

#### Typography
- Added Cinzel font for headers, buttons, and labels
- Added Crimson Text font for body content
- Implemented uppercase styling with letter-spacing
- Enhanced readability with proper font weights

#### Color System
- Parchment backgrounds (#f4e8d0, #e8d7b8, #d4c4a8)
- Ink colors for text (#1a1410, #3d2817)
- Royal gold accents (#d4af37, #cd7f32)
- Status colors (forest green, royal blue, seal red)
- Stone gray for neutral elements

#### UI Components
- Redesigned all buttons with medieval styling
- Enhanced cards with double borders
- Updated form inputs with parchment backgrounds
- Styled badges with heraldic appearance
- Transformed navigation with medieval symbols

#### Visual Effects
- Added paper texture overlays
- Implemented lift effects on hover
- Enhanced shadows for depth
- Created gradient backgrounds
- Added decorative border patterns

### 🚫 Emoji Removal
- ✅ Removed all emojis from components
- ✅ Replaced with medieval symbols where appropriate
- ✅ Updated text-only status indicators
- ✅ Cleaned up all UI text

### 📚 Documentation
- Created THEME.md with complete design system
- Updated README.md with theme information
- Documented color palette and typography
- Added implementation guidelines

---

## [2.0.0] - Enhanced Security & Architecture Update

### 🔒 Security Enhancements

#### Authentication & Authorization
- ✅ Implemented token-based authentication system
- ✅ Added 24-hour session expiry with automatic logout
- ✅ Created secure session persistence with localStorage
- ✅ Added token verification on app load
- ✅ Implemented role-based access control (RBAC) across all actions

#### Input Validation
- ✅ Added comprehensive name validation (2-50 characters)
- ✅ Implemented XSS prevention (blocks script tags and malicious patterns)
- ✅ Added order validation (cart limits, quantity checks, price validation)
- ✅ Created input sanitization utilities
- ✅ Added HTML tag stripping from user inputs

#### State Management Security
- ✅ Added ownership verification for shop actions
- ✅ Implemented role-based action validation in Redux
- ✅ Added user ID tracking for orders
- ✅ Created secure state persistence (only non-sensitive data)

### 🏗️ Architecture Improvements

#### New Utilities
- `src/utils/auth.js` - Authentication and token management
- `src/utils/validation.js` - Input validation and sanitization
- `src/utils/constants.js` - Centralized constants (roles, statuses, keys)
- `src/utils/storage.js` - LocalStorage helpers with error handling

#### New Hooks
- `src/hooks/useAuth.js` - Session validation and auto-logout
- `src/hooks/useOrderValidation.js` - Order validation logic

#### New Components
- `src/components/ErrorBoundary.jsx` - Global error handling

### 🔧 Code Quality

#### Redux Store Updates
- Enhanced `appSlice.js` with session management
- Improved `ordersSlice.js` with validation and error handling
- Updated `shopsSlice.js` with ownership verification
- Added debounced state persistence to `store.js`

#### Component Updates
- Refactored `Login.jsx` with validation and session restoration
- Enhanced `StudentDash.jsx` with capacity checks
- Updated `ShopDash.jsx` with role-based controls
- Improved `RunnerDash.jsx` with status validation
- Enhanced `AdminDash.jsx` with admin-only actions

#### Error Handling
- Added error boundaries for graceful failures
- Implemented validation error messages
- Added error state to Redux slices
- Created user-friendly error displays

### 📦 Dependencies

#### Updated
- `@reduxjs/toolkit`: 1.9.7 → 2.5.0 (React 19 compatibility)

### 📚 Documentation

#### New Files
- `SECURITY.md` - Comprehensive security documentation
- `CHANGELOG.md` - Version history and changes
- Updated `README.md` - Project overview and features

### 🐛 Bug Fixes
- Fixed deprecated `onKeyPress` → `onKeyDown`
- Fixed React 19 compatibility issues
- Removed unused imports and variables
- Fixed ESLint warnings

### ♿ Accessibility
- Added ARIA labels to form inputs
- Added semantic HTML attributes
- Improved keyboard navigation
- Added role attributes for alerts

### 🎯 Best Practices
- Implemented immutable state updates
- Added proper error boundaries
- Used constants instead of magic strings
- Separated concerns (utils, hooks, components)
- Added comprehensive input validation
- Implemented secure session management

---

## [1.0.0] - Initial Release

### Features
- Multi-role dashboard system
- Student ordering interface
- Shop management dashboard
- Runner delivery tracking
- Admin control panel
- Real-time order status updates
- Cart management
- Shop capacity tracking
