import { configureStore } from '@reduxjs/toolkit'
import appReducer from './appSlice'
import shopsReducer from './shopsSlice'
import ordersReducer from './ordersSlice'

export const store = configureStore({
  reducer: {
    app: appReducer,
    shops: shopsReducer,
    orders: ordersReducer
  }
})
