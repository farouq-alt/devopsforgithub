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
  PREPARING: 'Preparing',
  READY: 'Ready',
  PICKED_UP: 'Picked Up',
  DELIVERED: 'Delivered',
  NO_SHOW: 'No-show',
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

// Subscription pricing
export const SUBSCRIPTION = {
  MONTHLY_FEE: 150, // MAD
  MIN_BALANCE: 0
}

// Break configuration
export const BREAK_CONFIG = {
  START_TIME: '12:00',
  CUTOFF_TIME: '12:30',
  END_TIME: '13:00'
}
