import { VALIDATION } from './constants'

export const validateName = (name) => {
  if (!name || typeof name !== 'string') {
    return { valid: false, error: 'Name is required' }
  }
  
  const trimmed = name.trim()
  
  if (trimmed.length < VALIDATION.MIN_NAME_LENGTH) {
    return { valid: false, error: `Name must be at least ${VALIDATION.MIN_NAME_LENGTH} characters` }
  }
  
  if (trimmed.length > VALIDATION.MAX_NAME_LENGTH) {
    return { valid: false, error: `Name must be less than ${VALIDATION.MAX_NAME_LENGTH} characters` }
  }
  
  // Prevent XSS - basic sanitization
  if (/<script|javascript:|onerror=/i.test(trimmed)) {
    return { valid: false, error: 'Invalid characters in name' }
  }
  
  return { valid: true, value: trimmed }
}

export const validateRole = (role) => {
  const validRoles = ['student', 'shop', 'runner', 'admin']
  return validRoles.includes(role)
}

export const validateOrderData = (cart, shop) => {
  if (!cart || cart.length === 0) {
    return { valid: false, error: 'Cart is empty' }
  }
  
  if (cart.length > VALIDATION.MAX_CART_ITEMS) {
    return { valid: false, error: 'Too many items in cart' }
  }
  
  if (!shop || shop.status !== 'open') {
    return { valid: false, error: 'Shop is not available' }
  }
  
  // Validate each item
  for (const item of cart) {
    if (!item.id || !item.name || !item.price || !item.quantity) {
      return { valid: false, error: 'Invalid item in cart' }
    }
    
    if (item.quantity < 1 || item.quantity > 99) {
      return { valid: false, error: 'Invalid quantity' }
    }
    
    if (item.price < 0) {
      return { valid: false, error: 'Invalid price' }
    }
  }
  
  return { valid: true }
}

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input
  return input.trim().replace(/<[^>]*>/g, '')
}
