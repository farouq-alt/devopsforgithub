import { configureStore } from '@reduxjs/toolkit'
import appReducer from './appSlice'
import shopsReducer from './shopsSlice'
import ordersReducer from './ordersSlice'
import { loadState, saveState } from '../utils/storage'

// Load persisted state
const persistedState = loadState()

export const store = configureStore({
  reducer: {
    app: appReducer,
    shops: shopsReducer,
    orders: ordersReducer
  },
  preloadedState: persistedState
})

// Save state to localStorage on changes (debounced)
let saveTimeout
store.subscribe(() => {
  clearTimeout(saveTimeout)
  saveTimeout = setTimeout(() => {
    const state = store.getState()
    // Only persist necessary data
    saveState({
      app: {
        ...state.app,
        // Don't persist sensitive data
      },
      shops: state.shops,
      orders: {
        ...state.orders,
        // Only persist user's own orders
        studentOrders: state.orders.studentOrders
      }
    })
  }, 1000)
})
