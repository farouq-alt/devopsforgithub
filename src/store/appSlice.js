import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'app',
  initialState: {
    user: null,
    role: null,
    isLoggedIn: false,
    userName: '',
    orderingEnabled: false
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user
      state.role = action.payload.role
      state.userName = action.payload.userName
      state.isLoggedIn = true
    },
    logout: (state) => {
      state.user = null
      state.role = null
      state.userName = ''
      state.isLoggedIn = false
    },
    toggleOrdering: (state) => {
      state.orderingEnabled = !state.orderingEnabled
    }
  }
})

export const { login, logout, toggleOrdering } = appSlice.actions
export default appSlice.reducer
