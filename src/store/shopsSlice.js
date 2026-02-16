import { createSlice } from '@reduxjs/toolkit'
import { SHOP_STATUS } from '../utils/constants'

const shopsSlice = createSlice({
  name: 'shops',
  initialState: {
    shops: [
      {
        id: 1,
        name: 'Tajine Express',
        status: SHOP_STATUS.CLOSED,
        currentOrders: 0,
        maxOrders: 20,
        cutoffTime: '12:30',
        serviceFee: 1.5,
        enabled: true,
        ownerId: 'shop_1',
        image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=400&h=300&fit=crop',
        menu: [
          { 
            id: 1, 
            name: 'Chicken Tajine', 
            price: 45, 
            available: true,
            image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=300&h=200&fit=crop',
            description: 'Tender chicken with preserved lemon and olives'
          },
          { 
            id: 2, 
            name: 'Lamb Tajine', 
            price: 55, 
            available: true,
            image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=300&h=200&fit=crop',
            description: 'Slow-cooked lamb with prunes and almonds'
          },
          { 
            id: 3, 
            name: 'Vegetable Tajine', 
            price: 35, 
            available: true,
            image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=300&h=200&fit=crop',
            description: 'Seasonal vegetables with aromatic spices'
          }
        ]
      },
      {
        id: 2,
        name: 'Couscous Corner',
        status: SHOP_STATUS.CLOSED,
        currentOrders: 0,
        maxOrders: 25,
        cutoffTime: '12:45',
        serviceFee: 1.5,
        enabled: true,
        ownerId: 'shop_2',
        image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=400&h=300&fit=crop',
        menu: [
          { 
            id: 4, 
            name: 'Royal Couscous', 
            price: 50, 
            available: true,
            image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=300&h=200&fit=crop',
            description: 'Seven vegetables with tender meat'
          },
          { 
            id: 5, 
            name: 'Couscous with Chicken', 
            price: 42, 
            available: true,
            image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=300&h=200&fit=crop',
            description: 'Fluffy couscous with grilled chicken'
          },
          { 
            id: 6, 
            name: 'Vegetarian Couscous', 
            price: 38, 
            available: true,
            image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=300&h=200&fit=crop',
            description: 'Fresh vegetables and chickpeas'
          }
        ]
      },
      {
        id: 3,
        name: 'Pastilla Palace',
        status: SHOP_STATUS.CLOSED,
        currentOrders: 0,
        maxOrders: 15,
        cutoffTime: '12:20',
        serviceFee: 2,
        enabled: true,
        ownerId: 'shop_3',
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop',
        menu: [
          { 
            id: 7, 
            name: 'Chicken Pastilla', 
            price: 48, 
            available: true,
            image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=200&fit=crop',
            description: 'Sweet and savory phyllo pastry with chicken'
          },
          { 
            id: 8, 
            name: 'Seafood Pastilla', 
            price: 58, 
            available: true,
            image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=300&h=200&fit=crop',
            description: 'Delicate pastry filled with fresh seafood'
          },
          { 
            id: 9, 
            name: 'Mini Briouats', 
            price: 25, 
            available: true,
            image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=200&fit=crop',
            description: 'Crispy triangular pastries with meat filling'
          }
        ]
      },
      {
        id: 4,
        name: 'Harira & More',
        status: SHOP_STATUS.CLOSED,
        currentOrders: 0,
        maxOrders: 30,
        cutoffTime: '13:00',
        serviceFee: 1,
        enabled: true,
        ownerId: 'shop_4',
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop',
        menu: [
          { 
            id: 10, 
            name: 'Harira Soup', 
            price: 18, 
            available: true,
            image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&h=200&fit=crop',
            description: 'Traditional tomato-based soup with lentils'
          },
          { 
            id: 11, 
            name: 'Msemen with Honey', 
            price: 15, 
            available: true,
            image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=300&h=200&fit=crop',
            description: 'Flaky square pancakes with honey'
          },
          { 
            id: 12, 
            name: 'Zaalouk & Bread', 
            price: 20, 
            available: true,
            image: 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=300&h=200&fit=crop',
            description: 'Smoky eggplant salad with fresh bread'
          }
        ]
      },
      {
        id: 5,
        name: 'Kebab Kingdom',
        status: SHOP_STATUS.CLOSED,
        currentOrders: 0,
        maxOrders: 28,
        cutoffTime: '12:50',
        serviceFee: 1.5,
        enabled: true,
        ownerId: 'shop_5',
        image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&h=300&fit=crop',
        menu: [
          { 
            id: 13, 
            name: 'Kefta Kebab', 
            price: 40, 
            available: true,
            image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=300&h=200&fit=crop',
            description: 'Spiced ground meat skewers'
          },
          { 
            id: 14, 
            name: 'Chicken Kebab', 
            price: 38, 
            available: true,
            image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=300&h=200&fit=crop',
            description: 'Marinated chicken skewers with spices'
          },
          { 
            id: 15, 
            name: 'Merguez Sandwich', 
            price: 32, 
            available: true,
            image: 'https://images.unsplash.com/photo-1619740455993-9e4e0f27e4d7?w=300&h=200&fit=crop',
            description: 'Spicy lamb sausage in fresh bread'
          }
        ]
      }
    ]
  },
  reducers: {
    updateShopStatus: (state, action) => {
      const { id, status, ownerId } = action.payload
      const shop = state.shops.find(s => s.id === id)
      
      // Verify ownership or admin
      if (shop && (shop.ownerId === ownerId || action.payload.isAdmin)) {
        shop.status = status
      }
    },
    toggleShopStatus: (state, action) => {
      const { shopId, ownerId, isAdmin } = action.payload
      const shop = state.shops.find(s => s.id === shopId)
      
      if (shop && (shop.ownerId === ownerId || isAdmin)) {
        shop.status = shop.status === SHOP_STATUS.OPEN ? SHOP_STATUS.CLOSED : SHOP_STATUS.OPEN
      }
    },
    incrementOrderCount: (state, action) => {
      const shop = state.shops.find(s => s.id === action.payload)
      if (shop && shop.currentOrders < shop.maxOrders) {
        shop.currentOrders += 1
      }
    },
    decrementOrderCount: (state, action) => {
      const shop = state.shops.find(s => s.id === action.payload)
      if (shop && shop.currentOrders > 0) {
        shop.currentOrders -= 1
      }
    },
    toggleShop: (state, action) => {
      const { shopId, isAdmin } = action.payload
      
      if (isAdmin) {
        const shop = state.shops.find(s => s.id === shopId)
        if (shop) {
          shop.enabled = !shop.enabled
        }
      }
    },
    updateShopSettings: (state, action) => {
      const { shopId, settings, ownerId, isAdmin } = action.payload
      const shop = state.shops.find(s => s.id === shopId)
      
      if (shop && (shop.ownerId === ownerId || isAdmin)) {
        if (settings.cutoffTime) shop.cutoffTime = settings.cutoffTime
        if (settings.serviceFee !== undefined) shop.serviceFee = Math.max(0, settings.serviceFee)
        if (settings.maxOrders !== undefined) shop.maxOrders = Math.max(1, settings.maxOrders)
      }
    },
    toggleMenuItem: (state, action) => {
      const { shopId, itemId, ownerId, isAdmin } = action.payload
      const shop = state.shops.find(s => s.id === shopId)
      
      if (shop && (shop.ownerId === ownerId || isAdmin)) {
        const item = shop.menu.find(i => i.id === itemId)
        if (item) {
          item.available = !item.available
        }
      }
    }
  }
})

export const { 
  updateShopStatus, 
  toggleShopStatus, 
  incrementOrderCount, 
  decrementOrderCount,
  toggleShop,
  updateShopSettings,
  toggleMenuItem
} = shopsSlice.actions
export default shopsSlice.reducer
