import { createSlice } from '@reduxjs/toolkit'
import { clearAuthData, storeAuthData, generateAuthToken } from '../utils/auth'
import { clearState } from '../utils/storage'

const appSlice = createSlice({
  name: 'app',
  initialState: {
    user: null,
    role: null,
    isLoggedIn: false,
    userName: '',
    authToken: null,
    orderingEnabled: false,
    sessionExpiry: null,
    balance: 0, // Student prepaid balance
    balanceHistory: [], // Transaction history
    signupCode: null // Code used for signup
  },
  reducers: {
    login: (state, action) => {
      const { user, role, userName, signupCode, balance } = action.payload
      const token = generateAuthToken(user, role)
      const expiry = Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      
      state.user = user
      state.role = role
      state.userName = userName
      state.authToken = token
      state.isLoggedIn = true
      state.sessionExpiry = expiry
      state.signupCode = signupCode || null
      state.balance = balance || 0
      state.balanceHistory = []
      
      // Store in localStorage
      storeAuthData({ user, role, userName, sessionExpiry: expiry, signupCode, balance }, token)
    },
    restoreSession: (state, action) => {
      const { user, role, userName, authToken, sessionExpiry, signupCode, balance, balanceHistory } = action.payload
      
      // Check if session is still valid
      if (sessionExpiry && Date.now() < sessionExpiry) {
        state.user = user
        state.role = role
        state.userName = userName
        state.authToken = authToken
        state.isLoggedIn = true
        state.sessionExpiry = sessionExpiry
        state.signupCode = signupCode || null
        state.balance = balance || 0
        state.balanceHistory = balanceHistory || []
      }
    },
    logout: (state) => {
      state.user = null
      state.role = null
      state.userName = ''
      state.authToken = null
      state.isLoggedIn = false
      state.sessionExpiry = null
      state.balance = 0
      state.balanceHistory = []
      state.signupCode = null
      
      // Clear stored data
      clearAuthData()
      clearState()
    },
    toggleOrdering: (state) => {
      // Only admin can toggle
      if (state.role === 'admin') {
        state.orderingEnabled = !state.orderingEnabled
      }
    },
    setOrderingStatus: (state, action) => {
      if (state.role === 'admin') {
        state.orderingEnabled = action.payload
      }
    },
    creditBalance: (state, action) => {
      // Admin credits student balance
      const { amount, note, adminId } = action.payload
      if (state.role === 'admin' || adminId) {
        state.balance += amount
        state.balanceHistory.push({
          type: 'credit',
          amount,
          note: note || 'Balance credited',
          timestamp: Date.now(),
          balance: state.balance
        })
      }
    },
    deductBalance: (state, action) => {
      // Deduct from balance when order is placed
      const { amount, orderId } = action.payload
      if (state.balance >= amount) {
        state.balance -= amount
        state.balanceHistory.push({
          type: 'debit',
          amount,
          orderId,
          note: `Order ${orderId}`,
          timestamp: Date.now(),
          balance: state.balance
        })
      }
    },
    refundBalance: (state, action) => {
      // Refund when order is cancelled
      const { amount, orderId } = action.payload
      state.balance += amount
      state.balanceHistory.push({
        type: 'refund',
        amount,
        orderId,
        note: `Refund for order ${orderId}`,
        timestamp: Date.now(),
        balance: state.balance
      })
    }
  }
})

export const { 
  login, 
  logout, 
  toggleOrdering, 
  setOrderingStatus, 
  restoreSession,
  creditBalance,
  deductBalance,
  refundBalance
} = appSlice.actions
export default appSlice.reducer
