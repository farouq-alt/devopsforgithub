import { STORAGE_KEYS, ROLES } from './constants'

// Generate a simple auth token (in production, use JWT from backend)
export const generateAuthToken = (userId, role) => {
  const timestamp = Date.now()
  const randomStr = Math.random().toString(36).substring(2)
  return btoa(`${userId}:${role}:${timestamp}:${randomStr}`)
}

// Verify auth token
export const verifyAuthToken = (token) => {
  try {
    if (!token) return false
    const decoded = atob(token)
    const parts = decoded.split(':')
    
    if (parts.length !== 4) return false
    
    const [userId, role, timestamp] = parts
    
    // Check if token is expired (24 hours)
    const tokenAge = Date.now() - parseInt(timestamp)
    const maxAge = 24 * 60 * 60 * 1000
    
    if (tokenAge > maxAge) return false
    
    return { userId, role }
  } catch {
    return false
  }
}

// Store auth data securely
export const storeAuthData = (userData, token) => {
  try {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token)
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData))
    return true
  } catch {
    console.error('Failed to store auth data')
    return false
  }
}

// Retrieve auth data
export const getAuthData = () => {
  try {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
    const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA)
    
    if (!token || !userData) return null
    
    const verified = verifyAuthToken(token)
    if (!verified) {
      clearAuthData()
      return null
    }
    
    return {
      token,
      user: JSON.parse(userData)
    }
  } catch {
    console.error('Failed to retrieve auth data')
    return null
  }
}

// Clear auth data
export const clearAuthData = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.USER_DATA)
    return true
  } catch {
    console.error('Failed to clear auth data')
    return false
  }
}

// Check if user has required role
export const hasRole = (userRole, requiredRole) => {
  if (requiredRole === ROLES.ADMIN) {
    return userRole === ROLES.ADMIN
  }
  return userRole === requiredRole || userRole === ROLES.ADMIN
}
