import { createSlice } from '@reduxjs/toolkit'

const shopsSlice = createSlice({
  name: 'shops',
  initialState: {
    shops: [
      {
        id: 1,
        name: 'Pizza Palace',
        status: 'closed',
        currentOrders: 8,
        maxOrders: 20,
        cutoffTime: '12:30',
        serviceFee: 1,
        enabled: true,
        menu: [
          { id: 1, name: 'Margherita', price: 8 },
          { id: 2, name: 'Pepperoni', price: 10 },
          { id: 3, name: 'Veggie', price: 9 }
        ]
      },
      {
        id: 2,
        name: 'Burger Barn',
        status: 'closed',
        currentOrders: 12,
        maxOrders: 25,
        cutoffTime: '12:45',
        serviceFee: 1,
        enabled: true,
        menu: [
          { id: 4, name: 'Classic Burger', price: 7 },
          { id: 5, name: 'Cheese Burger', price: 8 },
          { id: 6, name: 'Fries', price: 3 }
        ]
      },
      {
        id: 3,
        name: 'Sushi Express',
        status: 'closed',
        currentOrders: 15,
        maxOrders: 15,
        cutoffTime: '12:20',
        serviceFee: 2,
        enabled: true,
        menu: [
          { id: 7, name: 'California Roll', price: 12 },
          { id: 8, name: 'Spicy Tuna', price: 13 }
        ]
      }
    ]
  },
  reducers: {
    updateShopStatus: (state, action) => {
      const shop = state.shops.find(s => s.id === action.payload.id)
      if (shop) {
        shop.status = action.payload.status
      }
    },
    toggleShopStatus: (state, action) => {
      const shop = state.shops.find(s => s.id === action.payload)
      if (shop) {
        shop.status = shop.status === 'open' ? 'closed' : 'open'
      }
    },
    incrementOrderCount: (state, action) => {
      const shop = state.shops.find(s => s.id === action.payload)
      if (shop && shop.currentOrders < shop.maxOrders) {
        shop.currentOrders += 1
      }
    },
    toggleShop: (state, action) => {
      const shop = state.shops.find(s => s.id === action.payload)
      if (shop) {
        shop.enabled = !shop.enabled
      }
    }
  }
})

export const { updateShopStatus, toggleShopStatus, incrementOrderCount, toggleShop } = shopsSlice.actions
export default shopsSlice.reducer
