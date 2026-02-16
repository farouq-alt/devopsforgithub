import { createSlice } from '@reduxjs/toolkit'
import { ORDER_STATUS } from '../utils/constants'

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    cart: [],
    studentOrders: [],
    allOrders: [],
    error: null
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload
      
      // Validate item
      if (!item.id || !item.name || !item.price) {
        state.error = 'Invalid item'
        return
      }
      
      const existingItem = state.cart.find(i => i.id === item.id)
      if (existingItem) {
        if (existingItem.quantity < 99) {
          existingItem.quantity += 1
        }
      } else {
        if (state.cart.length < 20) {
          state.cart.push({ ...item, quantity: 1 })
        } else {
          state.error = 'Cart is full'
        }
      }
      state.error = null
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(i => i.id !== action.payload)
      state.error = null
    },
    updateCartQuantity: (state, action) => {
      const { id, quantity } = action.payload
      
      if (quantity < 0 || quantity > 99) {
        state.error = 'Invalid quantity'
        return
      }
      
      const item = state.cart.find(i => i.id === id)
      if (item) {
        if (quantity === 0) {
          state.cart = state.cart.filter(i => i.id !== id)
        } else {
          item.quantity = quantity
        }
      }
      state.error = null
    },
    clearCart: (state) => {
      state.cart = []
      state.error = null
    },
    placeOrder: (state, action) => {
      const { items, shopId, shopName, total, userId } = action.payload
      
      // Validate order
      if (!items || items.length === 0) {
        state.error = 'Cannot place empty order'
        return
      }
      
      if (!shopId || !shopName || !total || !userId) {
        state.error = 'Invalid order data'
        return
      }
      
      const order = {
        id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        userId,
        items: [...items],
        shopId,
        shopName,
        total,
        status: ORDER_STATUS.QUEUED,
        timestamp: new Date().toISOString(),
        createdAt: Date.now()
      }
      
      state.studentOrders.push(order)
      state.allOrders.push(order)
      state.cart = []
      state.error = null
    },
    updateOrderStatus: (state, action) => {
      const { id, status, role } = action.payload
      
      // Validate status transition
      const validStatuses = Object.values(ORDER_STATUS)
      if (!validStatuses.includes(status)) {
        state.error = 'Invalid order status'
        return
      }
      
      const order = state.allOrders.find(o => o.id === id)
      if (order) {
        // Role-based status update validation
        if (role === 'shop' && status !== ORDER_STATUS.READY) {
          state.error = 'Shop can only mark orders as ready'
          return
        }
        if (role === 'runner' && ![ORDER_STATUS.PICKED_UP, ORDER_STATUS.DELIVERED].includes(status)) {
          state.error = 'Runner can only update pickup/delivery status'
          return
        }
        
        order.status = status
        order.updatedAt = Date.now()
      }
      
      const studentOrder = state.studentOrders.find(o => o.id === id)
      if (studentOrder) {
        studentOrder.status = status
        studentOrder.updatedAt = Date.now()
      }
      
      state.error = null
    },
    cancelOrder: (state, action) => {
      const { id, userId } = action.payload
      const order = state.allOrders.find(o => o.id === id)
      
      if (order && order.userId === userId && order.status === ORDER_STATUS.QUEUED) {
        order.status = ORDER_STATUS.CANCELLED
        order.updatedAt = Date.now()
        
        const studentOrder = state.studentOrders.find(o => o.id === id)
        if (studentOrder) {
          studentOrder.status = ORDER_STATUS.CANCELLED
          studentOrder.updatedAt = Date.now()
        }
      } else {
        state.error = 'Cannot cancel this order'
      }
    },
    clearError: (state) => {
      state.error = null
    }
  }
})

export const { 
  addToCart, 
  removeFromCart, 
  updateCartQuantity,
  clearCart, 
  placeOrder, 
  updateOrderStatus,
  cancelOrder,
  clearError
} = ordersSlice.actions
export default ordersSlice.reducer
