import { createSlice } from '@reduxjs/toolkit'

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    cart: [],
    studentOrders: [],
    allOrders: []
  },
  reducers: {
    addToCart: (state, action) => {
      const item = state.cart.find(i => i.id === action.payload.id)
      if (item) {
        item.quantity += 1
      } else {
        state.cart.push({ ...action.payload, quantity: 1 })
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(i => i.id !== action.payload)
    },
    updateCartQuantity: (state, action) => {
      const item = state.cart.find(i => i.id === action.payload.id)
      if (item) {
        item.quantity = action.payload.quantity
        if (item.quantity <= 0) {
          state.cart = state.cart.filter(i => i.id !== action.payload.id)
        }
      }
    },
    clearCart: (state) => {
      state.cart = []
    },
    placeOrder: (state, action) => {
      const order = {
        id: Date.now(),
        ...action.payload,
        status: 'Queued',
        timestamp: new Date().toLocaleTimeString()
      }
      state.studentOrders.push(order)
      state.allOrders.push(order)
      state.cart = []
    },
    updateOrderStatus: (state, action) => {
      const order = state.allOrders.find(o => o.id === action.payload.id)
      if (order) {
        order.status = action.payload.status
      }
      const studentOrder = state.studentOrders.find(o => o.id === action.payload.id)
      if (studentOrder) {
        studentOrder.status = action.payload.status
      }
    }
  }
})

export const { 
  addToCart, 
  removeFromCart, 
  updateCartQuantity,
  clearCart, 
  placeOrder, 
  updateOrderStatus 
} = ordersSlice.actions
export default ordersSlice.reducer
