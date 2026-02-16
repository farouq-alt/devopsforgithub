// User roles
export const ROLES = {
  STUDENT: 'student',
  SHOP: 'shop',
  RUNNER: 'runner',
  ADMIN: 'admin'
}

// Order statuses
export const ORDER_STATUS = {
  QUEUED: 'Queued',
  READY: 'Ready',
  PICKED_UP: 'Picked Up',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled'
}

// Shop statuses
export const SHOP_STATUS = {
  OPEN: 'open',
  CLOSED: 'closed'
}

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  PERSIST_STATE: 'app_state'
}

// Validation rules
export const VALIDATION = {
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 50,
  MIN_ORDER_AMOUNT: 1,
  MAX_CART_ITEMS: 20
}
