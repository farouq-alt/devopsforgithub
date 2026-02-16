import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/appSlice'
import { addToCart, removeFromCart, updateCartQuantity, placeOrder } from '../store/ordersSlice'
import { incrementOrderCount } from '../store/shopsSlice'
import BottomNav from '../components/BottomNav'
import Timer from '../components/Timer'

function StudentDash() {
  const dispatch = useDispatch()
  const { userName } = useSelector(state => state.app)
  const orderingEnabled = useSelector(state => state.app.orderingEnabled)
  const shops = useSelector(state => state.shops.shops)
  const cart = useSelector(state => state.orders.cart)
  const studentOrders = useSelector(state => state.orders.studentOrders)
  
  const [view, setView] = useState('shops')
  const [selectedShop, setSelectedShop] = useState(null)
  const [cutoffTime, setCutoffTime] = useState('12:30')
  const [timeLeft, setTimeLeft] = useState(null)
  const [orderingClosed, setOrderingClosed] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const [hours, minutes] = cutoffTime.split(':')
      const cutoff = new Date()
      cutoff.setHours(parseInt(hours), parseInt(minutes), 0)
      
      const diff = cutoff - now
      if (diff <= 0) {
        setOrderingClosed(true)
        setTimeLeft('Closed')
      } else {
        setOrderingClosed(false)
        const mins = Math.floor(diff / 60000)
        const secs = Math.floor((diff % 60000) / 1000)
        setTimeLeft(`${mins}:${secs.toString().padStart(2, '0')}`)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [cutoffTime])

  const handlePlaceOrder = () => {
    if (cart.length === 0) return
    
    if (!orderingEnabled) {
      alert('Ordering is currently closed!')
      return
    }
    
    const shop = shops.find(s => s.id === selectedShop)
    
    // Check if shop is open
    if (shop.status !== 'open') {
      alert('This shop is currently closed!')
      return
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    
    dispatch(placeOrder({
      items: cart,
      shopId: selectedShop,
      shopName: shop.name,
      total: total + shop.serviceFee
    }))
    dispatch(incrementOrderCount(selectedShop))
    setSelectedShop(null)
    setView('orders')
  }

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shop = shops.find(s => s.id === selectedShop)
  const serviceFee = shop?.serviceFee || 0

  return (
    <div className="dashboard student-dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Good morning, {userName}</h1>
          <p className="header-subtitle">Break countdown</p>
        </div>
        <button className="logout-btn" onClick={() => dispatch(logout())}>Logout</button>
      </header>

      <div className="cutoff-timer">
        <div className="timer-content">
          <span className="timer-label">Order cutoff in</span>
          <span className={`timer-display ${!orderingEnabled ? 'closed' : ''}`}>
            {!orderingEnabled ? 'Closed' : timeLeft || '...'}
          </span>
          {!orderingEnabled && <span className="closed-badge">Ordering Closed</span>}
        </div>
      </div>

      {view === 'shops' && (
        <div className="view-content">
          <h2>Available Shops</h2>
          <div className="shops-grid">
            {shops.filter(s => s.enabled).map(shop => {
              const isFull = shop.currentOrders >= shop.maxOrders
              const isClosed = shop.status !== 'open' || !orderingEnabled
              const isSelected = selectedShop === shop.id
              const canSelect = !isFull && !isClosed
              
              return (
                <div 
                  key={shop.id} 
                  className={`shop-card ${isSelected ? 'selected' : ''} ${isFull || isClosed ? 'full' : ''}`}
                  onClick={() => canSelect && setSelectedShop(shop.id)}
                >
                  <div className="shop-header">
                    <h3>{shop.name}</h3>
                    <span className={`status-badge ${isFull ? 'full' : isClosed ? 'closed' : 'open'}`}>
                      {isFull ? 'Full' : isClosed ? 'Closed' : 'Open'}
                    </span>
                  </div>
                  <div className="shop-info">
                    <p><strong>{shop.maxOrders - shop.currentOrders}</strong> spots left</p>
                    <p>Service fee: ${shop.serviceFee}</p>
                    <p className="cutoff">Closes at {shop.cutoffTime}</p>
                  </div>
                  {isSelected && canSelect && (
                    <button className="view-menu-btn" onClick={() => setView('menu')}>
                      View Menu →
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {view === 'menu' && selectedShop && (
        <div className="view-content">
          <button className="back-btn" onClick={() => setView('shops')}>← Back</button>
          <h2>{shop.name} Menu</h2>
          <div className="menu-list">
            {shop.menu.map(item => (
              <div key={item.id} className="menu-item">
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p className="price">${item.price}</p>
                </div>
                <button 
                  className="add-btn"
                  onClick={() => dispatch(addToCart(item))}
                  disabled={!orderingEnabled}
                >
                  +
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'cart' && (
        <div className="view-content">
          <h2>Your Cart</h2>
          {cart.length === 0 ? (
            <p className="empty-state">Cart is empty</p>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>${item.price} each</p>
                    </div>
                    <div className="quantity-control">
                      <button onClick={() => dispatch(updateCartQuantity({ id: item.id, quantity: item.quantity - 1 }))}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => dispatch(updateCartQuantity({ id: item.id, quantity: item.quantity + 1 }))}>+</button>
                    </div>
                    <p className="subtotal">${item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${cartTotal}</span>
                </div>
                <div className="summary-row">
                  <span>Service fee</span>
                  <span>${serviceFee}</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${cartTotal + serviceFee}</span>
                </div>
              </div>
              <button 
                className="place-order-btn"
                onClick={handlePlaceOrder}
                disabled={!orderingEnabled}
              >
                {!orderingEnabled ? 'Ordering Closed' : 'Place Order'}
              </button>
            </>
          )}
        </div>
      )}

      {view === 'orders' && (
        <div className="view-content">
          <h2>Your Orders</h2>
          {studentOrders.length === 0 ? (
            <p className="empty-state">No orders yet</p>
          ) : (
            <div className="orders-list">
              {studentOrders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <h4>{order.shopName}</h4>
                    <span className={`status-badge ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="order-progress">
                    <div className={`step ${['Queued', 'Picked Up', 'Delivered'].includes(order.status) ? 'done' : ''}`}>
                      <span>Queued</span>
                    </div>
                    <div className={`step ${['Picked Up', 'Delivered'].includes(order.status) ? 'done' : ''}`}>
                      <span>Picked Up</span>
                    </div>
                    <div className={`step ${order.status === 'Delivered' ? 'done' : ''}`}>
                      <span>Delivered</span>
                    </div>
                  </div>
                  <p className="order-total">Total: ${order.total}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <BottomNav view={view} setView={setView} cartCount={cart.length} />
    </div>
  )
}

export default StudentDash
