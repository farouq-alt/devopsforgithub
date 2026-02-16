// Business logic utilities for real-world operations

export const calculateDeliveryTime = (shopId, currentOrders) => {
  // Base preparation time in minutes
  const baseTime = 15
  
  // Additional time per order in queue
  const timePerOrder = 3
  
  // Calculate estimated time
  const estimatedTime = baseTime + (currentOrders * timePerOrder)
  
  return {
    min: estimatedTime,
    max: estimatedTime + 10
  }
}

export const calculateDeliveryFee = (distance, orderTotal) => {
  // Base delivery fee
  let fee = 5
  
  // Distance-based pricing (per km)
  if (distance > 2) {
    fee += (distance - 2) * 2
  }
  
  // Free delivery for orders over 100 MAD
  if (orderTotal >= 100) {
    fee = 0
  }
  
  return Math.round(fee * 10) / 10
}

export const isWithinDeliveryHours = () => {
  const now = new Date()
  const hour = now.getHours()
  
  // Delivery hours: 11:00 - 15:00 and 18:00 - 22:00
  return (hour >= 11 && hour < 15) || (hour >= 18 && hour < 22)
}

export const getNextAvailableSlot = () => {
  const now = new Date()
  const hour = now.getHours()
  
  if (hour < 11) {
    return '11:00 AM'
  } else if (hour >= 15 && hour < 18) {
    return '6:00 PM'
  } else if (hour >= 22) {
    return 'Tomorrow at 11:00 AM'
  }
  
  return 'Now'
}

export const validateOrderMinimum = (shopId, orderTotal) => {
  // Minimum order amounts per shop type
  const minimums = {
    1: 30, // Tajine Express
    2: 35, // Couscous Corner
    3: 40, // Pastilla Palace
    4: 15, // Harira & More
    5: 25  // Kebab Kingdom
  }
  
  const minimum = minimums[shopId] || 20
  
  return {
    isValid: orderTotal >= minimum,
    minimum,
    remaining: Math.max(0, minimum - orderTotal)
  }
}

export const calculateLoyaltyPoints = (orderTotal) => {
  // 1 point per 10 MAD spent
  return Math.floor(orderTotal / 10)
}

export const applyDiscount = (orderTotal, discountCode) => {
  const discounts = {
    'FIRST10': { type: 'percentage', value: 10, minOrder: 50 },
    'FEAST20': { type: 'percentage', value: 20, minOrder: 100 },
    'SAVE15': { type: 'fixed', value: 15, minOrder: 75 }
  }
  
  const discount = discounts[discountCode?.toUpperCase()]
  
  if (!discount) {
    return { valid: false, amount: 0, message: 'Invalid discount code' }
  }
  
  if (orderTotal < discount.minOrder) {
    return { 
      valid: false, 
      amount: 0, 
      message: `Minimum order of ${discount.minOrder} MAD required` 
    }
  }
  
  const amount = discount.type === 'percentage' 
    ? (orderTotal * discount.value) / 100 
    : discount.value
  
  return {
    valid: true,
    amount: Math.round(amount * 10) / 10,
    message: `${discount.value}${discount.type === 'percentage' ? '%' : ' MAD'} discount applied`
  }
}

export const estimatePreparationTime = (items) => {
  // Different dishes have different prep times
  const prepTimes = {
    // Tajines: 20-25 min
    1: 25, 2: 25, 3: 20,
    // Couscous: 15-20 min
    4: 20, 5: 18, 6: 15,
    // Pastilla: 15-20 min
    7: 20, 8: 20, 9: 15,
    // Quick items: 5-10 min
    10: 8, 11: 5, 12: 10,
    // Kebabs: 10-15 min
    13: 12, 14: 12, 15: 10
  }
  
  // Get max prep time from items
  const maxTime = Math.max(...items.map(item => prepTimes[item.id] || 15))
  
  return {
    min: maxTime,
    max: maxTime + 5
  }
}

export const checkItemAvailability = (itemId, currentTime) => {
  // Some items only available at certain times
  const hour = new Date(currentTime).getHours()
  
  // Breakfast items (Msemen, Harira) - available 7-12
  if ([10, 11].includes(itemId)) {
    return hour >= 7 && hour < 12
  }
  
  return true
}

export const suggestComplementaryItems = (cartItems, allMenuItems) => {
  // Suggest items that go well together
  const suggestions = []
  
  const hasMainDish = cartItems.some(item => [1, 2, 3, 4, 5, 6, 7, 8, 13, 14].includes(item.id))
  const hasSide = cartItems.some(item => [9, 10, 11, 12, 15].includes(item.id))
  
  if (hasMainDish && !hasSide) {
    // Suggest sides
    suggestions.push(...allMenuItems.filter(item => [9, 10, 11, 12].includes(item.id)))
  }
  
  return suggestions.slice(0, 3)
}
