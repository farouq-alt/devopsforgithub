# Moroccan Feast - Food Ordering System

A medieval-themed React food ordering application featuring authentic Moroccan cuisine with role-based dashboards for students, shop owners, delivery runners, and administrators.

## Cuisine

Experience authentic Moroccan fast food:
- **Tajine Express**: Traditional slow-cooked tajines with chicken, lamb, or vegetables
- **Couscous Corner**: Royal couscous with seven vegetables and tender meats
- **Pastilla Palace**: Sweet and savory phyllo pastries with chicken or seafood
- **Harira & More**: Traditional soups, msemen, and Moroccan salads
- **Kebab Kingdom**: Spiced meat skewers and merguez sandwiches

All prices in Moroccan Dirham (MAD).

## Theme

Experience a unique medieval aesthetic with:
- Parchment-textured backgrounds
- Gothic typography (Cinzel & Crimson Text fonts)
- Royal color palette (gold, burgundy, forest green)
- Ornate borders and decorative elements
- Authentic medieval UI components

## Features

- **Multi-Role System**: Student, Shop Owner, Runner, and Admin dashboards
- **Real-time Order Tracking**: Track orders from queue to delivery
- **Shop Management**: Owners can manage menus and order capacity
- **Secure Authentication**: Token-based auth with session management
- **Order Validation**: Comprehensive input validation and error handling
- **Responsive Design**: Works on desktop and mobile devices

## Security Features

✅ Token-based authentication with 24-hour expiry  
✅ Role-based access control (RBAC)  
✅ Input validation and XSS prevention  
✅ Session persistence with validation  
✅ Secure state management  
✅ Error boundaries for graceful error handling  

See [SECURITY.md](./SECURITY.md) for detailed security documentation.

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── components/       # Reusable components
├── pages/           # Role-specific dashboards
├── store/           # Redux state management
├── hooks/           # Custom React hooks
├── utils/           # Utility functions
│   ├── auth.js      # Authentication utilities
│   ├── validation.js # Input validation
│   ├── constants.js  # App constants
│   └── storage.js    # LocalStorage helpers
└── App.jsx          # Main app component
```

## User Roles

### Student
- Browse available shops
- Add items to cart
- Place orders
- Track order status

### Shop Owner
- Open/close shop
- View incoming orders
- Mark orders as ready
- Manage order capacity

### Runner
- View ready orders
- Mark orders as picked up
- Complete deliveries

### Admin
- Enable/disable ordering system
- Manage all shops
- Configure system settings

## Technology Stack

- **React 19** - UI framework
- **Redux Toolkit 2.5** - State management
- **Vite 7** - Build tool
- **Axios** - HTTP client

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT
