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
    sessionExpiry: null
  },
  reducers: {
    login: (state, action) => {
      const { user, role, userName } = action.payload
      const token = generateAuthToken(user, role)
      const expiry = Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      
      state.user = user
      state.role = role
      state.userName = userName
      state.authToken = token
      state.isLoggedIn = true
      state.sessionExpiry = expiry
      
      // Store in localStorage
      storeAuthData({ user, role, userName, sessionExpiry: expiry }, token)
    },
    restoreSession: (state, action) => {
      const { user, role, userName, authToken, sessionExpiry } = action.payload
      
      // Check if session is still valid
      if (sessionExpiry && Date.now() < sessionExpiry) {
        state.user = user
        state.role = role
        state.userName = userName
        state.authToken = authToken
        state.isLoggedIn = true
        state.sessionExpiry = sessionExpiry
      }
    },
    logout: (state) => {
      state.user = null
      state.role = null
      state.userName = ''
      state.authToken = null
      state.isLoggedIn = false
      state.sessionExpiry = null
      
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
    }
  }
})

export const { login, logout, toggleOrdering, setOrderingStatus, restoreSession } = appSlice.actions
export default appSlice.reducer
