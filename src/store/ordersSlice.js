import { createSlice } from '@reduxjs/toolkit'
import { ORDER_STATUS } from '../utils/constants'

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    cart: [],
    studentOrders: [],
    allOrders: [],
    error: null,
    deliveryLocation: null,
    deliveryNotes: '',
    paymentMethod: 'cash',
    discountCode: '',
    appliedDiscount: null,
    favoriteItems: [],
    orderHistory: []
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
          state.cart.push({ ...item, quantity: 1, addedAt: Date.now() })
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
      state.deliveryNotes = ''
      state.discountCode = ''
      state.appliedDiscount = null
      state.error = null
    },
    setDeliveryLocation: (state, action) => {
      state.deliveryLocation = action.payload
    },
    setDeliveryNotes: (state, action) => {
      state.deliveryNotes = action.payload.substring(0, 200) // Max 200 chars
    },
    setPaymentMethod: (state, action) => {
      const validMethods = ['cash', 'card', 'mobile']
      if (validMethods.includes(action.payload)) {
        state.paymentMethod = action.payload
      }
    },
    applyDiscountCode: (state, action) => {
      state.discountCode = action.payload
    },
    setAppliedDiscount: (state, action) => {
      state.appliedDiscount = action.payload
    },
    placeOrder: (state, action) => {
      const { items, shopId, shopName, total, userId, deliveryLocation, deliveryFee, estimatedTime, pickupCode, balance } = action.payload
      
      // Validate order
      if (!items || items.length === 0) {
        state.error = 'Cannot place empty order'
        return
      }
      
      if (!shopId || !shopName || !total || !userId) {
        state.error = 'Invalid order data'
        return
      }

      // Check balance
      const orderTotal = total + (action.payload.serviceFee || 0) + (deliveryFee || 0) - (state.appliedDiscount?.amount || 0)
      if (balance !== undefined && balance < orderTotal) {
        state.error = 'Insufficient balance'
        return
      }
      
      const order = {
        id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        userId,
        items: [...items],
        shopId,
        shopName,
        subtotal: total,
        serviceFee: action.payload.serviceFee || 0,
        deliveryFee: deliveryFee || 0,
        discount: state.appliedDiscount?.amount || 0,
        total: orderTotal,
        status: ORDER_STATUS.QUEUED,
        deliveryLocation: deliveryLocation || state.deliveryLocation,
        deliveryNotes: state.deliveryNotes,
        paymentMethod: state.paymentMethod,
        estimatedTime: estimatedTime || { min: 20, max: 30 },
        pickupCode: pickupCode || 'N/A',
        timestamp: new Date().toISOString(),
        createdAt: Date.now(),
        statusHistory: [{
          status: ORDER_STATUS.QUEUED,
          timestamp: Date.now()
        }]
      }
      
      state.studentOrders.push(order)
      state.allOrders.push(order)
      state.orderHistory.push({
        orderId: order.id,
        shopName: order.shopName,
        total: order.total,
        date: order.timestamp
      })
      state.cart = []
      state.deliveryNotes = ''
      state.discountCode = ''
      state.appliedDiscount = null
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
        order.statusHistory.push({
          status,
          timestamp: Date.now()
        })
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
        order.cancelledAt = Date.now()
        order.statusHistory.push({
          status: ORDER_STATUS.CANCELLED,
          timestamp: Date.now()
        })
        
        const studentOrder = state.studentOrders.find(o => o.id === id)
        if (studentOrder) {
          studentOrder.status = ORDER_STATUS.CANCELLED
          studentOrder.updatedAt = Date.now()
        }
      } else {
        state.error = 'Cannot cancel this order'
      }
    },
    addToFavorites: (state, action) => {
      const item = action.payload
      if (!state.favoriteItems.find(i => i.id === item.id)) {
        state.favoriteItems.push(item)
      }
    },
    removeFromFavorites: (state, action) => {
      state.favoriteItems = state.favoriteItems.filter(i => i.id !== action.payload)
    },
    addOrderNote: (state, action) => {
      const { orderId, note } = action.payload
      const order = state.allOrders.find(o => o.id === orderId)
      if (order) {
        if (!order.notes) order.notes = []
        order.notes.push({
          text: note,
          timestamp: Date.now()
        })
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
  setDeliveryLocation,
  setDeliveryNotes,
  setPaymentMethod,
  applyDiscountCode,
  setAppliedDiscount,
  placeOrder, 
  updateOrderStatus,
  cancelOrder,
  addToFavorites,
  removeFromFavorites,
  addOrderNote,
  clearError
} = ordersSlice.actions
export default ordersSlice.reducer
