# Moroccan Feast - School Food Ordering Platform

A complete web-based, mobile-first platform for pre-ordering food from school shops during breaks. Features one-time signup codes, prepaid balance system, batch order management, and role-based dashboards.

## 🎯 Project Overview

This platform allows students to pre-order from nearby shops during school breaks. Orders are grouped into batches, prepared by shops, and delivered by runners. The system operates with offline prepaid subscriptions and externally distributed one-time signup codes.

### Key Features

- ✅ **One-Time Signup Codes** - Secure, single-use codes for student registration
- ✅ **Prepaid Balance System** - Offline payment with manual crediting
- ✅ **Complete Order Workflow** - Queued → Preparing → Ready → Picked Up → Delivered
- ✅ **Pickup Code System** - Unique codes for order verification
- ✅ **Break Management** - Countdown timers and automatic cutoff enforcement
- ✅ **Batch Processing** - Efficient order aggregation for shops
- ✅ **Privacy-First Design** - Role-based data visibility
- ✅ **Mobile-Responsive** - Optimized for all devices

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open http://localhost:5173

### Testing the System

1. **Login as Admin** → Generate signup codes
2. **Logout and signup as Student** → Use generated code
3. **Login as Admin again** → Credit student balance
4. **Login as Student** → Place an order
5. **Login as Shop** → Mark order as preparing/ready
6. **Login as Runner** → Pick up and deliver order

See [QUICK_START.md](./QUICK_START.md) for detailed testing instructions.

## 📚 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - Step-by-step testing guide
- **[IMPLEMENTATION_STATUS.md](./IMPLEMENTATION_STATUS.md)** - Feature checklist
- **[SPEC_ALIGNMENT.md](./SPEC_ALIGNMENT.md)** - Requirement mapping
- **[DEMO_SCRIPT.md](./DEMO_SCRIPT.md)** - 15-minute demo walkthrough
- **[SYSTEM_FLOW.md](./SYSTEM_FLOW.md)** - Visual flow diagrams
- **[IMPLEMENTATION_COMPLETE.md](./IMPLEMENTATION_COMPLETE.md)** - Summary

## 👥 User Roles

### 🎓 Student
- Signup with one-time code
- View prepaid balance
- Browse shops and menus
- Place orders before cutoff
- Track order status with pickup code
- View order history

### 🏪 Shop Owner
- View incoming orders by batch
- See aggregated item quantities
- Mark batches as preparing/ready
- Manage shop status (open/closed)
- No access to student personal info

### 🏍 Runner
- View ready orders with pickup codes
- See delivery locations
- Mark orders as picked up
- Complete deliveries
- No access to prices or student info

### 🛠 Admin
- Generate and manage signup codes
- Credit student balances
- Enable/disable ordering
- View platform statistics
- Manage shops and settings
- Full system visibility

## 🏗️ Architecture

### Tech Stack
- **React 19** - UI framework
- **Redux Toolkit 2.5** - State management
- **Vite 7** - Build tool
- **CSS3** - Styling (medieval theme)

### Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/           # Role-specific dashboards
├── store/           # Redux state management
├── utils/           # Utility functions
│   ├── auth.js      # Authentication
│   ├── codes.js     # Signup & pickup codes
│   ├── constants.js # App constants
│   └── validation.js # Input validation
└── hooks/           # Custom React hooks
```

## 🔐 Security & Privacy

- ✅ One-time signup codes (single-use enforcement)
- ✅ Token-based authentication (24-hour expiry)
- ✅ Role-based access control
- ✅ Privacy-preserving data visibility
- ✅ Minimal data collection
- ✅ No sensitive documents or banking data
- ✅ Compliant with Moroccan Law 09-08

## 💳 Payment Model

- **Offline Payments** - Students pay cash/bank transfer
- **Manual Crediting** - Admin credits accounts after payment
- **Prepaid System** - Orders deducted from balance
- **Monthly Subscription** - 150 MAD (configurable)
- **Transaction History** - Full audit trail

## 🎨 Theme

Medieval aesthetic with:
- Parchment textures
- Gothic typography (Cinzel, Crimson Text)
- Royal colors (gold, burgundy, forest green)
- Ornate borders
- Authentic medieval UI components

## 📊 Key Metrics

- Total orders placed
- Active orders in progress
- Revenue from delivered orders
- No-show tracking
- Shop performance
- Code usage statistics

## 🔄 Order Workflow

```
Student Places Order
    ↓
Shop Marks as Preparing
    ↓
Shop Marks as Ready
    ↓
Runner Picks Up (with code verification)
    ↓
Runner Delivers
    ↓
Order Complete
```

## 🌍 Production Deployment

### Frontend
- Vercel / Netlify (recommended)
- GitHub Pages
- AWS S3 + CloudFront

### Backend (When Ready)
- Node.js / Python / PHP API
- PostgreSQL / MySQL database
- WebSocket for real-time updates
- JWT authentication

See [IMPLEMENTATION_COMPLETE.md](./IMPLEMENTATION_COMPLETE.md) for production roadmap.

## 🧪 Testing

```bash
npm run test
```

## 📝 Linting

```bash
npm run lint
```

## 🏗️ Build

```bash
npm run build
```

## 🎯 Success Criteria

✅ All core features implemented (95% complete)
✅ Mobile-responsive design
✅ Privacy-compliant
✅ Role-based access control
✅ Clean, maintainable code
✅ Comprehensive documentation

## 🚀 Next Steps

1. **Backend Development** - REST API with database
2. **Real-time Updates** - WebSocket integration
3. **Runner Assignment** - Admin assignment interface
4. **Menu Management** - Full CRUD interface
5. **Analytics Dashboard** - Charts and visualizations
6. **Production Deployment** - Launch to real users

## 📞 Support

- Check [QUICK_START.md](./QUICK_START.md) for troubleshooting
- Review [DEMO_SCRIPT.md](./DEMO_SCRIPT.md) for feature walkthrough
- See [SYSTEM_FLOW.md](./SYSTEM_FLOW.md) for visual diagrams

## 📄 License

MIT

## 🎉 Acknowledgments

Built with modern web technologies and best practices for school food ordering efficiency.
