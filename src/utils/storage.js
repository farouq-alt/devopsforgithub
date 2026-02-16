import { STORAGE_KEYS } from './constants'

// Save state to localStorage
export const saveState = (state) => {
  try {
    const serialized = JSON.stringify(state)
    localStorage.setItem(STORAGE_KEYS.PERSIST_STATE, serialized)
  } catch (error) {
    console.error('Failed to save state:', error)
  }
}

// Load state from localStorage
export const loadState = () => {
  try {
    const serialized = localStorage.getItem(STORAGE_KEYS.PERSIST_STATE)
    if (!serialized) return undefined
    return JSON.parse(serialized)
  } catch (error) {
    console.error('Failed to load state:', error)
    return undefined
  }
}

// Clear persisted state
export const clearState = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.PERSIST_STATE)
  } catch (error) {
    console.error('Failed to clear state:', error)
  }
}
