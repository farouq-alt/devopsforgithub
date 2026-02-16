import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, deductBalance } from '../store/appSlice'
import { addToCart, updateCartQuantity, placeOrder, cancelOrder, addToFavorites, removeFromFavorites } from '../store/ordersSlice'
import { incrementOrderCount } from '../store/shopsSlice'
import { validateOrderMinimum, estimatePreparationTime } from '../utils/businessLogic'
import { generatePickupCode } from '../utils/codes'
import BottomNav from '../components/BottomNav'
import DeliveryForm from '../components/DeliveryForm'
import DiscountCode from '../components/DiscountCode'

function StudentDash() {
  const dispatch = useDispatch()
  const { userName, user, balance } = useSelector(state => state.app)
  const orderingEnabled = useSelector(state => state.app.orderingEnabled)
  const shops = useSelector(state => state.shops.shops)
  const cart = useSelector(state => state.orders.cart)
  const studentOrders = useSelector(state => state.orders.studentOrders)
  const { deliveryLocation, appliedDiscount, favoriteItems } = useSelector(state => state.orders)
  
  const [view, setView] = useState('shops')
  const [selectedShop, setSelectedShop] = useState(null)
  const [cutoffTime] = useState('12:30')
  const [timeLeft, setTimeLeft] = useState(null)
  const [showDeliveryForm, setShowDeliveryForm] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const [hours, minutes] = cutoffTime.split(':')
      const cutoff = new Date()
      cutoff.setHours(parseInt(hours), parseInt(minutes), 0)
      
      const diff = cutoff - now
      if (diff <= 0) {
        setTimeLeft('Closed')
      } else {
        const totalMinutes = Math.floor(diff / 60000)
        const hours = Math.floor(totalMinutes / 60)
        const mins = totalMinutes % 60
        const secs = Math.floor((diff % 60000) / 1000)
        
        if (hours > 0) {
          setTimeLeft(`${hours}h ${mins}m ${secs}s`)
        } else {
          setTimeLeft(`${mins}m ${secs}s`)
        }
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
    
    if (shop.status !== 'open') {
      alert('This shop is currently closed!')
      return
    }
    
    if (shop.currentOrders >= shop.maxOrders) {
      alert('This shop is at full capacity!')
      return
    }

    // Check delivery location
    if (!deliveryLocation || !deliveryLocation.building) {
      alert('Please provide delivery location!')
      setShowDeliveryForm(true)
      return
    }
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    
    // Validate minimum order
    const minValidation = validateOrderMinimum(selectedShop, subtotal)
    if (!minValidation.isValid) {
      alert(`Minimum order is ${minValidation.minimum} MAD. Add ${minValidation.remaining} MAD more.`)
      return
    }

    // Calculate delivery fee (simplified - 5 MAD flat rate)
    const deliveryFee = 5
    
    // Calculate total
    const orderTotal = subtotal + shop.serviceFee + deliveryFee - (appliedDiscount?.amount || 0)

    // Check balance
    if (balance < orderTotal) {
      alert(`Insufficient balance! You need ${orderTotal} MAD but have ${balance} MAD. Please contact admin to credit your account.`)
      return
    }
    
    // Calculate estimated time
    const estimatedTime = estimatePreparationTime(cart)
    
    // Generate pickup code
    const pickupCode = generatePickupCode()

    // Deduct balance
    dispatch(deductBalance({ amount: orderTotal, orderId: pickupCode }))

    dispatch(placeOrder({
      items: cart,
      shopId: selectedShop,
      shopName: shop.name,
      total: subtotal,
      serviceFee: shop.serviceFee,
      deliveryFee,
      estimatedTime,
      userId: user,
      deliveryLocation,
      pickupCode,
      balance
    }))
    dispatch(incrementOrderCount(selectedShop))
    setSelectedShop(null)
    setShowDeliveryForm(false)
    setView('orders')
  }

  const handleCancelOrder = (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      dispatch(cancelOrder({ id: orderId, userId: user }))
    }
  }

  const handleToggleFavorite = (item) => {
    const isFavorite = favoriteItems.some(f => f.id === item.id)
    if (isFavorite) {
      dispatch(removeFromFavorites(item.id))
    } else {
      dispatch(addToFavorites(item))
    }
  }

  const isFavorite = (itemId) => {
    return favoriteItems.some(f => f.id === itemId)
  }

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shop = shops.find(s => s.id === selectedShop)
  const serviceFee = shop?.serviceFee || 0

  return (
    <div className="dashboard student-dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Good morning, {userName}</h1>
          <p className="header-subtitle">Balance: {balance} MAD</p>
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
                  {shop.image && <img src={shop.image} alt={shop.name} className="shop-image" />}
                  <div className="shop-header">
                    <h3>{shop.name}</h3>
                    <span className={`status-badge ${isFull ? 'full' : isClosed ? 'closed' : 'open'}`}>
                      {isFull ? 'Full' : isClosed ? 'Closed' : 'Open'}
                    </span>
                  </div>
                  <div className="shop-info">
                    <p><strong>{shop.maxOrders - shop.currentOrders}</strong> spots left</p>
                    <p>Service fee: {shop.serviceFee} MAD</p>
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
                {item.image && <img src={item.image} alt={item.name} className="menu-item-image" />}
                <div className="menu-item-content">
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    {item.description && <p className="item-description">{item.description}</p>}
                    <p className="price">{item.price}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <button 
                      className={`favorite-btn ${isFavorite(item.id) ? 'active' : ''}`}
                      onClick={() => handleToggleFavorite(item)}
                      title={isFavorite(item.id) ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      {isFavorite(item.id) ? '♥' : '♡'}
                    </button>
                    <button 
                      className="add-btn"
                      onClick={() => dispatch(addToCart(item))}
                      disabled={!orderingEnabled}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'cart' && (
        <div className="view-content">
          <h2>Your Cart</h2>
          {cart.length === 0 ? (
            <>
              <p className="empty-state">Cart is empty</p>
              {favoriteItems.length > 0 && (
                <div className="favorites-section">
                  <h3>Your Favorites</h3>
                  <div className="favorites-grid">
                    {favoriteItems.map(item => (
                      <div key={item.id} className="favorite-item" onClick={() => dispatch(addToCart(item))}>
                        {item.image && <img src={item.image} alt={item.name} />}
                        <h4>{item.name}</h4>
                        <p className="price">{item.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    {item.image && <img src={item.image} alt={item.name} className="cart-item-image" />}
                    <div className="cart-item-content">
                      <div className="item-details">
                        <h4>{item.name}</h4>
                        <p>{item.price} MAD each</p>
                      </div>
                      <div className="quantity-control">
                        <button onClick={() => dispatch(updateCartQuantity({ id: item.id, quantity: item.quantity - 1 }))}>−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => dispatch(updateCartQuantity({ id: item.id, quantity: item.quantity + 1 }))}>+</button>
                      </div>
                      <p className="subtotal">{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              {selectedShop && (() => {
                const subtotal = cartTotal
                const minValidation = validateOrderMinimum(selectedShop, subtotal)
                
                return !minValidation.isValid && (
                  <div className="minimum-order-warning">
                    Add {minValidation.remaining} MAD more to reach minimum order of {minValidation.minimum} MAD
                  </div>
                )
              })()}

              <DiscountCode orderTotal={cartTotal} />

              {!showDeliveryForm && (
                <button 
                  className="view-menu-btn"
                  onClick={() => setShowDeliveryForm(true)}
                  style={{ marginBottom: '1rem' }}
                >
                  {deliveryLocation?.building ? 'Edit Delivery Details' : 'Add Delivery Details'}
                </button>
              )}

              {showDeliveryForm && <DeliveryForm />}

              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>{cartTotal} MAD</span>
                </div>
                <div className="summary-row">
                  <span>Service fee</span>
                  <span>{serviceFee} MAD</span>
                </div>
                <div className="summary-row">
                  <span>Delivery fee</span>
                  <span>5 MAD</span>
                </div>
                {appliedDiscount?.valid && (
                  <div className="summary-row" style={{ color: 'var(--forest-green)' }}>
                    <span>Discount</span>
                    <span>-{appliedDiscount.amount} MAD</span>
                  </div>
                )}
                <div className="summary-row total">
                  <span>Total</span>
                  <span>{cartTotal + serviceFee + 5 - (appliedDiscount?.amount || 0)} MAD</span>
                </div>
                <div className="summary-row" style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid #ddd' }}>
                  <span>Your Balance</span>
                  <span style={{ fontWeight: 'bold', color: balance >= (cartTotal + serviceFee + 5 - (appliedDiscount?.amount || 0)) ? 'var(--forest-green)' : 'var(--burgundy)' }}>
                    {balance} MAD
                  </span>
                </div>
              </div>
              <button 
                className="place-order-btn"
                onClick={handlePlaceOrder}
                disabled={!orderingEnabled || !deliveryLocation?.building || balance < (cartTotal + serviceFee + 5 - (appliedDiscount?.amount || 0))}
              >
                {!orderingEnabled ? 'Ordering Closed' : 
                 !deliveryLocation?.building ? 'Add Delivery Details' : 
                 balance < (cartTotal + serviceFee + 5 - (appliedDiscount?.amount || 0)) ? 'Insufficient Balance' :
                 'Place Order'}
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
              {studentOrders.slice().reverse().map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <h4>{order.shopName}</h4>
                    <span className={`status-badge ${order.status.toLowerCase().replace(' ', '-')}`}>
                      {order.status}
                    </span>
                  </div>

                  {order.pickupCode && order.pickupCode !== 'N/A' && (
                    <div style={{ 
                      background: 'var(--gold)', 
                      color: '#000', 
                      padding: '1rem', 
                      borderRadius: '8px', 
                      textAlign: 'center',
                      margin: '1rem 0',
                      fontWeight: 'bold'
                    }}>
                      <div style={{ fontSize: '0.85rem', marginBottom: '0.25rem' }}>PICKUP CODE</div>
                      <div style={{ fontSize: '1.8rem', letterSpacing: '0.2em' }}>{order.pickupCode}</div>
                      <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Show this to the runner</div>
                    </div>
                  )}

                  <div className="order-progress">
                    <div className={`step ${['Queued', 'Preparing', 'Ready', 'Picked Up', 'Delivered'].includes(order.status) ? 'done' : ''}`}>
                      <span>Queued</span>
                    </div>
                    <div className={`step ${['Preparing', 'Ready', 'Picked Up', 'Delivered'].includes(order.status) ? 'done' : ''}`}>
                      <span>Preparing</span>
                    </div>
                    <div className={`step ${['Ready', 'Picked Up', 'Delivered'].includes(order.status) ? 'done' : ''}`}>
                      <span>Ready</span>
                    </div>
                    <div className={`step ${['Picked Up', 'Delivered'].includes(order.status) ? 'done' : ''}`}>
                      <span>Picked Up</span>
                    </div>
                    <div className={`step ${order.status === 'Delivered' ? 'done' : ''}`}>
                      <span>Delivered</span>
                    </div>
                  </div>
                  <div className="order-items">
                    {order.items.map((item, idx) => (
                      <p key={idx}>{item.quantity}x {item.name}</p>
                    ))}
                  </div>
                  
                  {order.deliveryLocation && (
                    <div className="order-location">
                      <strong>Delivery to:</strong>
                      {order.deliveryLocation.building && <p>{order.deliveryLocation.building}</p>}
                      {(order.deliveryLocation.floor || order.deliveryLocation.room) && (
                        <p>Floor {order.deliveryLocation.floor}, Room {order.deliveryLocation.room}</p>
                      )}
                      {order.deliveryLocation.landmark && <p>{order.deliveryLocation.landmark}</p>}
                    </div>
                  )}

                  {order.deliveryNotes && (
                    <div className="order-notes">
                      Note: {order.deliveryNotes}
                    </div>
                  )}

                  {order.estimatedTime && order.status === 'Queued' && (
                    <div className="estimated-time">
                      Estimated: {order.estimatedTime.min}-{order.estimatedTime.max} minutes
                    </div>
                  )}

                  <div className="order-details">
                    <div className="order-details-row">
                      <span>Subtotal</span>
                      <span>{order.subtotal} MAD</span>
                    </div>
                    {order.serviceFee > 0 && (
                      <div className="order-details-row">
                        <span>Service Fee</span>
                        <span>{order.serviceFee} MAD</span>
                      </div>
                    )}
                    {order.deliveryFee > 0 && (
                      <div className="order-details-row">
                        <span>Delivery Fee</span>
                        <span>{order.deliveryFee} MAD</span>
                      </div>
                    )}
                    {order.discount > 0 && (
                      <div className="order-details-row" style={{ color: 'var(--forest-green)' }}>
                        <span>Discount</span>
                        <span>-{order.discount} MAD</span>
                      </div>
                    )}
                    <div className="order-details-row highlight">
                      <span>Total</span>
                      <span>{order.total} MAD</span>
                    </div>
                    {order.paymentMethod && (
                      <div className="payment-badge">
                        Payment: {order.paymentMethod === 'cash' ? 'Cash on Delivery' : order.paymentMethod === 'card' ? 'Card' : 'Mobile Payment'}
                      </div>
                    )}
                  </div>

                  {order.status === 'Queued' && (
                    <button 
                      className="cancel-order-btn"
                      onClick={() => handleCancelOrder(order.id)}
                    >
                      Cancel Order
                    </button>
                  )}
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
