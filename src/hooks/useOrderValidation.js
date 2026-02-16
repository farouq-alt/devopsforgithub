import { useSelector } from 'react-redux'
import { validateOrderData } from '../utils/validation'

export const useOrderValidation = () => {
  const cart = useSelector(state => state.orders.cart)
  const shops = useSelector(state => state.shops.shops)
  const orderingEnabled = useSelector(state => state.app.orderingEnabled)

  const canPlaceOrder = (shopId) => {
    if (!orderingEnabled) {
      return { valid: false, error: 'Ordering is currently closed' }
    }

    const shop = shops.find(s => s.id === shopId)
    if (!shop) {
      return { valid: false, error: 'Shop not found' }
    }

    if (!shop.enabled) {
      return { valid: false, error: 'Shop is disabled' }
    }

    if (shop.status !== 'open') {
      return { valid: false, error: 'Shop is closed' }
    }

    if (shop.currentOrders >= shop.maxOrders) {
      return { valid: false, error: 'Shop is at full capacity' }
    }

    const validation = validateOrderData(cart, shop)
    return validation
  }

  return { canPlaceOrder }
}
